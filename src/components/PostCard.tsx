import { matchTagAndColor } from '@/utils';
import Badge from '@/components/Badge';
import Link from 'next/link';
import type { Post } from '@/types/post';

export default function PostCard({post} : {post: Post}) {
  return (
    <article
      key={post.id}
      className='w-full transition-all shadow-md glass hover:-translate-y-1 hover:shadow-lg card card-bordered'
    >
      <div className='card-body'>
        <div className='card-title'>
            <h2 className='font-semibold transition-colors hover:text-gray-500 text-ellipsis whitespace-nowrap'>
              <Link href={`/posts/${post.slug}`}>{post.title} </Link>
            </h2>
          {post.tags.map((tag, idx) => (
            <Badge label={tag} color={matchTagAndColor(tag)} key={idx}/>
            ))}
        </div>
        <p className='font-mono text-gray-500'>{post.date}</p>
      </div>
    </article>
  );
}
