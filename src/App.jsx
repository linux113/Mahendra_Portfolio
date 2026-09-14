import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { DATA } from "./data.js";
import { ParticleField, Tilt, Magnetic, Counter, HoloCode, Logo, useMouse } from "./fx.jsx";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.09, ease: EASE } }),
};

/* ============================ NAV ============================ */
function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const ids = ["home", "about", "portfolio", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + window.innerHeight * 0.38;
      let cur = "home";
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["home", "Home"], ["about", "About"], ["portfolio", "Portfolio"], ["contact", "Contact"]];
  return (
    <motion.header initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 py-3 mx-4 lg:mx-auto rounded-2xl glass ${scrolled ? "shadow-[0_10px_50px_rgba(88,28,135,0.35)]" : ""}`}>
        <a href="#home" className="font-display text-lg font-bold tracking-wide">
          <span className="text-grad font-bold">{DATA.brand}</span>
          <span className="text-cyan-300">.dev</span>
        </a>
        <ul className="hidden md:flex items-center gap-9">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={`navlink ${active === id ? "!text-white" : ""}`}>
                {label}
                {active === id && <motion.span layoutId="navul" className="ul" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Magnetic strength={0.25}><a href="#contact" className="btn btn-primary btn-sm">Hire Me</a></Magnetic>
        </div>
        <button className="md:hidden text-2xl text-violet-300" onClick={() => setOpen(!open)} aria-label="menu">☰</button>
      </nav>
      {open && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl glass p-6 flex flex-col gap-4">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="navlink text-base">{label}</a>
          ))}
        </div>
      )}
    </motion.header>
  );
}

/* ============================ HERO ============================ */
function Hero({ mx, my }) {
  const rx = useTransform(my, [-1, 1], [5, -5]);
  const ry = useTransform(mx, [-1, 1], [-8, 8]);
  const { scrollY } = useScroll();
  const depth = useTransform(scrollY, [0, 900], [0, 150]);
  const scale = useTransform(scrollY, [0, 900], [1, 0.9]);
  const fade = useTransform(scrollY, [0, 700], [1, 0.15]);
  const sep1 = useTransform(scrollY, [0, 900], [0, -60]);
  const sep3 = useTransform(scrollY, [0, 900], [0, 90]);
  const px = (f) => useTransform(mx, [-1, 1], [-f, f]);
  const py = (f) => useTransform(my, [-1, 1], [-f, f]);
  const f1x = px(26), f1y = py(18), f2x = px(-34), f2y = py(22), f3x = px(30), f3y = py(-20), f4x = px(-24), f4y = py(-26);
  const hx = px(-40), hy = py(-16);

  const chips = [
    { logo: Logo.flutter, label: "Flutter", cls: "-top-6 -left-4 md:-left-10", sx: f1x, sy: f1y, d: "" },
    { logo: Logo.dart, label: "Dart", cls: "-top-10 right-6 md:right-0", sx: f2x, sy: f2y, d: "d2" },
    { logo: Logo.firebase, label: "Firebase", cls: "bottom-10 -left-6 md:-left-14", sx: f3x, sy: f3y, d: "d3" },
    { logo: Logo.getx, label: "GetX", cls: "-bottom-8 right-2 md:-right-8", sx: f4x, sy: f4y, d: "d4" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl px-6 lg:px-10 items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
        {/* left */}
        <motion.div initial="hidden" animate="show" className="relative z-10">
          <motion.span variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-[11px] tracking-[0.14em] text-violet-200 uppercase">
            <i className="pulse-dot w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /> {DATA.badge}
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display mt-6 text-[clamp(3rem,7.5vw,5.6rem)] font-bold leading-[1.02] tracking-tight">
            <span className="text-grad">Flutter</span><br />
            <span className="text-grad-v">Developer</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300/90">
            {DATA.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-6 flex flex-wrap gap-2.5">
            {DATA.badges.map((b) => <span key={b} className="tag backdrop-blur">{b}</span>)}
          </motion.div>
          <motion.div variants={fadeUp} custom={4} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic><a href="#portfolio" className="btn btn-primary">View Projects <span aria-hidden>→</span></a></Magnetic>
            <Magnetic><a href="#contact" className="btn btn-ghost">Contact Me</a></Magnetic>
          </motion.div>
          <motion.div variants={fadeUp} custom={5} className="mt-8 flex gap-3.5">
            {[
              [Logo.github, DATA.contact.github, "GitHub"],
              [Logo.mail, `mailto:${DATA.contact.email}`, "Email"],
              [Logo.linkedin, DATA.contact.linkedin, "LinkedIn"],
            ].map(([ic, href, label], i) => (
              <Magnetic key={label} strength={0.45}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl glass text-violet-200 transition hover:text-white hov-glow hover:-translate-y-1">
                  {ic}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        {/* right — cinematic 3D workstation */}
        <motion.div style={{ y: depth, scale, opacity: fade }} className="scene relative hidden sm:block">
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="preserve-3d relative">
            <div className="orbit-ring" /><div className="orbit-ring r2" />
            <motion.div style={{ translateZ: 0 }} className="relative overflow-hidden rounded-3xl border border-white/10 glow-v scan">
              <img src="/img/workstation.jpg" alt="Cinematic 3D render of Mahendra's developer workstation" fetchPriority="high"
                className="w-full object-cover kenburns" style={{ animation: "kb 26s ease-in-out infinite alternate" }} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060f]/70 via-transparent to-transparent" />
            </motion.div>

            {chips.map((c) => (
              <motion.div key={c.label} style={{ x: c.sx, y: c.sy }} className={`absolute ${c.cls} z-10`}>
                <div className={`chip-float ${c.d} glass rounded-2xl px-4 py-3 flex flex-col items-center gap-1.5 glow-v`}>
                  {c.logo}<span className="text-[10px] tracking-widest text-slate-200">{c.label}</span>
                </div>
              </motion.div>
            ))}

            <motion.div style={{ x: hx, y: hy }} className="absolute -left-8 md:-left-16 top-[12%] w-52 md:w-60 z-10">
              <HoloCode />
            </motion.div>
            <motion.div style={{ y: sep1 }} className="absolute -right-4 md:-right-10 top-[42%] z-10">
              <div className="chip-float d3 glass rounded-xl px-4 py-3 text-[10px] leading-relaxed text-slate-300">
                <b className="text-cyan-300">60 FPS</b> · jank-free<br />clean architecture
              </div>
            </motion.div>
            <motion.div style={{ y: sep3 }} className="absolute left-[8%] -bottom-6 z-10">
              <div className="chip-float d2 glass rounded-xl px-4 py-2.5 text-[10px] text-slate-300">
                <span className="text-violet-300 font-semibold">2 platforms</span> · 1 codebase
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#about" style={{ opacity: fade }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-slate-400">
        SCROLL
        <span className="block h-9 w-[1.5px] bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
      </motion.a>
      <style>{`@keyframes kb { from { transform: scale(1) translateY(0); } to { transform: scale(1.07) translateY(-1.5%); } }`}</style>
    </section>
  );
}

/* ============================ ABOUT ============================ */
function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] text-cyan-300/90 uppercase">About Me</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display mt-3 text-4xl md:text-5xl font-bold text-grad-v">Professional Profile</motion.h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.p variants={fadeUp} className="text-slate-300/90 leading-relaxed">{DATA.about[0]}</motion.p>
            <motion.p variants={fadeUp} custom={1} className="mt-4 text-slate-400 leading-relaxed">{DATA.about[1]}</motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8 grid gap-4 sm:grid-cols-2">
              {DATA.expertise.map((e) => (
                <Tilt key={e.title} max={6} className="glass rounded-2xl p-5 h-full">
                  <div className="lift">
                    <div className="text-2xl">{e.icon}</div>
                    <h3 className="mt-2.5 font-semibold text-[15px] text-white">{e.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{e.text}</p>
                  </div>
                </Tilt>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="space-y-6">
            <motion.div variants={fadeUp} className="glass-deep rounded-3xl p-7">
              <h3 className="font-display text-lg font-semibold text-white">Career Journey</h3>
              <div className="mt-5 space-y-5">
                {DATA.experience.map((x, i) => (
                  <div key={x.company} className="relative pl-6 border-l border-violet-500/40">
                    <i className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_#a855f7]" />
                    <div className="text-[10px] tracking-[0.2em] text-cyan-300/90 uppercase">{x.period}</div>
                    <div className="mt-1 font-semibold text-[14.5px] text-white">{x.company}</div>
                    <div className="text-[12.5px] text-violet-300">{x.role}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-4">
              {DATA.stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-6 text-center neon-edge">
                  <div className="font-display text-3xl font-bold text-grad"><Counter to={s.value} suffix={s.suffix} /></div>
                  <div className="mt-1.5 text-[11px] tracking-[0.18em] uppercase text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================ PORTFOLIO ============================ */
function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[11px] tracking-[0.35em] text-cyan-300/90 uppercase">Portfolio</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display mt-3 text-4xl md:text-5xl font-bold text-grad-v">Selected Work</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-2xl text-sm text-slate-400">
            A curated selection of mobile and web projects across diverse industries — built with Flutter, Dart and Firebase.
          </motion.p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3" style={{ perspective: 1200 }}>
          {DATA.projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 50, rotateX: -8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.75, delay: (i % 3) * 0.1, ease: EASE }}>
              <Tilt max={8} className="glass rounded-3xl overflow-hidden h-full flex flex-col">
                <div className="lift flex flex-col h-full">
                  <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(145deg, hsl(${p.hue} 72% 24%), hsl(${(p.hue + 55) % 360} 75% 10%))` }}>
                    <div className="absolute inset-0 grid place-items-center text-6xl transition-transform duration-500 hover:scale-110">{p.emoji}</div>
                    <span className="absolute top-3 right-3 rounded-full bg-black/45 px-3 py-1 text-[9.5px] tracking-[0.18em] text-cyan-200 uppercase backdrop-blur">{p.cat}</span>
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-slate-400">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                    <div className="mt-5 flex gap-3">
                      <a href={DATA.contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm flex-1 justify-center">{Logo.github} GitHub</a>
                      <a href={p.link || DATA.contact.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm flex-1 justify-center">Live Demo ↗</a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CONTACT ============================ */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE }}
          className="glass-deep relative overflow-hidden rounded-[2rem] p-8 md:p-14 glow-v">
          <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-violet-600/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11px] tracking-[0.35em] text-cyan-300/90 uppercase">Contact</p>
              <h2 className="font-display mt-3 text-4xl md:text-[2.9rem] leading-tight font-bold text-grad">
                Let's Build Something Amazing
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                Have a project in mind or want to collaborate? I'd love to hear from you — usually replying within 24 hours.
              </p>
              <div className="mt-9 space-y-4">
                {[
                  [Logo.mail, "Email", DATA.contact.email, `mailto:${DATA.contact.email}`],
                  [Logo.github, "GitHub", DATA.contact.githubUser, DATA.contact.github],
                  [Logo.linkedin, "LinkedIn", "mahendra-prajapat", DATA.contact.linkedin],
                ].map(([ic, label, val, href]) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="flex items-center gap-4 rounded-2xl glass px-5 py-4 transition hover:-translate-y-0.5 hov-glow">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/15 text-violet-200">{ic}</span>
                    <span><b className="block text-[13px] text-white">{label}</b><span className="block text-[12px] text-slate-400">{val}</span></span>
                  </a>
                ))}
              </div>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 2800); e.target.reset(); }}>
              <input className="field" type="text" placeholder="Name" required />
              <input className="field" type="email" placeholder="Email" required />
              <textarea className="field" rows={6} placeholder="Message" required />
              <Magnetic className="w-full">
                <button type="submit" className="btn btn-primary w-full justify-center">
                  {sent ? "✓ Message Sent!" : "Send Message ➤"}
                </button>
              </Magnetic>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 lg:px-10 md:flex-row text-[12.5px] text-slate-500">
        <span>© 2026 {DATA.name}. All rights reserved.</span>
        <span>Crafted with <span className="text-fuchsia-400">♥</span> using Flutter &amp; React</span>
        <span className="flex gap-4">
          <a className="transition hover:text-violet-300" href="/legacy/purple.html">Purple variant</a>
          <a className="transition hover:text-cyan-300" href="/legacy/cyan.html">Cyan variant</a>
        </span>
      </div>
    </footer>
  );
}

/* ============================ APP ============================ */
export default function App() {
  const { mx, my } = useMouse();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.4 });
  return (
    <>
      <motion.div style={{ scaleX: bar, background: "linear-gradient(90deg,#a855f7,#6366f1,#22d3ee)" }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" />
      <div className="aurora" /><div className="gridlines" /><div className="rays" />
      <ParticleField mx={mx} my={my} />
      <Nav />
      <main>
        <Hero mx={mx} my={my} />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
