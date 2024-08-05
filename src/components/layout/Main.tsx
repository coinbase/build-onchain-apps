export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[60px]">
      <main className="container mx-auto flex flex-col gap-8 px-8 py-6">{children}</main>;
    </div>
  );
}
