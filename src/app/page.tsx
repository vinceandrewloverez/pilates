"use client";

import React from "react";

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
          Choose Your Path
        </h1>
        <p className="text-gray-500 font-medium">
          Select a routine to begin your session
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Pushup Route Button */}
        <a 
          href="/pushup" 
          className="group relative h-64 rounded-[2.5rem] bg-blue-600 overflow-hidden shadow-2xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center border-4 border-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-6xl mb-4 group-hover:animate-bounce">💪</span>
          <span className="text-2xl font-black text-white uppercase tracking-widest">
            Pushups
          </span>
          <p className="text-blue-100 text-sm mt-2 opacity-80 font-medium">Strength & Power</p>
        </a>

        {/* Pilates Route Button */}
        <a 
          href="/pilates" 
          className="group relative h-64 rounded-[2.5rem] bg-emerald-700 overflow-hidden shadow-2xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center border-4 border-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-6xl mb-4 group-hover:rotate-12 transition-transform">🧘</span>
          <span className="text-2xl font-black text-white uppercase tracking-widest">
            Pilates
          </span>
          <p className="text-emerald-100 text-sm mt-2 opacity-80 font-medium">Core & Stability</p>
        </a>
      </div>

      <div className="mt-12 text-gray-300 font-bold text-xs uppercase tracking-[0.3em]">
        Stay Consistent • Stay Strong
      </div>
    </main>
  );
}