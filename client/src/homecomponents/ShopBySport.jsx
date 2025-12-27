import React, { useRef } from 'react'
import "./ShopBySport.css"

const sports2 = [
  {
    title: 'Basketball',
    img: 'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg?w=1600',
  },
  {
    title: 'Football',
    img: 'https://images.pexels.com/photos/3991876/pexels-photo-3991876.jpeg?w=1600',
  },
  {
    title: 'Running',
    img: 'https://images.pexels.com/photos/1194039/pexels-photo-1194039.jpeg?w=1600',
  },
  {
    title: 'Training',
    img: 'https://images.pexels.com/photos/6453399/pexels-photo-6453399.jpeg?w=1600',
  }
]

const ShopBySport = () => {
  const scrollRef = useRef()
  let isDragging = false
  let startX, scrollLeft

  const startDrag = (e) => {
    isDragging = true
    startX = e.pageX - scrollRef.current.offsetLeft
    scrollLeft = scrollRef.current.scrollLeft
  }

  const stopDrag = () => (isDragging = false)

  const handleDrag = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = scrollLeft - (x - startX)
  }

  const scrollLeftClick = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" })
  }

  const scrollRightClick = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" })
  }

  return (
    <section className="bysport-section">

      <div className="bysport-header">
        <h2 className="bysport-title">Shop by Sport</h2>

        <div className="bysport-controls">
          <button className="bysport-btn" onClick={scrollLeftClick}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="bysport-btn" onClick={scrollRightClick}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="bysport-scroll"
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseMove={handleDrag}
        onMouseLeave={stopDrag}
      >
        {sports2.map((sport) => (
          <div key={sport.title} className="bysport-card">
            <img src={sport.img} alt={sport.title} />
            <p className="bysport-text">{sport.title}</p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default ShopBySport
