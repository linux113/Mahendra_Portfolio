import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

/* ---------------- global mouse position (-1..1) ---------------- */
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

/* ---------------- three.js particle universe (lazy, guarded) ---------------- */
export function ParticleField({ mx, my }) {
  const ref = useRef(null);
  useEffect(() => {
    let disposed = false, raf = 0, three = null, renderer = null;
    (async () => {
      try {
        three = await import("three");
        if (disposed || !ref.current) return;
        renderer = new three.WebGLRenderer({ canvas: ref.current, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        renderer.setSize(window.innerWidth, window.innerHeight);
        const scene = new three.Scene();
        scene.fog = new three.FogExp2(0x05060f, 0.055);
        const camera = new three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 9;

        const make = (count, size, color, spread) => {
          const g = new three.BufferGeometry();
          const pos = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * spread;
            pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.7;
          }
          g.setAttribute("position", new three.BufferAttribute(pos, 3));
          const m = new three.PointsMaterial({ size, color, transparent: true, opacity: 0.75, blending: three.AdditiveBlending, depthWrite: false });
          const p = new three.Points(g, m);
          scene.add(p);
          return p;
        };
        const violet = make(650, 0.055, 0x8b5cf6, 30);
        const cyan = make(350, 0.04, 0x22d3ee, 26);

        const clock = new three.Clock();
        let tx = 0, ty = 0;
        const tick = () => {
          if (disposed) return;
          const t = clock.getElapsedTime();
          tx += ((mx.get() || 0) * 0.6 - tx) * 0.03;
          ty += ((my.get() || 0) * 0.4 - ty) * 0.03;
          violet.rotation.y = t * 0.02 + tx * 0.25;
          violet.rotation.x = ty * 0.18;
          cyan.rotation.y = -t * 0.016 + tx * 0.35;
          cyan.rotation.x = ty * 0.24;
          camera.position.x += (tx * 0.8 - camera.position.x) * 0.04;
          camera.position.y += (-ty * 0.6 - camera.position.y) * 0.04;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
        const onResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);
        ref.current.__cleanup = () => {
          window.removeEventListener("resize", onResize);
          cancelAnimationFrame(raf);
          violet.geometry.dispose(); violet.material.dispose();
          cyan.geometry.dispose(); cyan.material.dispose();
          renderer.dispose();
        };
      } catch (e) {
        /* no WebGL — silently skip, CSS background carries the look */
      }
    })();
    return () => { disposed = true; ref.current?.__cleanup?.(); };
  }, [mx, my]);
  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}

/* ---------------- 3D tilt wrapper ---------------- */
export function Tilt({ children, max = 9, className = "", glow = true }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`tilt-card ${glow ? "neon-edge" : ""} ${className}`}>
      {children}
    </motion.div>
  );
}

/* ---------------- magnetic hover ---------------- */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 16 });
  return (
    <motion.div className={`inline-block ${className}`} style={{ x, y }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

/* ---------------- animated counter ---------------- */
export function Counter({ to, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------------- floating holographic code panel ---------------- */
const CODE = [
  [["k", "class "], ["f", "HomePresenter"], ["k", " extends "], ["f", "GetxController"], ["c", " {"]],
  [["c", "  // clean architecture · presentation layer"]],
  [["k", "  final "], ["f", "UseCase"], ["k", " _useCase;"]],
  [["k", "  final "], ["f", "state"], ["k", " = "], ["f", "ScreenState"], ["k", "()."], ["f", "obs"], ["c", ";"]],
  [["k", "  @override"]],
  [["k", "  void "], ["f", "onInit"], ["c", "() {"]],
  [["k", "    super."], ["f", "onInit"], ["c", "();"]],
  [["k", "    "], ["f", "ever"], ["c", "("], ["f", "state"], ["c", ", "], ["f", "rebuild"], ["c", ");"]],
  [["c", "  }"]],
  [["s", "  \'60fps · zero jank · shipped\'"]],
  [["c", "}"]],
];
export function HoloCode({ className = "" }) {
  const [lines, setLines] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setLines((l) => (l >= CODE.length ? 3 : l + 1)), 620);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`holo glass rounded-xl p-4 scan overflow-hidden ${className}`}>
      <div className="flex gap-1.5 mb-2">
        <i className="w-2 h-2 rounded-full bg-red-400/80" /><i className="w-2 h-2 rounded-full bg-amber-400/80" /><i className="w-2 h-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[9px] text-slate-400 tracking-widest">home_presenter.dart</span>
      </div>
      <pre className="whitespace-pre">
        {CODE.slice(0, lines).map((ln, i) => (
          <div key={i}>{ln.map(([c, t], j) => <span key={j} className={c}>{t}</span>)}{i === lines - 1 && <span className="caret text-cyan-300">▍</span>}</div>
        ))}
      </pre>
    </div>
  );
}

/* ---------------- tech logos ---------------- */
export const Logo = {
  flutter: (
    <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#54C5F8" d="M14.3 0 0 14.3l4.4 4.4L23.1 0z" /><path fill="#54C5F8" d="M9.9 18.6 5.5 23h8.8l4.4-4.4-4.4-4.4z" /><path fill="#01579B" opacity=".55" d="M9.9 18.6 14.3 14.2l-4.4-4.4-4.4 4.4z" /></svg>
  ),
  dart: (
    <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#40C4FF" d="M8.4 0 0 8.4v7.2l8.4 8.4h7.2L24 15.6 8.4 0z" opacity=".9" /><path fill="#00A5D6" d="M8.4 0v15.6H24z" opacity=".7" /></svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#FFA000" d="M13.4 0 8.6 9.8l3.2 3L16 4.2z" /><path fill="#FF6F00" d="M2.4 16.8 4.6 5.2l3.6 4.4z" /><path fill="#FFCA28" d="M2.4 16.8 12 24l9.6-7.2L16 4.2z" opacity=".92" /></svg>
  ),
  getx: (
    <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#A855F7" d="M13.6 0 2.4 14h6.8L8 24 21.6 9h-7.2z" /><circle cx="18.5" cy="19.5" r="3" fill="#22D3EE" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M2 5h20v14H2V5Zm2 2v.4l8 5.3 8-5.3V7H4Zm16 2.6-8 5.3-8-5.3V17h16V9.6Z" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" /></svg>
  ),
};
