type StepProps = {
  status: string;
  icon: string;
  helpText: string;
  children: React.ReactNode;
};

export default function Step({ status, icon, helpText, children }: StepProps) {
  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white">{status}</h2>
      <div className="text-center text-6xl">{icon}</div>
      <div className="my-4 text-center text-sm text-gray-400">{helpText}</div>
      {children}
    </>
  );
}
