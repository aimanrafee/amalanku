import React, { useState, useEffect } from 'react';

interface PrayerTimes {
  Imsak: string;
  Subuh: string;
  Syuruk: string;
  Zohor: string;
  Asar: string;
  Maghrib: string;
  Isyak: string;
}

interface Props {
  times: PrayerTimes;
  zoneName: string;
}

const PrayerCard: React.FC<Props> = ({ times, zoneName }) => {
  const [currentPrayer, setCurrentPrayer] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      updatePrayerStatus();
    }, 1000);

    return () => clearInterval(timer);
  }, [times]);

  const updatePrayerStatus = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerOrder = ['Imsak', 'Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'];
    let foundCurrent = 'Isyak';
    let foundNext = 'Subuh';

    for (let i = 0; i < prayerOrder.length; i++) {
      const [hours, minutes] = times[prayerOrder[i] as keyof PrayerTimes].split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (currentTime < prayerMinutes) {
        foundNext = prayerOrder[i];
        foundCurrent = i === 0 ? 'Isyak' : prayerOrder[i - 1];
        
        // Kira countdown
        const diff = prayerMinutes - currentTime;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        setCountdown(`-${h}j ${m}m`);
        break;
      }
    }

    setCurrentPrayer(foundCurrent);
    setNextPrayer(foundNext);
  };

  return (
    <div className="w-full p-6 bg-amalanku-bg rounded-amalanku shadow-neu-flat border border-white/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-amalanku-teal font-bold text-xl uppercase tracking-wider">
            {currentPrayer || 'Memuatkan...'}
          </h2>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {zoneName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-amalanku-gold font-mono text-lg font-bold">
            {countdown}
          </p>
          <p className="text-xs text-gray-400">menuju {nextPrayer}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {Object.entries(times).map(([name, time]) => (
          <div 
            key={name}
            className={`p-3 rounded-2xl text-center transition-all ${
              currentPrayer === name 
              ? 'shadow-neu-pressed bg-amalanku-teal/5 border-amalanku-teal/20' 
              : 'hover:shadow-neu-pressed'
            }`}
          >
            <p className={`text-[10px] uppercase font-bold ${currentPrayer === name ? 'text-amalanku-teal' : 'text-gray-400'}`}>
              {name}
            </p>
            <p className={`text-sm font-bold ${currentPrayer === name ? 'text-black' : 'text-gray-600'}`}>
              {time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerCard;
