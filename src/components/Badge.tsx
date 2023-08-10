import Link from 'next/link';

type BadgeType = {
  label?: string;
  color?: 'badge-primary' | 'badge-secondary' | 'badge-accent';
};

export default function Badge({ label, color }: BadgeType) {
  return (
    <span className={`badge text-sm px-1 whitespace-nowrap ${color} hover:brightness-110`}>
      <Link href={`/posts/tag/${label}/page/1`}>{label}</Link>
    </span>
  );
}
