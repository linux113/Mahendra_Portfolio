import { useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { DATA } from "./data.js";
import { EASE, Tilt, Magnetic, Icon } from "./fx.jsx";

const fadeUp = { hidden: { opacity: 0, y: 30, filter: "blur(5px)" }, show: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay: i * 0.08, ease: EASE } }) };

/* ============================ SERVICES ============================ */
export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center">
          <motion.p variants={fadeUp} className="strip !tracking-[0.45em] text-cyan-300">— WHAT I DO —</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display mt-4 text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
            <span className="text-[#eceaff]">Engineering</span> <span className="text-grad-pb">Services</span>
          </motion.h2>
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" style={{ perspective: 1100 }}>
          {DATA.services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 44, rotateX: 7, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}>
              <Tilt max={7} className="glass h-full rounded-3xl p-7">
                <div className="lift">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-600/35 to-cyan-500/25 text-2xl shadow-[0_0_24px_rgba(139,92,246,0.4)]">{s.icon}</span>
                  <h3 className="font-display mt-4 text-[16px] font-bold text-white">{s.title}</h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#a5a3c7]">{s.text}</p>
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
function DevScene({ mx, my }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [2200, 4200], [60, -60]);
  const px = useTransform(mx, [-1, 1], [-16, 16]);
  return (
    <motion.div style={{ y }} className="scene relative">
      <motion.div initial={{ opacity: 0, scale: 0.88, x: -60 }} whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.3, ease: EASE }}
        className="relative overflow-hidden rounded-[1.8rem] border border-violet-500/20 shadow-[0_0_80px_rgba(109,40,217,0.35)]">
        <img src="/img/dev_walkin.jpg" alt="3D developer walking into a futuristic neon workstation" loading="lazy" className="w-full object-cover" />
        <div className="ringplatform" /><div className="ringplatform r2" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050b]/70 via-transparent to-transparent" />
      </motion.div>
      <motion.div style={{ x: px }} className="absolute -right-3 top-[6%] flex flex-col gap-3">
        {[["mail", `mailto:${DATA.contact.email}`], ["github", DATA.contact.github], ["linkedin", DATA.contact.linkedin], ["flutter", "#home"]].map(([n, href], i) => (
          <motion.a key={n} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: EASE }}
            className={`${i % 2 ? "floaty d2" : "floaty"} grid h-11 w-11 place-items-center rounded-xl glass text-violet-200 transition hover:text-cyan-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]`}>
            <Icon n={n} className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

function ContactForm() {
  const [state, setState] = useState("idle");
  const submit = (e) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => { setState("success"); e.target.reset(); setTimeout(() => setState("idle"), 2600); }, 1100);
  };
  return (
    <motion.div initial={{ opacity: 0, rotateY: -10, scale: 0.92 }} whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: EASE }}
      className="glass-2 relative rounded-[1.4rem] p-7 md:p-8 shadow-[0_30px_90px_rgba(3,4,12,0.7)]" style={{ perspective: 1000 }}>
      {["tl", "tr", "bl", "br"].map((c) => (
        <motion.span key={c} initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5, ease: EASE }} className={`corner ${c}`} />
      ))}
      <form onSubmit={submit} className="space-y-4">
        {["Name", "Email"].map((ph, i) => (
          <motion.div key={ph} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: EASE }}>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-300/80">
                <Icon n={ph === "Email" ? "mail" : "person"} className="w-4 h-4" />
              </span>
              <input className="field peer !pl-11 !pr-10" type={ph === "Email" ? "email" : "text"} placeholder={ph} required />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-violet-300/60">
                <Icon n={ph === "Email" ? "mail" : "person"} className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.74, duration: 0.6, ease: EASE }}>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-5 text-violet-300/80"><Icon n="chat" className="w-4 h-4" /></span>
            <textarea className="field !pl-11" rows={5} placeholder="Message" required />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.6, ease: EASE }}>
          <Magnetic className="w-full">
            <button type="submit" disabled={state === "loading"}
              className={`btn btn-primary w-full justify-center ${state === "success" ? "!from-emerald-500 !to-cyan-500" : ""}`}>
              <span className="sweep" />
              {state === "idle" && <>Send Message <span className="transition-transform duration-300 group-hover:translate-x-1">➤</span></>}
              {state === "loading" && <span className="flex items-center gap-2"><i className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Transmitting…</span>}
              {state === "success" && <>Message Sent ✓</>}
            </button>
          </Magnetic>
        </motion.div>
      </form>
    </motion.div>
  );
}

export function Contact({ mx, my }) {
  const perks = { "Fast Reply": "⚡", Collaboration: "👥", "Great Results": "⭐" };
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:px-10 xl:grid-cols-[0.85fr_1fr_1fr]">
        <DevScene mx={mx} my={my} />

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <motion.p variants={fadeUp} className="strip !tracking-[0.4em] text-cyan-300">GET IN TOUCH</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display mt-4 text-[clamp(2.2rem,4.2vw,3.4rem)] font-extrabold leading-[1.12]">
            Let's Build<br />Something <span className="text-grad-pb">Amazing</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-4 max-w-md text-[14px] leading-relaxed text-[#a5a3c7]">
            Have a project in mind or want to collaborate? I'd love to hear from you — usually replying within 24 hours.
          </motion.p>
          <div className="mt-8 space-y-4">
            {[
              ["mail", "Email", DATA.contact.email, `mailto:${DATA.contact.email}`],
              ["github", "GitHub", DATA.contact.githubUser, DATA.contact.github],
              ["linkedin", "LinkedIn", DATA.contact.linkedinUser, DATA.contact.linkedin],
            ].map(([ic, label, val, href], i) => (
              <motion.div key={label} variants={fadeUp} custom={3 + i}>
                <Tilt max={5} className="glass">
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="lift flex items-center gap-4 rounded-2xl px-5 py-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.55)] transition-transform duration-500 hover:rotate-12">
                      <Icon n={ic} className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-[13.5px] text-white">{label}</b>
                      <span className="block truncate text-[12px] text-[#a5a3c7]">{val}</span>
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-600/85 to-blue-600/85 text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-all duration-300 hover:translate-x-1">
                      <Icon n="arrow" className="w-4 h-4" />
                    </span>
                  </a>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <ContactForm />
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6">
        {DATA.contactPerks.map((p, i) => (
          <motion.span key={p} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: EASE }}
            className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-300">
            <span className="text-cyan-300">{perks[p]}</span> {p}
            {i < 2 && <span className="ml-8 h-4 w-px bg-white/15" />}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 px-6 lg:px-10 md:flex-row text-[12.5px] text-[#8f8db4]">
        <span>© 2026 {DATA.name}. All rights reserved.</span>
        <span className="flex items-center gap-6">
          <span className="strip">{DATA.strips.hero}</span>
        </span>
        <span className="flex gap-4">
          <a className="transition hover:text-violet-300" href="/legacy/purple.html">v1 Purple</a>
          <a className="transition hover:text-cyan-300" href="/legacy/cyan.html">v1 Cyan</a>
          <a className="transition hover:text-fuchsia-300" href="/legacy/v2/index.html">v2 3D</a>
        </span>
      </div>
    </footer>
  );
}
