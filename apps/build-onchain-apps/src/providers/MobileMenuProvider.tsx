import { Dispatch, memo, useState, SetStateAction, ReactNode, useEffect } from 'react';
import { createContext } from '@radix-ui/react-context';
import { useRouter } from 'next/router';

const [MenuProvider, useMenuContext] = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>('MobileMenu');

type MobileMenuProps = {
  children?: ReactNode;
};

const MobileMenuProvider = memo<MobileMenuProps>(function MobileMenuProvider({ children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Dismiss mobile keyboard if focusing an input (e.g. when searching)
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
      setOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    // Match @media (--md)
    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      setOpen((o) => (o ? !mediaQueryList.matches : false));
    };
    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, []);

  return (
    <MenuProvider open={open} setOpen={setOpen}>
      {children}
    </MenuProvider>
  );
});

export { useMenuContext };

export default MobileMenuProvider;
