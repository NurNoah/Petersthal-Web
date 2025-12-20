'use client';

import { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';

const SnowEffect = () => {
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth(); // 0-11 (Jan-Dec)
    const day = today.getDate();

    // Show snow from Dec 15 to Jan 7
    const isWinterSeason = (month === 11 && day >= 15) || (month === 0 && day <= 7);

    setIsSnowing(isWinterSeason);
  }, []);

  if (!isSnowing) {
    return null;
  }

  return <Snowfall style={{ position: 'fixed', zIndex: 9999 }} />;
};

export default SnowEffect;
