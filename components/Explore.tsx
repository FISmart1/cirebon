'use client'

import { useEffect, useState } from 'react'

const data = [
  { img: '/explore/batik.jpg' },
  { img: '/explore/rotan.jpg' },
  { img: '/explore/empal.jpeg' },
  { img: '/explore/Nasi-Jamblang.webp' },
  { img: '/explore/goa_sunyaragi.jpg' },
  { img: '/explore/kesepuhan.jpg' },
]

export default function Explore() {
  const [index, setIndex] = useState(0)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [pause])

  return (
    <section className="relative py-24 overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-107"
        style={{
          backgroundImage: "url('/bg/bg-explore.jpeg')",
          backgroundPosition: "center -6%"
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="text-white">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Explore <br/> Kota Cirebon
          </h2>

          <button className="mt-6 px-6 py-3 rounded-full border border-white/50 hover:bg-white hover:text-black transition">
            Jelajahi
          </button>
        </div>

        {/* RIGHT - CAROUSEL */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <div
            className="flex gap-6 transition-transform duration-700"
            style={{
              transform: `translateX(-${index * 260}px)`
            }}
          >
            {data.concat(data).map((item, i) => (
              <div
                key={i}
                className="min-w-[240px] h-[320px] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={item.img}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}