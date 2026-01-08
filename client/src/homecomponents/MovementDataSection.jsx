import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MovementDataSection.css";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Engineered for Movement",
    text: "Designed to move naturally with your body during training and play.",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878998/IMG_9659_u7qfdy.jpg",
  },
  {
    title: "Breathable Performance",
    text: "Advanced fabrics that stay light, breathable, and comfortable.",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1767875875/Gemini_Generated_Image_hd7w7rhd7w7rhd7w_1_jhppv7.png",
  },
  {
    title: "Built for Endurance",
    text: "Durable materials that withstand intense use and washing.",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878991/Gemini_Generated_Image_xa3klexa3klexa3k_2_y4whof.png",
  },
  {
    title: "Everyday Comfort",
    text: "Perfect balance of flexibility, softness, and structure.",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1767875874/IMG_9504_rvrcdr.jpg",
  },
];

export default function MovementDataSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardsEl = cardsRef.current;

      // Initial state
      gsap.set(cardsEl, {
        opacity: 0,
        y: 60,
      });

      gsap.set(cardsEl[0], {
        opacity: 1,
        y: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
  trigger: sectionRef.current,
  start: "top top",
  end: `+=${cards.length * window.innerHeight}`,
  scrub: true,
  pin: true,
  pinSpacing: false, // 🔥 IMPORTANT
  anticipatePin: 1,
  invalidateOnRefresh: true,
},

      });

      // Card transitions
      cardsEl.forEach((card, i) => {
        if (i === 0) return;

        tl.to(cardsEl[i - 1], {
          opacity: 0,
          y: -60,
          duration: 0.6,
        })
          .to(
            card,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            "<"
          );
      });

      // Hold last card before unpin
      tl.to({}, { duration: 0.8 });

      // Refresh to fix layout shifts
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
  <section ref={sectionRef} className="movement-section">
    <div className="movement-stage">
      {cards.map((card, i) => (
        <div
          key={i}
          className="movement-card"
          ref={(el) => (cardsRef.current[i] = el)}
        >
          <div className="movement-image">
            <img src={card.img} alt={card.title} />
          </div>

          <div className="movement-content">
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔥 Spacer to replace pinSpacing */}
  <div
    style={{
      height: `${cards.length * 100}vh`,
    }}
  />
</>

  );
}
