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

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Cirebon&units=metric&appid=1fbc2ce1b8cd30171b2083e4d647bd67');

        const data = await res.json();
        setWeather(data);
      } catch {}
    }

    getWeather();
  }, []);

  useEffect(() => {
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = time?.getHours() ?? 12;
  const isNight = hour >= 18 || hour < 6;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isNight ? 'text-white' : 'text-slate-800'}`}>
      {/* BACKGROUND SKY */}

      {/* NAVBAR */}
      <Navbar/>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* SKY BACKGROUND */}
        <SmartSky />

        {/* OVERLAY */}
        

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
