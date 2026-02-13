import { useState, useEffect } from 'react';

export const usePrayerTime = (zone: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        // Menggunakan API mpt.i906.my yang stabil untuk zon Malaysia
        const response = await fetch(`https://mpt.i906.my/api/solat/${zone}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Gagal mengambil waktu solat:", error);
      } finally {
        setLoading(false);
      }
    };

    if (zone) fetchPrayerTimes();
  }, [zone]);

  return { data, loading };
};
