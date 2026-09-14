import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* ---------------- mouse + reduced motion ---------------- */
export function useMouse() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const h = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);
  return { mx, my };
}
export const useReduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ---------------- custom neon cursor ---------------- */
export function Cursor() {
  const dx = useSpring(useMotionValue(-100), { stiffness: 900, damping: 40 });
  const dy = useSpring(useMotionValue(-100), { stiffness: 900, damping: 40 });
  const rx = useSpring(useMotionValue(-100), { stiffness: 220, damping: 26 });
  const ry = useSpring(useMotionValue(-100), { stiffness: 220, damping: 26 });
  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const h = (e) => { dx.set(e.clientX); dy.set(e.clientY); rx.set(e.clientX); ry.set(e.clientY); };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, [dx, dy, rx, ry]);
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }} />
      <motion.div className="cursor-dot" style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }} />
    </>
  );
}

/* ---------------- three.js network particle field (lazy + guarded) ---------------- */
export function NetworkField({ mx, my }) {
  const ref = useRef(null);
  useEffect(() => {
    let dead = false, raf = 0;
    (async () => {
      try {
        const THREE = await import("three");
        if (dead || !ref.current) return;
        const renderer = new THREE.WebGLRenderer({ canvas: ref.current, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
        renderer.setSize(window.innerWidth, window.innerHeight);
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x05050b, 0.05);
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 10;

        const mobile = window.innerWidth < 768;
        const N = mobile ? 70 : 150;
        const pos = new Float32Array(N * 3);
        const nodes = [];
        for (let i = 0; i < N; i++) {
          const v = new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 17, (Math.random() - 0.5) * 14);
          nodes.push(v); pos.set([v.x, v.y, v.z], i * 3);
        }
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const points = new THREE.Points(pg, new THREE.PointsMaterial({
          size: 0.06, color: 0x8b5cf6, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        const points2 = new THREE.Points(pg, new THREE.PointsMaterial({
          size: 0.035, color: 0x22d3ee, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        points2.position.set(0.4, -0.3, -1.5);
        scene.add(points, points2);

        /* precomputed constellation lines */
        const lp = [];
        for (let i = 0; i < N; i++)
          for (let j = i + 1; j < N; j++)
            if (nodes[i].distanceTo(nodes[j]) < 4.2 && lp.length < (mobile ? 160 : 420)) lp.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        const lg = new THREE.BufferGeometry();
        lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lp), 3));
        const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({
          color: 0x6d28d9, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        scene.add(lines);

        const clock = new THREE.Clock();
        let tx = 0, ty = 0;
        const tick = () => {
          if (dead) return;
          const t = clock.getElapsedTime();
          tx += ((mx.get() || 0) - tx) * 0.035;
          ty += ((my.get() || 0) - ty) * 0.035;
          const g = t * 0.02;
          points.rotation.y = g + tx * 0.16; points.rotation.x = ty * 0.1;
          points2.rotation.y = -g * 0.8 + tx * 0.22; points2.rotation.x = ty * 0.14;
          lines.rotation.y = g * 0.9 + tx * 0.12; lines.rotation.x = ty * 0.08;
          camera.position.x += (tx * 0.9 - camera.position.x) * 0.04;
          camera.position.y += (-ty * 0.7 - camera.position.y) * 0.04;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
        const onR = () => { renderer.setSize(window.innerWidth, window.innerHeight); camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); };
        window.addEventListener("resize", onR);
        ref.current.__clean = () => { window.removeEventListener("resize", onR); cancelAnimationFrame(raf); pg.dispose(); lg.dispose(); renderer.dispose(); };
      } catch { /* no WebGL: CSS ambience carries the scene */ }
    })();
    return () => { dead = true; ref.current?.__clean?.(); };
  }, [mx, my]);
  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}

/* ---------------- 3D tilt + cursor spotlight ---------------- */
export function Tilt({ children, max = 8, className = "", z = true }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 170, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 170, damping: 16 });
  const gl = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      className={`tilt-card spot ${className}`}
      style={{ rotateX: rx, rotateY: ry, scale: gl, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2); rx.set(-(py - 0.5) * max * 2); gl.set(1.02);
        e.currentTarget.style.setProperty("--sx", `${px * 100}%`);
        e.currentTarget.style.setProperty("--sy", `${py * 100}%`);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); gl.set(1); }}>
      {children}
    </motion.div>
  );
}

/* ---------------- magnetic ---------------- */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 });
  return (
    <motion.div className={`inline-block ${className}`} style={{ x, y }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - (r.left + r.width / 2)) * strength); y.set((e.clientY - (r.top + r.height / 2)) * strength); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}

/* ---------------- counter ---------------- */
export function Counter({ to, suffix = "", duration = 1700, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / duration); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className={className}>{n}{suffix}</span>;
}

/* ---------------- HUD scanner ---------------- */
export function ScanHUD({ messages }) {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    let a, b;
    const cycle = () => {
      setI((v) => (v + 1) % messages.length);
      setOn(true);
      b = setTimeout(() => setOn(false), 2600);
      a = setTimeout(cycle, 6500);
    };
    a = setTimeout(cycle, 2200);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [messages.length]);
  return (
    <motion.div initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 6 }} transition={{ duration: 0.5 }}
      className="hud glass rounded-md px-3 py-1.5 flex items-center gap-2">
      <i className="pulse-dot w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
      {messages[i]}
    </motion.div>
  );
}

/* ---------------- holo code window ---------------- */
const CODE = [
  [["k", "class "], ["f", "SecureSession"], ["k", " {"]],
  [["c", "  // encryption active · tls 1.3"]],
  [["k", "  Future<"], ["f", "bool"], ["k", "> "], ["f", "check"], ["k", "() "], ["k", "async {"]],
  [["k", "    return await "], ["f", "_verify"], ["k", "();"]],
  [["k", "  }"]],
  [["k", "  final "], ["f", "state"], ["k", " = "], ["f", "Rx"], ["k", "<"], ["f", "UiState"], ["k", ">();"]],
  [["f", "  ever"], ["k", "("], ["f", "state"], ["k", ", "], ["f", "rebuild"], ["k", ");"]],
  [["s", "  \'60fps · secure · shipped\'"]],
  [["k", "}"]],
];
export function HoloCode({ title = "secure_session.dart", className = "" }) {
  const [lines, setLines] = useState(3);
  useEffect(() => { const id = setInterval(() => setLines((l) => (l >= CODE.length ? 3 : l + 1)), 640); return () => clearInterval(id); }, []);
  return (
    <div className={`holo glass scanline relative rounded-xl p-4 overflow-hidden ${className}`}>
      <div className="flex gap-1.5 mb-2">
        <i className="w-2 h-2 rounded-full bg-red-400/80" /><i className="w-2 h-2 rounded-full bg-amber-400/80" /><i className="w-2 h-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[9px] tracking-widest text-slate-400">{title}</span>
      </div>
      <pre className="whitespace-pre">
        {CODE.slice(0, lines).map((ln, i) => (
          <div key={i}>{ln.map(([c, t], j) => <span key={j} className={c}>{t}</span>)}{i === lines - 1 && <span className="caret text-cyan-300">▍</span>}</div>
        ))}
      </pre>
    </div>
  );
}

/* ---------------- icon set ---------------- */
const P = {
  flutter: <><path fill="#54C5F8" d="M14.3 0 0 14.3l4.4 4.4L23.1 0z" /><path fill="#54C5F8" d="M9.9 18.6 5.5 23h8.8l4.4-4.4-4.4-4.4z" /><path fill="#01579B" opacity=".5" d="M9.9 18.6 14.3 14.2l-4.4-4.4-4.4 4.4z" /></>,
  dart: <><path fill="#40C4FF" d="M8.4 0 0 8.4v7.2l8.4 8.4h7.2L24 15.6 8.4 0z" opacity=".92" /><path fill="#00A5D6" d="M8.4 0v15.6H24z" opacity=".7" /></>,
  firebase: <><path fill="#FFA000" d="M13.4 0 8.6 9.8l3.2 3L16 4.2z" /><path fill="#FF6F00" d="M2.4 16.8 4.6 5.2l3.6 4.4z" /><path fill="#FFCA28" d="M2.4 16.8 12 24l9.6-7.2L16 4.2z" opacity=".92" /></>,
  getx: <><path fill="#A855F7" d="M13.6 0 2.4 14h6.8L8 24 21.6 9h-7.2z" /><circle cx="18.5" cy="19.5" r="3" fill="#22D3EE" /></>,
  api: <><path fill="none" stroke="#22D3EE" strokeWidth="2" d="M8 4a4 4 0 1 0 0 8h8a4 4 0 1 1 0 8" /><circle cx="8" cy="8" r="2.4" fill="#22D3EE" /><circle cx="16" cy="16" r="2.4" fill="#A855F7" /></>,
  riverpod: <><path fill="#5FCBEE" d="M12 2 3 20h4l5-11 5 11h4z" /><circle cx="12" cy="6" r="2.4" fill="#fff" opacity=".85" /></>,
  bloc: <><rect x="3" y="3" width="8" height="8" rx="2" fill="#22D3EE" /><rect x="13" y="13" width="8" height="8" rx="2" fill="#A855F7" /><path stroke="#8B5CF6" strokeWidth="1.6" fill="none" d="M11 7h4v6" /></>,
  git: <><circle cx="6" cy="6" r="3" fill="#F05033" /><circle cx="6" cy="18" r="3" fill="#F05033" /><circle cx="18" cy="9" r="3" fill="#F05033" /><path stroke="#F05033" strokeWidth="2" fill="none" d="M6 9v6M9 7l6 1" /></>,
  github: <path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />,
  android: <path fill="#3DDC84" d="M6 10h12v8a1 1 0 0 1-1 1h-1v3h-2v-3h-4v3H8v-3H7a1 1 0 0 1-1-1v-8Zm-3 1a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0v-5Zm15 0a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0v-5ZM8.6 4.1 7.5 2.4l.8-.5 1.2 1.9a7 7 0 0 1 5 0l1.2-1.9.8.5-1.1 1.7A6 6 0 0 1 18 9H6a6 6 0 0 1 2.6-4.9ZM9.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
  ios: <path fill="#F8FAFC" d="M16.7 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.2-.9-2.5-3ZM14.8 5.6c.6-.7 1-1.7.9-2.6-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.3Z" />,
  mail: <path fill="currentColor" d="M2 5h20v14H2V5Zm2 2v.4l8 5.3 8-5.3V7H4Zm16 2.6-8 5.3-8-5.3V17h16V9.6Z" />,
  linkedin: <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />,
  code: <path fill="currentColor" d="m8.4 5.6-5.6 6.4 5.6 6.4 1.8-1.6-4.2-4.8 4.2-4.8-1.8-1.6Zm7.2 0-1.8 1.6 4.2 4.8-4.2 4.8 1.8 1.6 5.6-6.4-5.6-6.4Z" />,
  medal: <path fill="currentColor" d="M12 2 9 7h6l-3-5Zm-4.6.9L4 9h4l2.2-3.7L7.4 2.9Zm9.2 0-2.8 2.4L16 9h4l-3.4-6.1ZM12 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3.2 1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3 1-2.1Z" />,
  globe: <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.4a15 15 0 0 0-1.2-5.2A8 8 0 0 1 19.9 11ZM12 4c.9 1.2 1.9 3.6 2.1 7H9.9C10.1 7.6 11.1 5.2 12 4ZM4.1 13h3.4c.1 1.9.5 3.7 1.2 5.2A8 8 0 0 1 4.1 13Zm3.4-2H4.1a8 8 0 0 1 4.6-5.2A15 15 0 0 0 7.5 11ZM12 20c-.9-1.2-1.9-3.6-2.1-7h4.2c-.2 3.4-1.2 5.8-2.1 7Zm3.3-1.8c.7-1.5 1.1-3.3 1.2-5.2h3.4a8 8 0 0 1-4.6 5.2Z" />,
  shield: <path fill="currentColor" d="M12 1.5 4 5v6.1c0 5 3.4 9.6 8 11.4 4.6-1.8 8-6.4 8-11.4V5l-8-3.5Zm0 2.2 6 2.6v4.8c0 4-2.6 7.7-6 9.3-3.4-1.6-6-5.3-6-9.3V6.3l6-2.6Zm-1 4.3v3H8l4 5v-3h3l-4-5Z" />,
  arrow: <path fill="currentColor" d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z" />,
};
export const Icon = ({ n, className = "w-5 h-5" }) => <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{P[n]}</svg>;
