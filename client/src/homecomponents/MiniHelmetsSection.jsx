import React, { useEffect, useRef } from "react";
import "./MiniHelmetsSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MiniHelmetsSection() {
  const sectionRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightContentRef = useRef(null);
  const bottomImgsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Left image parallax (slower)
      gsap.from(leftImgRef.current, {
        y: 60,
        scale: 1.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Right content parallax (faster)
      gsap.from(rightContentRef.current, {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Bottom images depth stagger
      gsap.from(bottomImgsRef.current, {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mini">
      <div className="mini-inner">

        {/* LEFT */}
        <div className="mini-left">
          <img
            ref={leftImgRef}
            src="https://res.cloudinary.com/dafoanpxr/image/upload/v1767878998/IMG_9659_u7qfdy.jpg"
            alt=""
          />
        </div>

        {/* RIGHT */}
        <div className="mini-right" ref={rightContentRef}>
          <h2>Performance for Kids</h2>
          <p>
            Premium Grey & Black sportswear built for comfort, movement
            and everyday performance — perfect for play, training and outdoors.
          </p>

          <ul>
            <li>Moisture-wicking & breathable</li>
            <li>Four-way stretch fabric</li>
            <li>Anti-microbial with UPF 50+</li>
          </ul>

          <div className="mini-images">
            {[
              "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878982/IMG_9670_pp0r3l.jpg",
              "https://kreedentials.in/cdn/shop/files/greykids.jpg?v=1729702829",
            ].map((src, i) => (
              <img
                key={i}
                ref={(el) => (bottomImgsRef.current[i] = el)}
                src={src}
                alt=""
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
