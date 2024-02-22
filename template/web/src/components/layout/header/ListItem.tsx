import { forwardRef } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';

export const ListItem = forwardRef(function ListItem(
  {
    children,
    target,
    href,
  }: {
    href: string;
    children: React.ReactNode;
    target?: string;
  },
  ref: React.Ref<HTMLAnchorElement>,
) {
  return (
    <div className="inline-flex items-center justify-start gap-8">
      <NavigationMenu.Link asChild className="flex items-center justify-start gap-1">
        <a
          href={href}
          className={clsx('font-robotoMono text-base font-normal text-white no-underline')}
          ref={ref}
          target={target}
        >
          {children}
        </a>
      </NavigationMenu.Link>
    </div>
  );
});
