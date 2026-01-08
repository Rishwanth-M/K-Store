import React, { useEffect, useRef } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text, useColorModeValue } from "@chakra-ui/react";

gsap.registerPlugin(ScrollTrigger);

const tiles = [
  {
    eyebrow: "Kreedentials Pegasus Premium",
    title: "For the Ultimate Energised Ride",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1767875874/IMG_9504_rvrcdr.jpg",
  },
  {
    eyebrow: "Women's Training Gear",
    title: "Power Up Your Workouts",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878998/IMG_9659_u7qfdy.jpg",
  },
];

const Featured = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const tileRefs = useRef([]);

  const titleColor = useColorModeValue("#111", "#f5f5f5");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(tileRefs.current, {
        opacity: 0,
        y: 60,
        scale: 0.96,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="featured-section" ref={sectionRef}>
      <Text
        as="h2"
        className="featured-heading"
        color={titleColor}
      >
        Featured
      </Text>

      <div className="featured-grid">
        {tiles.map((tile, i) => (
          <div
            key={tile.title}
            className="featured-tile"
            ref={(el) => (tileRefs.current[i] = el)}
          >
            <img
  src={tile.img}
  alt={tile.title}
  className="featured-img"
/>

            <div className="featured-content">
              <p>{tile.eyebrow}</p>
              <h3>{tile.title}</h3>
              <button onClick={() => navigate("/allproducts")}>
                Shop
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
