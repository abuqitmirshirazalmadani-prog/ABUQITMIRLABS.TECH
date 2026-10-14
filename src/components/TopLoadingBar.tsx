import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TopLoadingBar provides instant, native-feeling feedback (like YouTube / GitHub)
 * across every page navigation.
 */
export const TopLoadingBar: React.FC = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start bar on route change
    setVisible(true);
    setProgress(35);

    const step1 = setTimeout(() => {
      setProgress(75);
    }, 60);

    const step2 = setTimeout(() => {
      setProgress(100);
    }, 180);

    const finish = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 320);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(finish);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[999999] pointer-events-none transition-all duration-200 ease-out"
      style={{
        background: 'linear-gradient(90deg, #ccff00, #a3e635, #ccff00)',
        width: `${progress}%`,
        opacity: visible ? 1 : 0,
        boxShadow: '0 0 10px rgba(204, 255, 0, 0.8), 0 0 4px rgba(204, 255, 0, 0.5)',
      }}
    />
  );
};

export default TopLoadingBar;
