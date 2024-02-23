export default function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 flex scroll-mt-28 flex-col">
      {children}
    </section>
  );
}
