import { motion, useScroll, useSpring } from "framer-motion";
import { Cursor, NetworkField, useMouse } from "./fx.jsx";
import { Nav, Hero } from "./sec_a.jsx";
import { Career, Portfolio } from "./sec_b.jsx";
import { Services, Contact, Footer } from "./sec_c.jsx";

export default function App() {
  const { mx, my } = useMouse();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.4 });
  return (
    <>
      <motion.div style={{ scaleX: bar, background: "linear-gradient(90deg,#8b5cf6,#2563eb,#22d3ee)" }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left shadow-[0_0_14px_rgba(139,92,246,0.8)]" />
      <div className="aurora" /><div className="cybergrid" /><div className="beams" />
      <NetworkField mx={mx} my={my} />
      <Cursor />
      <Nav />
      <main>
        <Hero mx={mx} my={my} />
        <Career mx={mx} my={my} />
        <Portfolio mx={mx} my={my} />
        <Services />
        <Contact mx={mx} my={my} />
      </main>
      <Footer />
    </>
  );
}
