'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Calendar } from 'lucide-react';
import SmartSky from '@/components/SmartSky';
import AboutCirebon from '@/components/AboutCirebon';

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
      <nav className={`relative z-20 w-full flex items-center justify-around px-6 md:px-8 py-5 backdrop-blur-md border-b transition bg-white text-black`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]" />
          <span className="font-semibold text-lg">Cirebon Digital City</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">
            Explore
          </a>
          <a href="#" className="hover:text-blue-600">
            Culture
          </a>
          <a href="#" className="hover:text-blue-600">
            Culinary
          </a>
          <a href="#" className="hover:text-blue-600">
            UMKM
          </a>
          <a href="#" className="hover:text-blue-600">
            Events
          </a>
        </div>

        
      </nav>

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
