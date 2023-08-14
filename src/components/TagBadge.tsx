import Link from 'next/link';

type TagBadgeType = {
  label?: string;
  color?: 'badge-primary' | 'badge-secondary' | 'badge-accent' | 'badge-neutral';
};

export default function TagBadge({ label, color }: TagBadgeType) {
  return (
    <span className={`badge text-sm px-1 whitespace-nowrap ${color} hover:brightness-110`}>
      <Link href={label === '전체' ? '/posts/page/1' : `/posts/tag/${label}/page/1`}>{label}</Link>
    </span>
  );
}
