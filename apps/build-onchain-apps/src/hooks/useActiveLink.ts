import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { type LinkProps as NextLinkProps } from 'next/link';

export function useActiveLink (props: Pick<NextLinkProps, 'href' | 'as'>) {
  const { asPath, isReady } = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (!isReady) return;

    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = new URL(
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      (props.as || props.href) as string,
      location.href,
    ).pathname;

    // Using URL().pathname to get rid of query and hash
    const activePathname = new URL(asPath, location.href).pathname;

    const nextActive = linkPathname === activePathname;
    if (nextActive !== active) setActive(nextActive);
  }, [asPath, isReady, props.as, props.href, active]);

  return active;
};
