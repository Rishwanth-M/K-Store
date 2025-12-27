import React from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

const tiles = [
  {
    eyebrow: "Kreedentials Pegasus Premium",
    title: "For the Ultimate Energised Ride",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1765097127/IMG_9504_i3q2jx.jpg",
  },
  {
    eyebrow: "Women's Training Gear",
    title: "Power Up Your Workouts",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1765096947/Gemini_Generated_Image_hd7w7rhd7w7rhd7w_1_ocxnej.png",
  },
];

const Featured = () => {
  const navigate = useNavigate();

  return (
    <section className="featured-section">
      {/* CENTERED HEADING */}
      <h2 className="featured-heading">Featured</h2>

      {/* GRID */}
      <div className="featured-grid">
        {tiles.map((tile) => (
          <div key={tile.title} className="featured-tile">
            <img
              src={tile.img}
              alt={tile.title}
              className="featured-img"
            />

            <div className="featured-content">
              <p className="featured-eyebrow">{tile.eyebrow}</p>
              <h3 className="featured-title">{tile.title}</h3>

              <button
                className="featured-btn"
                onClick={() => navigate("/allproducts")}
              >
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
