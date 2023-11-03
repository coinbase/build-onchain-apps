import { Memo } from '../types';
import { MemoCard } from './MemoCard';

type MemosProps = {
  memos: Memo[];
};

function Memos({ memos }: MemosProps) {
  if (!memos) return null;
  return (
    <div className="flex flex-col gap-2">
      {memos.map((memo) => {
        const timestamp = new Date(Number(memo.timestamp.toString()) * 1000);
        return (
          <MemoCard
            key={timestamp.toString()}
            name={memo.name}
            message={memo.message}
            timestamp={timestamp}
          />
        );
      })}
    </div>
  );
}

export { Memos };
