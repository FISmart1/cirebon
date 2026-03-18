'use client';

import { useEffect, useState } from 'react';

export default function CircleClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* circle */}

      <div className="absolute w-full h-full rounded-full border border-white/30 backdrop-blur-xl bg-white/10" />

      {/* hour hand */}

      <div className="absolute w-[3px] h-16 bg-white rounded" style={{ transform: `rotate(${hourDeg}deg) translateY(-40px)` }} />

      {/* minute */}

      <div className="absolute w-[2px] h-20 bg-white/80 rounded" style={{ transform: `rotate(${minuteDeg}deg) translateY(-50px)` }} />

      {/* second */}

      <div className="absolute w-[2px] h-24 bg-red-400 rounded" style={{ transform: `rotate(${secondDeg}deg) translateY(-60px)` }} />

      {/* center */}

      <div className="w-4 h-4 bg-white rounded-full z-10" />

      {/* digital */}

      <div className="absolute bottom-[-35px] text-center text-lg font-semibold">{time.toLocaleTimeString('id-ID')}</div>
    </div>
  );
}
