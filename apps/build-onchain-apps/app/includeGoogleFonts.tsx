'use client';

import { useEffect } from 'react';

export default function IncludeGoogleFonts() {
  useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.gstatic.com/';
    link1.crossOrigin = 'anonymous';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.href = 'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css?family=Inter&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);
  }, []);

  return null;
}
