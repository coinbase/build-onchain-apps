type TransactionCompleteStepProps = {
  numCoffees: number;
};

export default function TransactionCompleteStep({ numCoffees }: TransactionCompleteStepProps) {
  return (
    <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
      You bought {numCoffees} coffee{numCoffees > 1 ? 's' : null}!
    </h2>
  );
}
