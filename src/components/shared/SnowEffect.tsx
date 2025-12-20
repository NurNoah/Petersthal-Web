'use client';

import { useState, useEffect } from 'react';

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

  return (
    <>
      <style jsx global>{`
        .snowflake {
          position: fixed;
          top: -10px;
          color: #fff;
          user-select: none;
          pointer-events: none;
          z-index: 9999;
          font-size: 1.5rem;
          opacity: 0.8;
          animation: fall linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
      `}</style>
      {Array.from({ length: 100 }).map((_, index) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 5 + 5}s`, // 5 to 10 seconds
          animationDelay: `${Math.random() * 5}s`,
          fontSize: `${Math.random() * 0.5 + 0.75}rem`, // 0.75rem to 1.25rem
          opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
        };
        return (
          <div key={index} className="snowflake" style={style}>
            ●
          </div>
        );
      })}
    </>
  );
};

export default SnowEffect;
