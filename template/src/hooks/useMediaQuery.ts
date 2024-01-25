import { useState, useEffect } from 'react';

/**
 * A custom React hook that returns a boolean value indicating whether the specified media query matches the current viewport.
 *
 * @param query - The media query string to match against the viewport.
 * @returns A boolean value indicating whether the media query matches the current viewport.
 */
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
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
