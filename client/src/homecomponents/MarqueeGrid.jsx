import React from "react";
import "./MarqueeGrid.css";

const images = [
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878998/IMG_9659_u7qfdy.jpg",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878991/Gemini_Generated_Image_xa3klexa3klexa3k_2_y4whof.png",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878986/Gemini_Generated_Image_wzvpdxwzvpdxwzvp_bayuhy.png",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1767875875/Gemini_Generated_Image_hd7w7rhd7w7rhd7w_1_jhppv7.png",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1767875874/IMG_9504_rvrcdr.jpg",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1767878974/IMG_9667_f3ywu7.jpg",
];

export default function MarqueeGrid() {
  return (
    <section className="marquee-section">
      <div className="marquee-glow" />

      {/* ROW 1 */}
      <div className="marquee-row left fast">
        <div className="marquee-track">
          {[...images, ...images].map((img, i) => (
            <div className="marquee-card" key={`top-${i}`}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="marquee-row right slow">
        <div className="marquee-track">
          {[...images, ...images].map((img, i) => (
            <div className="marquee-card" key={`bottom-${i}`}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
