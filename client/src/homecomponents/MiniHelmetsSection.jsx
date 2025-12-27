import React, { useEffect, useRef } from "react";
import "./MiniHelmetsSection.css";

export default function MiniHelmetsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add("reveal"),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="mini">
      <div className="mini-inner">

        {/* LEFT */}
        <div className="mini-left">
          <img
            src="https://res.cloudinary.com/dafoanpxr/image/upload/v1765097127/IMG_9504_i3q2jx.jpg"
            alt=""
          />
        </div>

        {/* RIGHT */}
        <div className="mini-right">
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
            <img
              src="https://res.cloudinary.com/dafoanpxr/image/upload/v1765096947/Gemini_Generated_Image_hd7w7rhd7w7rhd7w_1_ocxnej.png"
              alt=""
            />
            <img
              src="https://kreedentials.in/cdn/shop/files/greykids.jpg?v=1729702829"
              alt=""
            />
          </div>
        </div>

      </div>
    </section>
  );
}
