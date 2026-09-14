import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { DATA } from "./data.js";
import { EASE, Tilt, Magnetic, Counter, HoloCode, Icon, useMouse } from "./fx.jsx";

const fadeUp = { hidden: { opacity: 0, y: 30, filter: "blur(5px)" }, show: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay: i * 0.08, ease: EASE } }) };

/* ============================ CAREER JOURNEY ============================ */
function Workspace({ mx, my }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2400], [0, -70]);
  const y2 = useTransform(scrollY, [0, 2400], [0, 60]);
  const px1 = useTransform(mx, [-1, 1], [-18, 18]);
  const px2 = useTransform(mx, [-1, 1], [22, -22]);
  return (
    <motion.div style={{ y: y1 }} className="scene relative hidden lg:block">
      <motion.img style={{ y: y2 }} src="/img/flutter_workspace.jpg" alt="Futuristic Flutter workspace with phone, laptop and holographic tech cards"
        loading="lazy" className="w-full rounded-[1.6rem] border border-violet-500/20 shadow-[0_0_70px_rgba(109,40,217,0.3)]" />
      <motion.div style={{ x: px1 }} className="absolute -left-6 top-[8%] w-44"><div className="floaty"><HoloCode title="main.dart" /></div></motion.div>
      <motion.div style={{ x: px2 }} className="absolute -right-4 bottom-[10%]">
        <div className="floaty d2 glass rounded-xl px-4 py-3 text-[10px] leading-relaxed text-slate-300">
          <b className="text-violet-300">Flutter · Dart</b><br />Firebase · REST API
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Career({ mx, my }) {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center">
          <motion.p variants={fadeUp} className="strip !tracking-[0.45em] text-violet-300">— MY JOURNEY —</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display mt-4 text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-tight">
            <span className="text-[#eceaff]">Career</span> <span className="text-grad-pb">Journey</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-3 text-[15px] text-[#a5a3c7]">A progressive journey building cross-platform mobile experiences</motion.p>
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="relative">
            <span className="vtext strip absolute -left-8 top-10 hidden xl:block !tracking-[0.4em]">{DATA.vertical}</span>
            <div className="tline space-y-10 py-4">
              {DATA.experience.map((x, i) => (
                <motion.div key={x.company} initial={{ opacity: 0, y: 44, scale: 0.92, rotateX: 8, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.85, delay: i * 0.12, ease: EASE }}
                  className="relative grid gap-5 md:grid-cols-[170px_1fr] md:gap-8 items-center" style={{ perspective: 900 }}>
                  <div className="flex md:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/60 px-4 py-2.5 text-[11.5px] font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.5)]">
                      📅 {x.period}
                    </span>
                  </div>
                  <span className="tnode hidden md:block" style={{ top: "50%", marginTop: -8 }} />
                  <Tilt max={6} className="glass-2 relative rounded-2xl p-6 shadow-[0_24px_60px_rgba(3,4,12,0.6)]">
                    <div className="lift flex items-start gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-[0_0_24px_rgba(139,92,246,0.6)]">
                        <Icon n={x.icon} className="w-6 h-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[17px] font-bold text-white">{x.company}</h3>
                        <div className="mt-0.5 text-[13px] font-semibold text-violet-300">{x.role}</div>
                        <ul className="mt-3 space-y-1.5">
                          {x.points.map((p) => (
                            <li key={p} className="flex gap-2 text-[12.5px] leading-relaxed text-[#a5a3c7]">
                              <span className="mt-0.5 text-cyan-300">▸</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Magnetic strength={0.4}>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-slate-300 transition-all duration-300 hover:rotate-45 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                          <Icon n="arrow" className="w-4 h-4" />
                        </span>
                      </Magnetic>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
          <Workspace mx={mx} my={my} />
        </div>

        <div className="mt-16 flex items-center justify-end gap-6">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-violet-500/60" />
          <span className="strip">{DATA.strips.career}</span>
        </div>
      </div>
    </section>
  );
}

/* ============================ PORTFOLIO SHOWCASE ============================ */
const TABS = [
  { id: "projects", label: "Projects", icon: "code" },
  { id: "certificates", label: "Certificates", icon: "medal" },
  { id: "stack", label: "Tech Stack", icon: "bloc" },
];

export function Portfolio({ mx, my }) {
  const [tab, setTab] = useState("projects");
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? DATA.projects : DATA.projects.filter((p) => p.filters.includes(filter));
  return (
    <section id="portfolio" className="relative py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center">
          <motion.span variants={fadeUp} className="inline-block rounded-full glass px-5 py-2 text-[11px] font-bold tracking-[0.3em] text-slate-200 uppercase">My Work</motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display mt-5 text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-tight">
            <span className="text-[#f4f2ff]">Portfolio</span> <span className="text-grad">Showcase</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#a5a3c7]">
            Explore my journey through projects, education, and technical expertise.<br className="hidden md:block" />
            Each section represents a milestone in my continuous learning path.
          </motion.p>
        </motion.div>

        {/* tabs */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 rounded-2xl glass p-2">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`group relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-4 text-[13px] font-bold transition-all duration-300 ${tab === t.id ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_34px_rgba(124,58,237,0.6)]" : "text-slate-300 hover:bg-white/5 hover:-translate-y-0.5"}`}>
              <span className="transition-transform duration-300 group-hover:rotate-12"><Icon n={t.icon} className="w-5 h-5" /></span>
              {t.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18, scale: 0.98 }} transition={{ duration: 0.5, ease: EASE }}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {DATA.filters.map((f) => (
                  <button key={f.id} onClick={() => setFilter(f.id)}
                    className={`rounded-full px-5 py-2 text-[12px] font-semibold transition-all duration-300 ${filter === f.id ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_26px_rgba(168,85,247,0.65)]" : "glass text-slate-300 hover:text-white hover:shadow-[0_0_18px_rgba(139,92,246,0.35)]"}`}>
                    {f.label}
                  </button>
                ))}
              </div>

              <motion.div layout className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3" style={{ perspective: 1300 }}>
                <AnimatePresence mode="popLayout">
                  {list.map((p, i) => (
                    <motion.article key={p.id} layout
                      initial={{ opacity: 0, y: 52, scale: 0.85, rotateX: 8, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.88, y: 24, filter: "blur(4px)" }}
                      transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: EASE }}>
                      <Tilt max={9} className="glass group h-full overflow-hidden rounded-3xl shadow-[0_28px_70px_rgba(3,4,12,0.65)]">
                        <div className="lift flex h-full flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img src={p.img} alt={`${p.title} 3D mockup`} loading="lazy"
                              style={{ filter: p.hue ? `hue-rotate(${p.hue}deg)` : undefined }}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1f] via-transparent to-transparent" />
                            <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600/80 to-blue-600/70 text-white shadow-[0_0_18px_rgba(139,92,246,0.7)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                              <Icon n={p.filters.includes("web") ? "globe" : "flutter"} className="w-5 h-5" />
                            </span>
                            <Magnetic strength={0.45} className="absolute right-4 top-4">
                              <a href={p.link || DATA.contact.github} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}
                                className="grid h-10 w-10 place-items-center rounded-full bg-black/45 text-slate-200 backdrop-blur transition-all duration-300 hover:rotate-45 hover:text-cyan-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.8)]">
                                <Icon n="arrow" className="w-4 h-4" />
                              </a>
                            </Magnetic>
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <div className="text-[10px] font-bold tracking-[0.22em] text-cyan-300/90 uppercase">{p.cat}</div>
                            <h3 className="font-display mt-1.5 text-[17px] font-bold text-white">{p.title}</h3>
                            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#a5a3c7]">{p.desc}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {p.tags.map((t) => <span key={t} className="tag transition-transform duration-300 group-hover:-translate-y-0.5">{t}</span>)}
                            </div>
                            <div className="mt-5 flex gap-3">
                              <a href={DATA.contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm flex-1 justify-center"><Icon n="github" className="w-4 h-4" /> GitHub</a>
                              <a href={p.link || DATA.contact.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm flex-1 justify-center"><span className="sweep" />Live Demo ↗</a>
                            </div>
                          </div>
                        </div>
                      </Tilt>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>

              <div className="mt-16 flex flex-col items-center justify-between gap-8 md:flex-row">
                <p className="font-script text-3xl md:text-4xl leading-snug text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300 rotate-[-2deg]">
                  {DATA.script[0]}<br />{DATA.script[1]}
                  <span className="mt-2 block h-[2px] w-40 bg-gradient-to-r from-violet-400 to-transparent shadow-[0_0_12px_#a855f7]" />
                </p>
                <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
                  className="glass-2 flex items-center gap-5 rounded-2xl px-7 py-5 shadow-[0_0_40px_rgba(109,40,217,0.35)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-600/25 text-violet-200"><Icon n="medal" className="w-6 h-6" /></span>
                  <div>
                    <div className="font-display text-3xl font-extrabold text-white"><Counter to={10} suffix="+" /></div>
                    <div className="text-[10px] font-bold tracking-[0.22em] text-slate-400 uppercase">Projects Completed</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {tab === "certificates" && (
            <motion.div key="certs" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-3" style={{ perspective: 1100 }}>
              {DATA.certificates.map((c, i) => (
                <motion.div key={c.year} initial={{ opacity: 0, y: 40, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}>
                  <Tilt max={8} className="gborder h-full">
                    <div className="lift flex h-full flex-col items-center p-8 text-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-400/30 to-violet-600/30 text-amber-300 shadow-[0_0_26px_rgba(251,191,36,0.35)]"><Icon n="medal" className="w-7 h-7" /></span>
                      <div className="mt-4 text-[11px] font-bold tracking-[0.3em] text-cyan-300">{c.year}</div>
                      <h3 className="font-display mt-2 text-[17px] font-bold text-white">{c.title}</h3>
                      <div className="mt-1 text-[13px] text-[#a5a3c7]">{c.board}</div>
                      <span className="mt-4 rounded-full bg-emerald-400/10 px-4 py-1.5 text-[12px] font-semibold text-emerald-300">{c.score}</span>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === "stack" && (
            <motion.div key="stack" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
              {DATA.techStack.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 34, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}>
                  <Magnetic strength={0.4} className="w-full">
                    <div className={`${i % 3 === 0 ? "floaty" : i % 3 === 1 ? "floaty d2" : "floaty d3"} glass flex flex-col items-center gap-2.5 rounded-2xl px-3 py-5 transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]`}>
                      <span className="text-violet-200 transition-transform duration-500 hover:rotate-12"><Icon n={t.logo} className="w-7 h-7" /></span>
                      <span className="text-[11px] font-semibold text-slate-200">{t.name}</span>
                    </div>
                  </Magnetic>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
