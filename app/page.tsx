'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Calendar } from 'lucide-react';
import SmartSky from '@/components/SmartSky';
import AboutCirebon from '@/components/AboutCirebon';
import Navbar from '@/components/Navbar';

type Weather = {
  main: { temp: number };
  weather: { main: string }[];
};

const districts = [
  { name: 'Kejaksan', lat: -6.713, lon: 108.565 },
  { name: 'Kesambi', lat: -6.732, lon: 108.552 },
  { name: 'Pekalipan', lat: -6.72, lon: 108.566 },
  { name: 'Harjamukti', lat: -6.75, lon: 108.54 },
  { name: 'Lemahwungkuk', lat: -6.705, lon: 108.57 },

  // titik populer (biar terasa real)
  { name: 'Alun-Alun Kejaksan', lat: -6.706, lon: 108.557 },
  { name: 'CSB Mall', lat: -6.737, lon: 108.552 },
  { name: 'Grage Mall', lat: -6.713, lon: 108.558 },
  { name: 'Pelabuhan Cirebon', lat: -6.705, lon: 108.573 },
  { name: 'Stasiun Kejaksan', lat: -6.706, lon: 108.555 },
  { name: 'Sumber', lat: -6.76, lon: 108.483 },
  { name: 'Plumbon', lat: -6.72, lon: 108.5 },
  { name: 'Palimanan', lat: -6.7, lon: 108.45 },
  { name: 'Weru', lat: -6.78, lon: 108.52 },
];

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedDistrict.lat}&lon=${selectedDistrict.lon}&units=metric&appid=1fbc2ce1b8cd30171b2083e4d647bd67`);

        const data = await res.json();
        setWeather(data);
      } catch {}
    }

    getWeather();
  }, [selectedDistrict]);

  useEffect(() => {
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getWeatherIcon(main: string) {
    switch (main.toLowerCase()) {
      case 'rain':
        return '🌧️';
      case 'clouds':
        return '☁️';
      case 'clear':
        return '☀️';
      case 'thunderstorm':
        return '⛈️';
      case 'drizzle':
        return '🌦️';
      default:
        return '🌍';
    }
  }

  const hour = time?.getHours() ?? 12;
  const isNight = hour >= 18 || hour < 6;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isNight ? 'text-white' : 'text-slate-800'}`}>
      {/* BACKGROUND SKY */}

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* SKY BACKGROUND */}
        <SmartSky weather={weather?.weather[0].main} />

        {/* OVERLAY */}

        <div className="absolute top-6 right-6 z-20 text-right">
          <div
            className={`backdrop-blur-md px-4 py-2 rounded-xl border text-sm shadow-md
    ${isNight ? 'bg-white/10 text-slate-200 border-white/20' : 'bg-white/30 text-black border-white/40'}
  `}
          >
            {/* LOCATION */}
            <div className="flex items-center gap-2 justify-end text-xs opacity-80">
              <span>📍</span>

              <select value={selectedDistrict.name} onChange={(e) => setSelectedDistrict(districts.find((d) => d.name === e.target.value)!)} className="bg-transparent outline-none cursor-pointer">
                {districts.map((d) => (
                  <option key={d.name} value={d.name} className="text-black">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* WEATHER */}
            {weather && (
              <div className="flex items-center gap-2 justify-end font-medium">
                <span>{getWeatherIcon(weather.weather[0].main)}</span>
                <span>{weather.weather[0].main}</span>
                <span>{Math.round(weather.main.temp)}°C</span>
              </div>
            )}
          </div>
        </div>
        {/* CONTENT */}
        <div className="relative z-10 text-center px-6">
          <div className={`text-2xl md:text-4xl font-semibold tracking-wider mb-2 ${isNight ? 'text-slate-200' : 'text-white'}`}>{time?.toLocaleTimeString()}</div>

          <h1 className={`text-5xl md:text-8xl font-bold tracking-[0.15em] ${isNight ? 'text-transparent text-outline' : 'text-white'}`}>CIREBON CITY</h1>

          <p className={`mt-4 text-sm md:text-base ${isNight ? 'text-slate-300' : 'text-white'}`}>Discover the soul of Cirebon</p>
        </div>
      </section>
      <AboutCirebon />
    </div>
  );
}
