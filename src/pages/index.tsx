import React, { useState } from 'react';
import Head from 'next/head';
import PrayerCard from '../components/PrayerCard';
import { usePrayerTime } from '../hooks/usePrayerTime';
import { useTelegram } from '../hooks/useTelegram';

// Komponen Kecil untuk Menu Grid
const MenuGrid = () => {
  const menus = [
    { id: 1, title: 'Al-Quran', icon: '📖', path: '/al-quran', color: 'bg-blue-50' },
    { id: 2, title: 'Zikir & Doa', icon: '📿', path: '/zikir', color: 'bg-teal-50' },
    { id: 3, title: 'Tahlil', icon: '🤲', path: '/tahlil', color: 'bg-purple-50' },
    { id: 4, title: 'Kiblat', icon: '🧭', path: '/kiblat', color: 'bg-gold-50' },
    { id: 5, title: 'Harian', icon: '☀️', path: '/harian', color: 'bg-green-50' },
    { id: 6, title: 'Tasbih', icon: '🔢', path: '/tasbih', color: 'bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {menus.map((menu) => (
        <a
          key={menu.id}
          href={menu.path}
          className="flex flex-col items-center justify-center p-4 rounded-amalanku shadow-neu-flat bg-amalanku-bg active:shadow-neu-pressed transition-all"
        >
          <span className="text-2xl mb-2">{menu.icon}</span>
          <span className="text-[10px] font-bold uppercase text-gray-600 tracking-tight text-center">
            {menu.title}
          </span>
        </a>
      ))}
    </div>
  );
};

export default function Home() {
  const { user } = useTelegram();
  const [zone, setZone] = useState('SGR01'); // Default: Gombak/Hulu Langat/Sepang
  const { data, loading } = usePrayerTime(zone);

  return (
    <div className="min-h-screen bg-amalanku-bg px-6 py-8">
      <Head>
        <title>amalanku | Utama</title>
      </Head>

      {/* Header: Nama Pengguna & Logo */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-gray-400 text-sm font-medium">Assalamualaikum,</h1>
          <p className="text-xl font-bold text-gray-800">
            {user?.first_name || 'Hamba Allah'} 👋
          </p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl shadow-neu-flat flex items-center justify-center text-2xl">
          ✨
        </div>
      </div>

      {/* Kandungan Utama */}
      <main>
        {loading ? (
          <div className="w-full h-48 bg-white/50 animate-pulse rounded-amalanku shadow-neu-flat flex items-center justify-center">
            <p className="text-amalanku-teal font-medium">Menyusun Waktu Solat...</p>
          </div>
        ) : (
          data && <PrayerCard times={data.times} zoneName={data.zone} />
        )}

        {/* Bahagian Menu */}
        <div className="mt-10">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-700">Menu Amalan</h3>
            <button className="text-xs text-amalanku-teal font-bold uppercase tracking-widest">
              Lihat Semua
            </button>
          </div>
          <MenuGrid />
        </div>

        {/* Info Card / Quote of the day */}
        <div className="mt-10 p-5 rounded-3xl bg-amalanku-purple text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] uppercase font-bold opacity-80 tracking-[0.2em] mb-1">Tadabbur Ringkas</p>
            <p className="text-sm font-medium italic">
              "Maka nikmat Tuhanmu yang manakah yang kamu dustakan?"
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">📖</div>
        </div>
      </main>

      {/* Footer / Bottom Padding */}
      <footer className="mt-12 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          amalanku v1.0 • 2026
        </p>
      </footer>
    </div>
  );
}
