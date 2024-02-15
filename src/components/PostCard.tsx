import { matchTagAndColor } from '@/utils';
import TagBadge from '@/components/TagBadge';
import Link from 'next/link';
import { Post } from '@/types/post';

export default function PostCard({post} : {post: Post}) {
  return (
    <article
      key={post.id}
      className='w-full transition-all shadow-md hover:-translate-y-1 hover:shadow-lg card card-bordered'
    >
      <div className='card-body'>
        <div className='flex-col items-start card-title'>
            <h2 className='transition-colors hover:text-gray-500 line-clamp-1'>
              <Link href={`/posts/${post.slug}`}>{post.title} </Link>
            </h2>
            <div>
              {post.tags.map((tag, idx) => (
                <TagBadge label={tag} color={matchTagAndColor(tag)} key={idx}/>
                ))}
            </div>
        </div>
        <p className='font-mono text-gray-500'>{post.date}</p>
      </div>
    </article>
  );
}
