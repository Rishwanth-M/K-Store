import React, { useRef } from "react";
import "./ShopGiftsBySport.css";

const sports = [
  { title: 'T-Shirt', img: 'https://res.cloudinary.com/dafoanpxr/image/upload/v1763276540/IMG_9126_jzxr8o.jpg' },
  { title: 'Shorts', img: 'https://res.cloudinary.com/dafoanpxr/image/upload/v1763276541/IMG_9123_qccgy3.jpg' },
  { title: 'Socks', img: 'https://res.cloudinary.com/dafoanpxr/image/upload/v1763276506/IMG_9124_oeqqb4.jpg' },
  { title: 'Cap', img: 'https://res.cloudinary.com/dafoanpxr/image/upload/v1765096469/Black_cap_boy_gkzdq4.jpg' },
  { title: 'Jacket', img: 'https://res.cloudinary.com/dafoanpxr/image/upload/v1763276504/IMG_9122_xk9xum.jpg' },
];

const ShopGiftsBySport = () => {
  const scrollRef = useRef();
  let isDragging = false;
  let startX;
  let scrollLeft;

  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const stopDrag = () => { isDragging = false; };

  const handleDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  const scrollLeftClick = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRightClick = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section className="sport-section">
  <div className="sport-container">

    <div className="sport-header">
      <h2 className="sport-title">Shop Gifts by Sport</h2>

      <div className="sport-controls">
        <button className="sport-btn" onClick={scrollLeftClick}>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="sport-btn" onClick={scrollRightClick}>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    <div
      ref={scrollRef}
      className="sport-scroll"
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseMove={handleDrag}
      onMouseLeave={stopDrag}
    >
      {sports.map((sport) => (
        <div key={sport.title} className="sport-card">
          <img src={sport.img} alt={sport.title} />
          <p>{sport.title}</p>
        </div>
      ))}
    </div>

  </div>
</section>

  );
};

export default ShopGiftsBySport;
