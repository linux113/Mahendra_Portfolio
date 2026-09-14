import React from "react";
import { motion, useScroll } from "framer-motion";
import { DATA, NAV } from "./data.js";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- icons ---------- */
const ICONS = {
  github: (
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.13v3.16c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.31h4.52V23H.24V8.31Zm8.34 0h4.33v2h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V23h-4.51v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.58V8.31Z" />
  ),
  mail: (
    <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.3-.2 7.7 6.05 7.7-6.05H4.3ZM20 7.79l-7.38 5.8a1 1 0 0 1-1.24 0L4 7.79V18.5c0 .28.22.5.5.5h15c.28 0 .5-.22.5-.5V7.79Z" />
  ),
  phone: (
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
    </>
  ),
  code: (
    <>
      <polyline points="8 7 3 12 8 17" />
      <polyline points="16 7 21 12 16 17" />
      <line x1="13.5" y1="4.5" x2="10.5" y2="19.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.8 3.2 8.4 7.5 10 4.3-1.6 7.5-5.2 7.5-10v-6L12 2.5Z" />
      <polyline points="9 11.5 11.2 13.8 15.2 9.5" />
    </>
  ),
  arrow: (
    <>
      <line x1="4" y1="20" x2="18" y2="6" />
      <polyline points="9 6 18 6 18 15" />
    </>
  ),
  up: (
    <>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </>
  ),
};
const Icon = ({ id, ...rest }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
    {ICONS[id]}
  </svg>
);

/* ---------- hooks ---------- */
function useTypewriter(words) {
  const [txt, setTxt] = React.useState(REDUCED ? words[0] : "");
  React.useEffect(() => {
    if (REDUCED) return;
    let alive = true, wi = 0, ci = 0, del = false, t;
    const tick = () => {
      if (!alive) return;
      const w = words[wi];
      ci += del ? -1 : 1;
      setTxt(w.slice(0, ci));
      let d = del ? 42 : 92;
      if (!del && ci === w.length) { d = 1700; del = true; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 380; }
      t = setTimeout(tick, d);
    };
    t = setTimeout(tick, 500);
    return () => { alive = false; clearTimeout(t); };
  }, [words]);
  return txt;
}

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

/* ---------- reveal wrapper ---------- */
function R({ children, delay = 0, className }) {
  if (REDUCED) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Shows /img/mahendra.png (the owner's real photo) the moment it exists in the
   repo; until then falls back to the neon "MP" monogram. */
function Hex({ alt }) {
  const [hasPhoto, setHasPhoto] = React.useState(true);
  return (
    <div className="hex-wrap">
      <div className="hex-glow" />
      <div className="hex-frame" />
      <div className="hex">
        {hasPhoto ? (
          <img src="/img/mahendra.png" alt={alt} onError={() => setHasPhoto(false)} />
        ) : (
          <div className="mono" role="img" aria-label={alt}>MP</div>
        )}
      </div>
    </div>
  );
}

/* ---------- ambient layers ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  if (REDUCED) return null;
  return <motion.div id="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

const BgOrbs = () => (
  <div className="bg-orbs" aria-hidden="true">
    <span className="o1" />
    <span className="o2" />
    <span className="o3" />
  </div>
);

/* ---------- sections ---------- */
function Nav() {
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [open, setOpen] = React.useState(false);
  return (
    <header className="nav">
      <a className="brand" href="#home">Portfolio</a>
      <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>
      <ul className={"nav-links" + (open ? " open" : "")}>
        {NAV.map((n) => (
          <li key={n.id}>
            <a className={active === n.id ? "active" : ""} href={"#" + n.id} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

function Hero() {
  const typed = useTypewriter(DATA.roles);
  return (
    <section className="hero" id="home">
      <R>
        <div className="hi">Hello, It's Me</div>
        <h1>{DATA.name}</h1>
        <div className="role">
          And I'm a <span>{typed}</span>
          <span className="caret">|</span>
        </div>
        <p>{DATA.heroLead}</p>
        <div className="socials">
          {DATA.socials.map((s) => (
            <a key={s.id} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.label} title={s.label}>
              <Icon id={s.id} />
            </a>
          ))}
        </div>
        <a className="btn-cyan" href={DATA.cv} download>Download CV</a>
      </R>
      <R delay={0.15}>
        <Hex alt="Mahendra Kumar Prajapat" />
      </R>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <R className="about-col">
          <Hex alt="About Mahendra Kumar Prajapat" />
          <a className="btn-cyan" href="mailto:mahendraktech7568@gmail.com?subject=Opportunity">Hire Me</a>
        </R>
        <R delay={0.1}>
          <h2>About <span className="c">Me</span></h2>
          <div className="sub">{DATA.about.sub}</div>
          <p>{DATA.about.p1}</p>
          <p>{DATA.about.p2}</p>
        </R>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services">
      <R className="sec-head center">
        <h2 className="sec-title">Our <span className="c">Services</span></h2>
      </R>
      <div className="svc-grid">
        {DATA.services.map((s, i) => (
          <R key={s.title} delay={i * 0.12}>
            <div className="svc">
              <span className="ic"><Icon id={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="btn-mini" href="#contact">Read More</a>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio">
      <R className="sec-head center">
        <h2 className="sec-title">Latest <span className="c">Project</span></h2>
      </R>
      <div className="prj-grid">
        {DATA.projects.map((p, i) => (
          <R key={p.title} delay={(i % 3) * 0.1}>
            <a className="prj" href={p.link} target="_blank" rel="noreferrer" aria-label={p.title}>
              <img src={p.img} alt={p.title} style={p.hue ? { filter: `hue-rotate(${p.hue}deg)` } : undefined} loading="lazy" />
              <span className="badge">{p.kind.toUpperCase()}</span>
              <div className="ov">
                <b>{p.title}</b>
                <p>{p.text}</p>
                <span className="cir"><Icon id="arrow" /></span>
              </div>
              <span className="go" aria-hidden="true"><Icon id="arrow" /></span>
            </a>
          </R>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = React.useState("idle"); // idle | sending | sent
  const submit = (e) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");
    setTimeout(() => setState("sent"), 1100);
  };
  return (
    <section id="contact">
      <R className="sec-head center">
        <h2 className="sec-title">Contact <span className="c">Me!</span></h2>
      </R>
      <R>
        <form className="c-form" onSubmit={submit}>
          <div className="c-row">
            <input className="field" name="name" placeholder="Your Name" required />
            <input className="field" type="email" name="email" placeholder="Email Address" required />
          </div>
          <div className="c-row">
            <input className="field" name="phone" placeholder="Phone Number" />
            <input className="field" name="subject" placeholder="Email Subject" />
          </div>
          <textarea className="field" name="message" placeholder="Your Message" required />
          <div className="send-wrap">
            <button className="btn-cyan" type="submit" disabled={state !== "idle"}>
              {state === "idle" ? "Send Message" : state === "sending" ? "Sending…" : "Message Sent ✓"}
            </button>
          </div>
        </form>
      </R>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div>{DATA.footer.replace("Mahendra Kumar Prajapat", "")}<b>Mahendra Kumar Prajapat</b> | All Rights Reserved.</div>
      <button className="top-btn" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" })}>
        <Icon id="up" />
      </button>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <BgOrbs />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
