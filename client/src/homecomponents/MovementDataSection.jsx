import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "./MovementDataSection.css";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
  "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
];

export default function MovementDataSection() {
  const sectionRef = useRef(null);
  const [locked, setLocked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 🔒 Lock animation only while section is in view
  useEffect(() => {
    const onScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setLocked(inView);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.08 });
    const raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="lock-section">

      {/* 🔹 STICKY TITLE */}
      <div className="cards-header">
        <h2 className="cards-title">Cards</h2>
      </div>

      {/* 🔹 FIXED CARD LAYER */}
      <div className={`fixed-layer ${locked ? "is-fixed" : ""}`}>
        {images.map((src, i) => {
          const opacity = useTransform(
            scrollYProgress,
            [i / images.length, (i + 1) / images.length],
            [1, 0]
          );

          const y = useTransform(
            scrollYProgress,
            [i / images.length, (i + 1) / images.length],
            [0, -120]
          );

          return (
            <motion.img
              key={i}
              src={src}
              className="lock-card"
              style={{
                opacity,
                y,
                zIndex: images.length - i,
              }}
            />
          );
        })}
      </div>

    </section>
  );
}
