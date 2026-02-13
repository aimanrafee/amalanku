import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTelegram } from '../hooks/useTelegram';
import counterData from '../data/tools/counter.json';

const TasbihPage = () => {
  const { tg, hapticClick } = useTelegram();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const currentZikir = counterData.counters[currentIndex];

  const handleIncrement = () => {
    if (count < currentZikir.limit) {
      const newCount = count + 1;
      setCount(newCount);
      setTotalCount(prev => prev + 1);
      
      // Memberi maklum balas getaran setiap kali tekan
      if (hapticClick) hapticClick();

      // Getaran lebih kuat apabila mencapai limit (cth: 33 atau 999)
      if (newCount === currentZikir.limit) {
        tg?.HapticFeedback?.notificationOccurred('success');
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    if (hapticClick) hapticClick();
  };

  const nextZikir = () => {
    setCount(0);
    setCurrentIndex((prev) => (prev + 1) % counterData.counters.length);
  };

  return (
    <div className="min-h-screen bg-amalanku-bg flex flex-col items-center px-6 py-8">
      <Head>
        <title>Tasbih Digital | amalanku</title>
      </Head>

      {/* Header Navigasi */}
      <div className="w-full flex justify-between items-center mb-10">
        <button 
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-xl bg-white shadow-neu-flat flex items-center justify-center text-gray-600"
        >
          ✕
        </button>
        <h1 className="text-lg font-bold text-gray-700 uppercase tracking-widest">Tasbih</h1>
        <div className="w-10"></div>
      </div>

      {/* Paparan Nama Zikir */}
      <div className="text-center mb-6">
        <p className="text-amalanku-teal font-bold text-xs uppercase tracking-[0.3em] mb-2">Zikir Semasa</p>
        <h2 className="text-2xl font-bold text-gray-800">{currentZikir.name}</h2>
      </div>

      {/* Kaunter Utama (Besar) */}
      <div 
        onClick={handleIncrement}
        className="relative w-64 h-64 rounded-full bg-amalanku-bg shadow-neu-flat flex flex-col items-center justify-center cursor-pointer active:shadow-neu-pressed transition-all duration-75 select-none border-8 border-white/50"
      >
        <span className="text-6xl font-mono font-bold text-gray-800">{count}</span>
        <span className="text-gray-400 text-sm mt-2 font-medium">/{currentZikir.limit}</span>
        
        {/* Progress Ring Ringkas */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="transparent"
            stroke="#0d9488"
            strokeWidth="4"
            strokeDasharray={754}
            strokeDashoffset={754 - (754 * count) / currentZikir.limit}
            className="transition-all duration-200"
          />
        </svg>
      </div>

      {/* Statistik & Reset */}
      <div className="grid grid-cols-2 gap-6 w-full mt-12">
        <div className="p-4 rounded-2xl bg-white/50 shadow-neu-flat text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Jumlah Keseluruhan</p>
          <p className="text-xl font-bold text-gray-700">{totalCount}</p>
        </div>
        <button 
          onClick={handleReset}
          className="p-4 rounded-2xl bg-white/50 shadow-neu-flat text-center active:shadow-neu-pressed"
        >
          <p className="text-[10px] text-rose-500 uppercase font-bold">Reset Kaunter</p>
          <p className="text-xl font-bold text-rose-600">↺</p>
        </button>
      </div>

      {/* Butang Tukar Zikir */}
      <button 
        onClick={nextZikir}
        className="mt-8 w-full py-4 bg-amalanku-teal text-white rounded-2xl font-bold shadow-lg shadow-teal-200 active:scale-95 transition-transform"
      >
        TUKAR ZIKIR SETERUSNYA
      </button>

      <p className="mt-6 text-[10px] text-gray-400 text-center italic">
        Sentuh bulatan besar untuk mengira. <br/> Telefon akan bergetar setiap kali sentuhan dibuat.
      </p>
    </div>
  );
};

export default TasbihPage;
