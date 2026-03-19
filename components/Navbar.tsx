'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="relative z-20 w-full flex items-center justify-between md:justify-around px-6 md:px-8 py-5 backdrop-blur-md border-b bg-white text-black">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png" // ganti sesuai file lu
            alt="Logo"
            className="w-10 h-10 object-contain"
          />

          {/* TEXT HILANG DI HP */}
          <span className="md:block font-semibold text-lg">Cirebon Digital City</span>
        </div>

        {/* DESKTOP MENU */}
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

        {/* HAMBURGER (HP) */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={28} />
        </button>
      </nav>

      {/* OVERLAY */}
      <div className={`fixed inset-0 bg-black/40 z-30 transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setOpen(false)} />

      {/* SIDEBAR MENU */}
      <div className={`fixed top-0 right-0 h-full w-[260px] bg-white z-40 shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* MENU LIST */}
        <div className="flex flex-col p-5 gap-4 text-sm font-medium">
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
      </div>
    </>
  );
}
