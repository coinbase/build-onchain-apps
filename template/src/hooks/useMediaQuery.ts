import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    // The signature '(callback: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null): void' of 'media.addListener' is deprecated.ts(6387)
    // lib.dom.d.ts(15085, 8): The declaration was marked as deprecated here.
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
