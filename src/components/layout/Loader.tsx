'use client';

import { useEffect, useState } from 'react';

/**
 * Page loader overlay that fades out after site loads.
 */
export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 400);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        id="site-overlayer"
        style={{
          transition: 'opacity 0.8s ease, visibility 0.8s ease',
          opacity: fadeOut ? 0 : 1,
          visibility: fadeOut ? 'hidden' : 'visible',
        }}
      />
      <div
        className="site-loader-wrap"
        style={{
          transition: 'opacity 0.8s ease',
          opacity: fadeOut ? 0 : 1,
        }}
      >
        <div className="site-loader" />
      </div>
    </>
  );
}
