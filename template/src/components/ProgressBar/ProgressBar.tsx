import clsx from 'clsx';

type ProgressBarProps = {
  percent: number;
  backgroundClass?: string;
  barClass?: string;
};

export default function ProgressBar({
  percent,
  backgroundClass = 'bg-gray-800',
  barClass = 'bg-gradient-2',
}: ProgressBarProps) {
  return (
    <div
      className={clsx('h-[10px] w-full rounded-full', backgroundClass)}
      data-testid="progress-bar"
    >
      <div className={clsx('h-[10px] rounded-full', barClass)} style={{ width: `${percent}%` }} />
    </div>
  );
}
