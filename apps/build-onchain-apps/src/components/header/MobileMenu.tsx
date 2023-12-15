import { memo, ReactNode } from 'react';
import { Flex, Portal, Slot, Theme } from '@radix-ui/themes';
import { RemoveScroll } from 'react-remove-scroll';
import { useMenuContext } from '../../providers/MobileMenuProvider';

export const useMobileMenuContext = () => useMenuContext('MobileMenu');

type MobileMenuProps = {
  children?: ReactNode;
};

export const MobileMenu = memo<MobileMenuProps>(function MobileMenu({ children }) {
  const mobileMenu = useMobileMenuContext();

  if (!mobileMenu.open) {
    return null;
  }

  return (
    <Portal>
      <Theme className="radix-themes-custom-fonts">
        <RemoveScroll as={Slot} allowPinchZoom enabled>
          <Flex
            position="fixed"
            direction="column"
            inset="0"
            style={{
              marginTop: 'var(--header-height)',
              backgroundColor: 'var(--color-background)',
            }}
          >
            {children}
          </Flex>
        </RemoveScroll>
      </Theme>
    </Portal>
  );
});
