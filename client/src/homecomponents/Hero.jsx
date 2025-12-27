import React, { useState, useEffect, useRef } from 'react'
import './Hero.css'

const slides = [
  {
    id: 1,
    title: "JUST DO IT.",
    subtitle: "They keep finding out.",
    image:
      "https://images.pexels.com/photos/2834915/pexels-photo-2834915.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 2,
    title: "STAY READY.",
    subtitle: "Whatever comes next.",
    image:
      "https://images.pexels.com/photos/4761358/pexels-photo-4761358.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 3,
    title: "MOVE YOUR WORLD.",
    subtitle: "Find your momentum.",
    image:
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // OPTIONAL: you can add video support like this:
    // video: "https://your-video-url.mp4",
    // poster: "https://your-poster-image-url.jpg"
  }
]

/**
 * Hero supports:
 * - Auto slide
 * - Swipe gestures
 * - Optional external pause: pass isPausedExternally={menuOpen || searchOpen}
 */
const Hero = ({ isPausedExternally = false }) => {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)
  const videoRefs = useRef([])
  const isPaused = isPausedExternally

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Auto Slide Every 5 Seconds (pauses when isPausedExternally = true)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  // Manage video playback when slide changes or when paused
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return
      if (idx === current && !isPaused) {
        // Play current slide video
        if (video.paused) {
          video.currentTime = 0
          video.play().catch(() => {})
        }
      } else {
        // Pause all other videos
        video.pause()
      }
    })
  }, [current, isPaused])

  // Swipe / touch handling
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null || !e.changedTouches || e.changedTouches.length === 0) return
    const endX = e.changedTouches[0].clientX
    const deltaX = endX - touchStartX.current
    const threshold = 50 // min px to count as swipe

    if (deltaX > threshold) {
      // swipe right → previous slide
      prevSlide()
    } else if (deltaX < -threshold) {
      // swipe left → next slide
      nextSlide()
    }

    touchStartX.current = null
  }

  return (
    <section
      className="hero-section"

      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, i) => {
        const isActive = i === current
        return (
          <div
            key={slide.id}
            className={`hero-slide absolute inset-0 ${isActive ? 'hero-slide--active' : 'hero-slide--inactive'}`}
          >
            {/* Background (image OR video) */}
            {slide.video ? (
              <video
                ref={el => (videoRefs.current[i] = el)}
                className="hero-video"
                src={slide.video}
                poster={slide.poster}
                muted
                loop
                playsInline
              />
            ) : (
              <div
                className="hero-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )}

            {/* Dark gradient overlay */}
            <div className="hero-gradient" />

            {/* TEXT */}
            <div className="hero-text">
              <p className="hero-subtitle">
                {slide.subtitle}
              </p>
              <h1 className="hero-title">
                {slide.title}
              </h1>

              <div className="hero-cta-row">
                <button className="hero-primary-btn">
                  Gear Up
                </button>
                <button className="hero-play-btn">
                  Watch
                  <span className="material-symbols-outlined hero-play-icon">play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        )
      })}

      {/* Bottom Navigation Dots */}
      <div className="hero-dots">
        {slides.map((slide, i) => (
          <span
            key={slide.id}
            className={`hero-dot ${i === current ? 'hero-dot--active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Right Corner Arrows */}
      <div className="hero-controls">
        <button
          onClick={prevSlide}
          className="control-btn"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={nextSlide}
          className="control-btn"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  )
}

export default Hero
