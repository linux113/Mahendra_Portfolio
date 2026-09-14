import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { DATA } from "./data.js";
import { EASE, Tilt, Magnetic, Counter, HoloCode, ScanHUD, Icon, useMouse } from "./fx.jsx";

const fadeUp = { hidden: { opacity: 0, y: 34, filter: "blur(6px)" }, show: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, delay: i * 0.09, ease: EASE } }) };

/* ================================ NAV ================================ */
export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const ids = ["home", "about", "portfolio", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + window.innerHeight * 0.38;
      let cur = "home";
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      setActive(cur);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["home", "Home"], ["about", "About"], ["portfolio", "Portfolio"], ["contact", "Contact"]];
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }} className="fixed inset-x-0 top-0 z-50 px-4 lg:px-8 pt-3">
      <nav className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-2xl glass px-5 lg:px-7 transition-all duration-500 ${scrolled ? "py-2.5 shadow-[0_12px_60px_rgba(88,28,135,0.4)]" : "py-4"}`}>
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 font-display text-xl font-extrabold text-white shadow-[0_0_24px_rgba(139,92,246,0.8)]">M</span>
          <span className="font-display text-lg font-bold tracking-wide text-white">{DATA.brand}</span>
        </a>
        <ul className="hidden md:flex items-center gap-10">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={`navlink ${active === id ? "!text-white" : ""}`}>
                {label}
                {active === id && <motion.span layoutId="navul" className="ul" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2 rounded-full glass px-4 py-2 text-[12px] font-semibold text-slate-100">
          <i className="pulse-dot h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /> {DATA.badge}
        </div>
        <button className="md:hidden text-2xl text-violet-300" onClick={() => setOpen(!open)} aria-label="menu">☰</button>
      </nav>
      {open && (
        <div className="md:hidden mx-1 mt-2 rounded-2xl glass p-6 flex flex-col gap-4">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="navlink text-base">{label}</a>)}
        </div>
      )}
    </motion.header>
  );
}

/* ================================ HERO ================================ */
function ShieldScene({ mx, my }) {
  const rx = useTransform(my, [-1, 1], [4, -4]);
  const ry = useTransform(mx, [-1, 1], [-7, 7]);
  const { scrollY } = useScroll();
  const depth = useTransform(scrollY, [0, 900], [0, 130]);
  const scale = useTransform(scrollY, [0, 900], [0.98, 0.9]);
  const p1x = useTransform(mx, [-1, 1], [-22, 22]); const p1y = useTransform(my, [-1, 1], [-14, 14]);
  const p2x = useTransform(mx, [-1, 1], [26, -26]); const p2y = useTransform(my, [-1, 1], [18, -18]);
  const p3x = useTransform(mx, [-1, 1], [-30, 30]);
  return (
    <motion.div style={{ y: depth, scale }} className="scene relative">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="preserve-3d relative">
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="relative overflow-hidden rounded-[1.8rem] border border-violet-500/25 shadow-[0_0_80px_rgba(109,40,217,0.35)]">
          <img src="/img/cyber_shield.jpg" alt="Holographic cybersecurity command center with glowing shield and padlock" fetchPriority="high" className="w-full object-cover" />
          <div className="scanbeam" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050b]/75 via-transparent to-[#05050b]/25" />
        </motion.div>
        <div className="ringplatform" /><div className="ringplatform r2" />

        <motion.div style={{ x: p1x, y: p1y }} className="absolute -right-3 md:-right-8 top-[6%] z-10 w-44 md:w-52">
          <div className="floaty glass rounded-2xl p-4 shadow-[0_0_40px_rgba(37,99,235,0.35)]">
            <div className="mb-2 grid place-items-center rounded-lg bg-blue-600/25 py-2 text-blue-300"><Icon n="shield" className="w-6 h-6" /></div>
            {DATA.securityPanel.map((s) => (
              <div key={s} className="flex items-center gap-2 py-1 text-[11px] text-slate-200">
                <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-cyan-400/90 text-[8px] font-black text-[#05242c]">✓</span>{s}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ x: p2x, y: p2y }} className="absolute -left-4 md:-left-14 top-[16%] z-10 w-48 md:w-60">
          <div className="floaty d2"><HoloCode /></div>
        </motion.div>

        <motion.div style={{ x: p3x }} className="absolute left-[6%] -bottom-5 z-10 flex items-center gap-3">
          <ScanHUD messages={DATA.hudMessages} />
        </motion.div>
        <motion.div style={{ x: p2x, y: p1y }} className="absolute right-[10%] -bottom-7 z-10">
          <div className="floaty d3 glass rounded-xl px-4 py-2.5 text-[10px] tracking-widest text-slate-300">
            <span className="text-cyan-300 font-bold">FLUTTER APP PREVIEW</span> · live
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ mx, my }) {
  const pillLogo = { Flutter: "flutter", Dart: "dart", Firebase: "firebase", GetX: "getx" };
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-10">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:px-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial="hidden" animate="show" id="about">
          <motion.span variants={fadeUp} className="neonpill inline-flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-violet-100">
            <span className="flex items-center gap-2"><Icon n="shield" className="w-4 h-4 text-cyan-300" /> {DATA.aboutBadge}</span>
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] font-extrabold leading-[1.05] tracking-tight text-[#f8fafc]">
            Mahendra <span className="text-grad-pb">Kumar Prajapat</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] font-medium text-slate-300">
            {DATA.rolesLine.map((r, i) => (
              <span key={r} className="flex items-center gap-4">
                {i > 0 && <span className="text-violet-400/70">|</span>}{r}
              </span>
            ))}
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-5 max-w-xl space-y-1 text-[14.5px] leading-relaxed text-[#a5a3c7]">
            {DATA.desc.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </motion.div>
          <motion.div variants={fadeUp} custom={4} className="mt-7 flex flex-wrap gap-3">
            {DATA.pills.map((p) => (
              <span key={p} className="neonpill px-4 py-2.5 text-[12.5px] font-semibold text-slate-100">
                <span className="flex items-center gap-2">
                  {pillLogo[p] && <Icon n={pillLogo[p]} className="w-4 h-4" />}{p}
                </span>
              </span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} custom={5} className="mt-9 flex flex-wrap gap-4">
            <Magnetic><a className="btn btn-primary" href={`mailto:${DATA.contact.email}?subject=CV%20Request`}><span className="sweep" />↓ Download CV</a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href="#portfolio">&lt;/&gt; View Projects</a></Magnetic>
          </motion.div>
        </motion.div>
        <ShieldScene mx={mx} my={my} />
      </div>

      {/* achievement cards */}
      <div className="mx-auto mt-24 grid max-w-[1400px] gap-6 px-6 lg:px-10 sm:grid-cols-2 xl:grid-cols-4">
        {DATA.stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 46, rotateX: 8, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }} style={{ perspective: 900 }}>
            <Tilt max={7} className="gborder h-full">
              <div className="lift flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-600/40 to-blue-600/30 text-violet-200 shadow-[0_0_22px_rgba(139,92,246,0.45)] transition-transform duration-500 group-hover:rotate-12">
                    <Icon n={s.icon} className="w-6 h-6" />
                  </span>
                </div>
                <div className="mt-4 text-[11px] font-bold tracking-[0.18em] text-slate-300 uppercase">{s.label}</div>
                <div className="font-display mt-1 text-4xl font-extrabold text-white"><Counter to={s.value} suffix={s.suffix} /></div>
                <p className="mt-2 flex-1 text-[12px] leading-relaxed text-[#a5a3c7]">{s.desc}</p>
                <span className="mt-4 grid h-9 w-9 place-items-center ml-auto rounded-full bg-white/5 text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-cyan-300">
                  <Icon n="arrow" className="w-4 h-4" />
                </span>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex items-center justify-center gap-6">
        <span className="h-px w-24 bg-gradient-to-r from-transparent to-violet-500/60" />
        <span className="strip">{DATA.strips.hero}</span>
        <span className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-500/60" />
      </div>
    </section>
  );
}
