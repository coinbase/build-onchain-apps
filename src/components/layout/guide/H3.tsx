export default function H3({ id, children }: { id?: string; children: string }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-28 text-4xl font-medium text-white">
      {children}
    </h3>
  );
}
