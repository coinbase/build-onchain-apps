import { usePathname } from 'next/navigation';

type TableOfContentsProps = {
  title: string;
  contents: {
    href: string;
    label: React.ReactNode;
  }[];
};

export default function TableOfContents({ title, contents }: TableOfContentsProps) {
  const pathname = usePathname();

  return (
    <aside className="flex-shrink-1 relative hidden w-full flex-grow-0 xl:block">
      <nav className="sticky top-28 flex flex-col gap-2 border-s border-gray-500 py-2 ps-4">
        <h2 className="text-base font-bold">{title}</h2>
        <ul className="flex flex-col gap-2">
          {contents.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                data-active={pathname.includes(href)}
                className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
