import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTelegram } from '../hooks/useTelegram';

const KiblatPage = () => {
  const { hapticClick, tg } = useTelegram();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [heading, setHeading] = useState<number>(0); // Arah utara telefon
  const [qiblaDir, setQiblaDir] = useState<number>(0); // Sudut kiblat dari Utara
  const [isExact, setIsExact] = useState(false);

  // 1. Ambil Lokasi Pengguna
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        calculateQibla(latitude, longitude);
      });
    }
  }, []);

  // 2. Kira Sudut Kiblat (Formula Great Circle)
  const calculateQibla = (lat: number, lng: number) => {
    const kaabaLat = 21.4225 * (Math.PI / 180);
    const kaabaLng = 39.8262 * (Math.PI / 180);
    const myLat = lat * (Math.PI / 180);
    const myLng = lng * (Math.PI / 180);

    const y = Math.sin(kaabaLng - myLng);
    const x = Math.cos(myLat) * Math.tan(kaabaLat) - Math.sin(myLat) * Math.cos(kaabaLng - myLng);
    let qiblaRad = Math.atan2(y, x);
    let qiblaDeg = (qiblaRad * 180) / Math.PI;
    setQiblaDir((qiblaDeg + 360) % 360);
  };

  // 3. Baca Sensor Kompas
  useEffect(() => {
    const handler = (e: any) => {
      let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      setHeading(compass);

      // Cek jika tepat (Toleransi 2 darjah)
      const diff = Math.abs(compass - qiblaDir);
      if (diff < 2 || diff > 358) {
        if (!isExact) tg?.HapticFeedback?.impactOccurred('heavy');
        setIsExact(true);
      } else {
        setIsExact(false);
      }
    };

    window.addEventListener('deviceorientationabsolute', handler, true);
    window.addEventListener('deviceorientation', handler, true);
    return () => {
      window.removeEventListener('deviceorientationabsolute', handler);
      window.removeEventListener('deviceorientation', handler);
    };
  }, [qiblaDir, isExact]);

  return (
    <div className="min-h-screen bg-amalanku-bg px-6 py-8 flex flex-col items-center">
      <Head>
        <title>Arah Kiblat | amalanku</title>
      </Head>

      <div className="w-full flex items-center gap-4 mb-10">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white shadow-neu-flat flex items-center justify-center">
          ←
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Kompas Kiblat</h1>
      </div>

      {/* Paparan Koordinat */}
      <div className="grid grid-cols-2 gap-4 w-full mb-10">
        <div className="p-3 bg-white/50 rounded-2xl shadow-neu-flat text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Latitude</p>
          <p className="text-sm font-mono font-bold text-gray-700">{coords?.lat.toFixed(4) || '...'}</p>
        </div>
        <div className="p-3 bg-white/50 rounded-2xl shadow-neu-flat text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Longitude</p>
          <p className="text-sm font-mono font-bold text-gray-700">{coords?.lng.toFixed(4) || '...'}</p>
        </div>
      </div>

      {/* Kompas Visual */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white shadow-neu-flat"></div>
        
        {/* Glowing Effect bila tepat */}
        <div className={`absolute inset-4 rounded-full transition-all duration-300 ${isExact ? 'bg-amalanku-teal/20 shadow-[0_0_50px_rgba(13,148,136,0.5)] scale-105' : 'bg-transparent'}`}></div>

        {/* Jarum Kompas */}
        <div 
          className="relative w-full h-full transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${-heading + qiblaDir}deg)` }}
        >
          {/* Gambar Kaabah / Arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className={`text-5xl transition-transform ${isExact ? 'scale-125' : 'scale-100'}`}>
              🕋
            </div>
            <div className="w-1 h-20 bg-gradient-to-t from-transparent to-amalanku-teal mt-2"></div>
          </div>
        </div>

        {/* Sudut Darjah Tengah */}
        <div className="absolute bg-white w-20 h-20 rounded-full shadow-neu-pressed flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-800">{Math.round(heading)}°</span>
          <span className="text-[8px] text-gray-400 font-bold uppercase">Bearing</span>
        </div>
      </div>

      {/* Info Status */}
      <div className="mt-12 text-center">
        <p className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${isExact ? 'text-amalanku-teal' : 'text-gray-400'}`}>
          {isExact ? 'Tepat Menghadap Kiblat' : 'Pusing Peranti Anda'}
        </p>
        <p className="text-[10px] text-gray-400 mt-2 px-10">
          Sila letakkan peranti di atas permukaan rata dan jauhkan daripada objek magnetik.
        </p>
      </div>

      {/* Button Re-calibrate */}
      <button 
        onClick={() => window.location.reload()}
        className="mt-auto w-full py-4 bg-white shadow-neu-flat rounded-2xl text-[10px] font-bold uppercase tracking-widest active:shadow-neu-pressed"
      >
        Set Semula Sensor
      </button>
    </div>
  );
};

export default KiblatPage;
