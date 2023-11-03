import { Memo } from '../types';

function MemoCard({ name, message, timestamp }: Memo) {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-auto max-w-[24rem]">
      <div className="p-6">
        <p className="block antialiased font-sans text-base leading-relaxed text-gray-700 font-normal">
          {message}
        </p>
      </div>
      <div className="p-6 flex items-center pt-1">
        <div className="ml-4">
          <p className="block antialiased font-sans text-base leading-relaxed text-blue-gray-900 font-medium">
            {name}
          </p>
          <p className="block antialiased font-sans text-sm font-light leading-normal text-gray-700">
            {timestamp.toString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export { MemoCard };
