import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTelegram } from '../hooks/useTelegram';
import farduData from '../data/zikir-doa/fardu.json';

const ZikirFarduPage = () => {
  const { hapticClick } = useTelegram();
  const [waktu, setWaktu] = useState<'subuh' | 'zohor' | 'asar' | 'maghrib' | 'isyak'>('subuh');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ambil senarai zikir berdasarkan waktu yang dipilih
  const currentZikirList = farduData.solat_fardu[waktu].zikir_utama;

  const handleNext = () => {
    if (currentIndex < currentZikirList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (hapticClick) hapticClick();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      if (hapticClick) hapticClick();
    }
  };

  return (
    <div className="min-h-screen bg-amalanku-bg px-6 py-8 flex flex-col">
      <Head>
        <title>Zikir Fardu | amalanku</title>
      </Head>

      {/* Navigasi & Pilihan Waktu */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white shadow-neu-flat flex items-center justify-center text-gray-600 active:shadow-neu-pressed">
          ←
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Zikir Fardu</h1>
      </div>

      {/* Tabs Waktu Solat (Horizontal Scroll) */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {(['subuh', 'zohor', 'asar', 'maghrib', 'isyak'] as const).map((w) => (
          <button
            key={w}
            onClick={() => {
              setWaktu(w);
              setCurrentIndex(0);
              if (hapticClick) hapticClick();
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              waktu === w 
              ? 'bg-amalanku-teal text-white shadow-lg' 
              : 'bg-white text-gray-400 shadow-neu-flat'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Swipeable Card Container */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <div className="relative w-full h-[450px]">
          {currentZikirList.map((zikir, index) => (
            <div
              key={zikir.id}
              className={`absolute inset-0 transition-all duration-500 transform ${
                index === currentIndex 
                  ? 'translate-x-0 opacity-100 scale-100 z-10' 
                  : index < currentIndex 
                    ? '-translate-x-full opacity-0 scale-90 -z-10' 
                    : 'translate-x-full opacity-0 scale-90 -z-10'
              }`}
            >
              <div className="w-full h-full p-8 rounded-amalanku bg-amalanku-bg shadow-neu-flat border border-white/50 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold text-amalanku-teal uppercase bg-teal-50 px-3 py-1 rounded-full">
                      Bahagian {index + 1}/{currentZikirList.length}
                    </span>
                    {zikir.ulangan > 1 && (
                      <span className="text-[10px] font-bold text-amalanku-gold uppercase bg-gold-50 px-3 py-1 rounded-full">
                        Ulang {zikir.ulangan}x
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{zikir.tajuk}</h2>
                  <p dir="rtl" className="text-2xl font-arabic leading-[2.2] text-right text-gray-800">
                    {zikir.arab}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    {zikir.terjemahan}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-6 px-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-neu-flat active:shadow-neu-pressed transition-all ${
            currentIndex === 0 ? 'opacity-20' : 'opacity-100'
          }`}
        >
          ◀
        </button>
        
        <div className="flex gap-2">
          {currentZikirList.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'w-6 bg-amalanku-teal' : 'w-2 bg-gray-300'
              }`} 
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === currentZikirList.length - 1}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-neu-flat active:shadow-neu-pressed transition-all ${
            currentIndex === currentZikirList.length - 1 ? 'opacity-20' : 'opacity-100'
          }`}
        >
          ▶
        </button>
      </div>
      
      {/* Doa Khusus Button */}
      <button className="mt-8 w-full py-4 bg-white shadow-neu-flat rounded-2xl text-amalanku-teal font-bold text-sm uppercase tracking-widest active:shadow-neu-pressed transition-all">
        📖 Baca Doa {waktu}
      </button>
    </div>
  );
};

export default ZikirFarduPage;
