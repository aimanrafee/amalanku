import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import surahPilihan from '../../data/al-quran/pilihan.json';
import tadabburData from '../../data/al-quran/tadabbur.json';

const AlQuranIndex = () => {
  // Fungsi untuk mendapatkan ulasan ringkas berdasarkan nombor surah
  const getTadabbur = (surahNo: number) => {
    return tadabburData.tadabbur_surah.find(t => t.surah_no === surahNo);
  };

  return (
    <div className="min-h-screen bg-amalanku-bg px-6 py-8">
      <Head>
        <title>Al-Quran Pilihan | amalanku</title>
      </Head>

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white shadow-neu-flat flex items-center justify-center text-gray-600 active:shadow-neu-pressed">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Al-Quran</h1>
          <p className="text-xs text-amalanku-teal font-bold uppercase tracking-widest">Surah Pilihan</p>
        </div>
      </div>

      {/* Grid Senarai Surah */}
      <div className="space-y-6">
        {surahPilihan.surah_pilihan.map((surah) => {
          const info = getTadabbur(surah.surah_no);
          
          return (
            <Link href={`/al-quran/${surah.surah_no}`} key={surah.id} className="block">
              <div className="p-5 rounded-amalanku bg-amalanku-bg shadow-neu-flat border border-white/50 active:shadow-neu-pressed transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-4">
                    {/* Nombor Surah Berbentuk Diamond/Circle */}
                    <div className="w-10 h-10 rounded-full bg-amalanku-teal/10 flex items-center justify-center text-amalanku-teal font-bold text-sm shadow-inner">
                      {surah.surah_no}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 group-hover:text-amalanku-teal transition-colors">
                        {surah.nama}
                      </h2>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">
                        Ayat: {surah.ayat_range === 'full' ? 'Penuh' : surah.ayat_range}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl text-amalanku-teal opacity-20 group-hover:opacity-100 transition-opacity">📖</span>
                </div>

                {/* Info Tadabbur Ringkas */}
                {info && (
                  <div className="mt-4 p-3 rounded-2xl bg-white/40 border border-white/60">
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">
                      "{info.ulasan_ringkas}"
                    </p>
                  </div>
                )}

                {/* Badge Fadhilat */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amalanku-gold/10 text-amalanku-gold text-[9px] font-bold uppercase tracking-tighter">
                    ✨ {surah.fadhilat}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-12 p-6 rounded-3xl bg-amalanku-teal/5 border border-amalanku-teal/10 text-center">
        <p className="text-xs text-gray-500 italic">
          "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya."
        </p>
        <p className="text-[10px] text-gray-400 mt-2 font-bold">— HR. Bukhari</p>
      </div>
    </div>
  );
};

export default AlQuranIndex;
