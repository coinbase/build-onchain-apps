export default function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className="text-blue-500 no-underline">
      {children}
    </a>
  );
}
