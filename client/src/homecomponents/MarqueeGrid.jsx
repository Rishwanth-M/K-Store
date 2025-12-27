import React from "react";
import "./MarqueeGrid.css";

const images = [
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1765097127/IMG_9504_i3q2jx.jpg",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1765096947/Gemini_Generated_Image_hd7w7rhd7w7rhd7w_1_ocxnej.png",
  "https://kreedentials.in/cdn/shop/files/greykids.jpg?v=1729702829",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1765097127/IMG_9504_i3q2jx.jpg",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1765096947/Gemini_Generated_Image_hd7w7rhd7w7rhd7w_1_ocxnej.png",
  "https://kreedentials.in/cdn/shop/files/greykids.jpg?v=1729702829",
  "https://res.cloudinary.com/dafoanpxr/image/upload/v1765097127/IMG_9504_i3q2jx.jpg",
];

export default function MarqueeGrid() {
  return (
    <section className="marquee-section">
      {/* ROW 1 */}
      <div className="marquee-row left">
        <div className="marquee-track">
          {[...images, ...images].map((img, i) => (
            <div className="marquee-card" key={`top-${i}`}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="marquee-row right">
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
