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
      // Hide all except first
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 60,
      });
      gsap.set(cardsRef.current[0], {
        opacity: 1,
        y: 0,
      });

      // Timeline controlled by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 80}%`,
          scrub: true,
          pin: true,          // 🔒 THIS IS THE LOCK
          anticipatePin: 1,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (i === 0) return;

        tl.to(
          cardsRef.current[i - 1],
          { opacity: 0, y: -60, duration: 0.5 },
          "+=0.3"
        ).to(
          card,
          { opacity: 1, y: 0, duration: 0.5 },
          "<"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="movement-section">
      <div className="movement-stage">
        {cards.map((card, i) => (
          <div
            key={i}
            className="movement-card"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className="movement-image">
              <img src={card.img} alt="" />
            </div>

            <div className="movement-content">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
