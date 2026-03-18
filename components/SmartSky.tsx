'use client'

import { useEffect, useState } from "react"

export default function SmartScene() {

  const [hour, setHour] = useState<number | null>(null)
  const [drag, setDrag] = useState(false)
  const [position, setPosition] = useState(50) // persen

  useEffect(() => {
    setHour(new Date().getHours())
  }, [])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!drag) return

    const percent = (e.clientX / window.innerWidth) * 100
    setPosition(Math.max(0, Math.min(100, percent)))
  }

  if (hour === null) return null

  const isMorning = hour >= 6 && hour < 10
  const isDay = hour >= 10 && hour < 16
  const isEvening = hour >= 16 && hour < 18
  const isNight = hour >= 18 || hour < 6

  // 2 gambar per waktu
  const scene = isMorning
    ? ["/scene/morning1.png", "/scene/morning2.png"]
    : isDay
    ? ["/scene/day1.png", "/scene/day2.png"]
    : isEvening
    ? ["/scene/evening1.png", "/scene/evening2.png"]
    : ["/scene/night1.png", "/scene/night2.png"]

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-ew-resize"
      onMouseDown={() => setDrag(true)}
      onMouseUp={() => setDrag(false)}
      onMouseMove={handleMove}
    >

      {/* IMAGE KANAN (BASE) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scene[1]})`
        }}
      />

      {/* IMAGE KIRI (REVEAL) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scene[0]})`,
          clipPath: `inset(0 ${100 - position}% 0 0)`
        }}
      />

      {/* LINE DIVIDER */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/70 shadow-lg"
        style={{ left: `${position}%` }}
      />

      {/* SUNLIGHT */}
      {isDay && (
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-yellow-300 opacity-20 blur-[160px] animate-pulse"/>
      )}

      {/* SUNSET */}
      {isEvening && (
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/40 to-transparent"/>
      )}

      {/* MOUNTAIN */}
      <img
        src="/scene/gunung.webp"
        className="
          absolute
          bottom-[-40px] 
          sm:bottom-[-60px]
          md:bottom-[-80px]
          lg:bottom-[-100px]
          w-[140%]
          md:w-[120%]
          lg:w-full
          left-1/2
          -translate-x-1/2
          max-w-none
          pointer-events-none
          select-none
          z-10
        "
      />

    </div>
  )
}