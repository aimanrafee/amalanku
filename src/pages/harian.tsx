import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTelegram } from '../hooks/useTelegram';
import harianData from '../data/zikir-doa/harian.json';

const DoaHarianPage = () => {
  const { hapticClick } = useTelegram();

  return (
    <div className="min-h-screen bg-amalanku-bg px-6 py-8">
      <Head>
        <title>Doa Harian | amalanku</title>
      </Head>

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/" 
          onClick={() => hapticClick?.()}
          className="w-10 h-10 rounded-xl bg-white shadow-neu-flat flex items-center justify-center text-gray-600 active:shadow-neu-pressed transition-all"
        >
          ←
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Doa Harian</h1>
          <p className="text-[10px] text-amalanku-teal font-bold uppercase tracking-widest">Rutin Muslim Sehari Semalam</p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative space-y-8 before:content-[''] before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amalanku-teal/40 before:to-amalanku-purple/40">
        {harianData.doa_harian.map((doa, index) => (
          <div key={doa.id} className="relative pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white shadow-neu-flat flex items-center justify-center z-10 group-active:shadow-neu-pressed transition-all">
              <span className="text-sm">{index + 1}</span>
            </div>

            {/* Doa Card */}
            <div className="p-6 rounded-amalanku bg-amalanku-bg shadow-neu-flat border border-white/50 group-active:shadow-neu-pressed transition-all">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-gray-700 text-sm uppercase tracking-tight">
                  {doa.tajuk}
                </h2>
                <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                  {doa.rujukan}
                </span>
              </div>

              {/* Teks Arab */}
              <p dir="rtl" className="text-2xl font-arabic leading-[2.2] text-right text-gray-800 mb-4">
                {doa.arab}
              </p>

              {/* Terjemahan */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  "{doa.terjemahan}"
                </p>
              </div>

              {/* Audio Placeholder / Share Button */}
              <div className="mt-4 flex justify-end gap-3">
                <button 
                  onClick={() => hapticClick?.()}
                  className="p-2 rounded-lg bg-amalanku-teal/5 text-amalanku-teal text-xs font-bold uppercase tracking-tighter active:scale-95 transition-transform"
                >
                  Salin Doa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center pb-10">
        <div className="inline-block p-4 rounded-2xl bg-white/30 border border-white/50 backdrop-blur-sm shadow-inner">
          <p className="text-[11px] text-gray-500">
            "Berdoalah kepada-Ku, nescaya akan Kuperkenankan bagimu."
          </p>
          <p className="text-[9px] font-bold text-amalanku-teal mt-1 uppercase tracking-widest">Surah Ghafir: 60</p>
        </div>
      </div>
    </div>
  );
};

export default DoaHarianPage;
