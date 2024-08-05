import { ImageIcon } from '@radix-ui/react-icons';

export function FallbackImage() {
  return (
    <div className="flex size-full items-center justify-center bg-slate-100 ">
      <ImageIcon className="font-robotoMono h-6/12 w-6/12 fill-slate-400 stroke-slate-400" />
    </div>
  );
}
