'use client'

import { useEffect, useState } from "react"

export default function SmartScene() {

  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hour, setHour] = useState<number | null>(null)

  useEffect(() => {
    const now = new Date()
    setHour(now.getHours())
  }, [])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {


  }

  if (hour === null) return null

  const isMorning = hour >= 6 && hour < 10
  const isDay = hour >= 10 && hour < 16
  const isEvening = hour >= 16 && hour < 18
  const isNight = hour >= 18 || hour < 6

  const bg =
    isMorning
      ? "/scene/morning.png"
      : isDay
      ? "/scene/day.png"
      : isEvening
      ? "/scene/evening.png"
      : "/scene/night.png"

  return (

    <div
      onMouseMove={handleMove}
      className="absolute inset-0 overflow-hidden"
    >

      {/* SKY BACKGROUND */}

      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: `url(${bg})`,
          transform: `scale(1.25) translate(${pos.x}px, ${pos.y}px)`
        }}
      />

      {/* SUNLIGHT */}

      {isDay && (
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-yellow-300 opacity-20 blur-[160px] animate-pulse"/>
      )}

      {/* SUNSET */}

      {isEvening && (
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/40 to-transparent"/>
      )}

      {/* MOUNTAIN FOREGROUND */}

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
    z-0
  "
  style={{
    transform: `translate(${pos.x * 1}px, ${pos.y * 0.1}px)`
  }}
/>

    </div>
  )
}