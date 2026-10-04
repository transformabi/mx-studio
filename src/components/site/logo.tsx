import { MaxMonogram } from '@/components/max-monogram';

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <MaxMonogram className="h-8 w-8" rounded={10} />
      <span className="font-brand text-[15px] font-bold tracking-tight text-bone">MX Studio Web</span>
    </span>
  );
}
