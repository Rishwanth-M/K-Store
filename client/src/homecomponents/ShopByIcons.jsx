import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShopByIcons.css";

const icons = [
  {
    title: "T-Shirt",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1763276540/IMG_9126_jzxr8o.jpg",
    category: "tshirt",
  },
  {
    title: "Shorts",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1763276541/IMG_9123_qccgy3.jpg",
    category: "shorts",
  },
  {
    title: "Socks",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1763276506/IMG_9124_oeqqb4.jpg",
    category: "socks",
  },
  {
    title: "Cap",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1765096469/Black_cap_boy_gkzdq4.jpg",
    category: "cap",
  },
  {
    title: "Jacket",
    img: "https://res.cloudinary.com/dafoanpxr/image/upload/v1763276504/IMG_9122_xk9xum.jpg",
    category: "jacket",
  },
];

const ShopByIcons = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate("/allProducts", { state: { category } });
  };

  return (
    <section className="icons-section">
      <h2 className="icons-title">Shop by Icons</h2>

      <div className="icons-grid">
        {icons.map((icon) => (
          <div
            key={icon.title}
            className="icons-card"
            onClick={() => handleClick(icon.category)}
          >
            <div className="icons-img-wrap">
              <img src={icon.img} alt={icon.title} />
            </div>
            <p className="icons-text">{icon.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByIcons;
