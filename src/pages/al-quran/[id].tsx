import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import surahPilihan from '../../data/al-quran/pilihan.json';

// Nota: Dalam projek sebenar, anda akan menarik data daripada fail JSON besar atau API.
// Di sini saya sediakan struktur logik untuk memaparkan teks tersebut.

const SurahDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [surahInfo, setSurahInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = surahPilihan.surah_pilihan.find(s => s.surah_no.toString() === id);
      setSurahInfo(found);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="min-h-screen bg-amalanku-bg flex items-center justify-center font-bold text-amalanku-teal animate-pulse">Memuatkan Kalamullah...</div>;
  if (!surahInfo) return <div className="min-h-screen bg-amalanku-bg flex items-center justify-center italic text-gray-400">Surah tidak ditemui.</div>;

  return (
    <div className="min-h-screen bg-amalanku-bg">
      <Head>
        <title>{surahInfo.nama} | amalanku</title>
      </Head>

      {/* Header Statik (Melekat di atas) */}
      <div className="sticky top-0 z-20 bg-amalanku-bg/80 backdrop-blur-md px-6 py-4 border-b border-white/20 flex items-center gap-4">
        <Link href="/al-quran" className="w-10 h-10 rounded-xl bg-white shadow-neu-flat flex items-center justify-center text-gray-600 active:shadow-neu-pressed">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-800">{surahInfo.nama}</h1>
          <p className="text-[10px] text-amalanku-teal font-bold uppercase tracking-widest">Surah Ke-{surahInfo.surah_no}</p>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Banner Bismillah */}
        <div className="w-full p-8 rounded-amalanku bg-amalanku-bg shadow-neu-flat mb-10 text-center">
          <p className="text-3xl font-arabic text-gray-800 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-xs text-gray-400 mt-4 italic font-medium">
            Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang
          </p>
        </div>

        {/* Senarai Ayat (Contoh Struktur) */}
        <div className="space-y-8">
          {/* PENTING: Di sini anda perlu memetakan (map) data daripada fail bacaan.json anda.
              Contoh di bawah adalah placeholder visual untuk reka bentuk kad ayat.
          */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="group">
              <div className="flex flex-col items-end gap-6 p-6 rounded-3xl bg-amalanku-bg shadow-neu-flat border border-white/40 group-active:shadow-neu-pressed transition-all">
                {/* Nombor Ayat & Label */}
                <div className="w-full flex justify-between items-center">
                  <div className="w-8 h-8 rounded-lg bg-amalanku-teal/10 flex items-center justify-center text-amalanku-teal font-bold text-xs">
                    {num}
                  </div>
                  <button className="text-gray-300 hover:text-amalanku-teal transition-colors">
                    🔖
                  </button>
                </div>

                {/* Teks Arab */}
                <p dir="rtl" className="text-3xl font-arabic leading-[2.5] text-right text-gray-800 w-full">
                  تَنْزِيلُ الْكِتَابِ لَا رَيْبَ فِيهِ مِنْ رَبِّ الْعَالَمِينَ
                </p>

                {/* Terjemahan */}
                <div className="w-full text-left pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    (Ayat {num}) Turunnya Al-Quran ini, tidak ada keraguan padanya, (iaitu) dari Tuhan semesta alam.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Penutup */}
        <div className="mt-12 text-center text-gray-400 text-[10px] uppercase tracking-[0.2em] pb-10">
          Sadaqallahul 'Azim
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;
