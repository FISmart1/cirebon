"use client";
import { useEffect, useState } from "react";

export default function DynamicSky() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();

  let bg = "bg-blue-400";
  let icon = "☀️";

  if (hour >= 5 && hour < 10) {
    bg = "bg-gradient-to-b from-orange-300 to-blue-300";
    icon = "🌅";
  } else if (hour >= 10 && hour < 17) {
    bg = "bg-gradient-to-b from-blue-400 to-blue-200";
    icon = "☀️";
  } else if (hour >= 17 && hour < 19) {
    bg = "bg-gradient-to-b from-orange-400 to-purple-300";
    icon = "🌇";
  } else {
    bg = "bg-gradient-to-b from-slate-900 to-blue-900";
    icon = "🌙";
  }

  return (
    <div className={`absolute inset-0 ${bg} transition-all duration-1000`}>
      <div className="absolute top-10 left-10 text-5xl">
        {icon}
      </div>

      <div className="absolute top-10 right-10 text-white text-lg font-semibold">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}