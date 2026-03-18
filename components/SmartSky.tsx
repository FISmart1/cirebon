'use client';

import { useEffect, useState } from 'react';

type Props = {
  weather?: string;
};

export default function SmartScene({ weather }: Props) {
  const [hour, setHour] = useState<number | null>(null);
  const [drag, setDrag] = useState(false);
  const [position, setPosition] = useState(50); // persen

  useEffect(() => {
    setHour(new Date().getHours());
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!drag) return;

    const percent = (e.clientX / window.innerWidth) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  }

  const weatherMain = weather?.toLowerCase() || '';

  if (hour === null) return null;
  const isRain = weatherMain.includes('rain');
  const isThunder = weatherMain.includes('thunderstorm');
  const isMorning = hour >= 6 && hour < 10;
  const isDay = hour >= 10 && hour < 16;
  const isEvening = hour >= 16 && hour < 18;
  const isNight = hour >= 18 || hour < 6;

  // 2 gambar per waktu
  const scene = isMorning ? ['/scene/morning1.webp', '/scene/morning2.webp'] : isDay ? ['/scene/day1.webp', '/scene/day2.webp'] : isEvening ? ['/scene/evening1.webp', '/scene/evening2.webp'] : ['/scene/night1.webp', '/scene/night2.webp'];

  return (
    <div className="absolute inset-0 overflow-hidden cursor-ew-resize" onMouseDown={() => setDrag(true)} onMouseUp={() => setDrag(false)} onMouseMove={handleMove}>
      {/* IMAGE KANAN (BASE) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scene[1]})`,
        }}
      />

      {/* IMAGE KIRI (REVEAL) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scene[0]})`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />
      {isRain && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.6,
          }}
        >
          <source src="https://res.cloudinary.com/dnzhewrrx/video/upload/v1773810333/Rain_Effect_Black_Screen_viral_umq8d8.mp4" type="video/mp4" />
        </video>
      )}

      {/* LINE DIVIDER */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/70 shadow-lg" style={{ left: `${position}%` }} />

      {/* SUNLIGHT */}
      {isDay && <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-yellow-300 opacity-20 blur-[160px] animate-pulse" />}

      {/* SUNSET */}
      {isEvening && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
          style={{
            mixBlendMode: 'screen',
            opacity: 1,
          }}
        >
          <source src="https://res.cloudinary.com/dnzhewrrx/video/upload/v1773827579/Birds_Flying_Black_Screen_blackscreen_birds_India_apaavs.mp4" type="video/mp4" />
        </video>
      )}

      {isNight && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
          style={{
            mixBlendMode: 'screen',
            opacity: 5,
          }}
        >
          <source src="https://res.cloudinary.com/dnzhewrrx/video/upload/v1773828503/Black_screen_Star_Particle_night_stars_Particle_Light_Effect_e7nokp.mp4" type="video/mp4" />
        </video>
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
  );
}
