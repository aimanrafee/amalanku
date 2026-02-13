import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    // Memastikan skrip Telegram Web App dimuatkan
    const telegram = (window as any).Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      telegram.expand(); // Membuka aplikasi secara skrin penuh
      telegram.enableClosingConfirmation(); // Minta pengesahan sebelum tutup
      setTg(telegram);
    }
  }, []);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
    onClose: () => tg?.close(),
    // Fungsi Haptic (getaran) untuk Tasbih Digital
    hapticClick: () => tg?.HapticFeedback?.impactOccurred('medium'),
  };
};
