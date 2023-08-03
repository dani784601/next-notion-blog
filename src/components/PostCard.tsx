import Link from 'next/link';
import React from 'react';
import { Post } from '@/types/post';
import Badge from './Badge';
import { matchTagAndColor } from '../../utils';

export default function PostCard({post} : {post: Post}) {
  return (
    <article
      key={post.id}
      className='w-full transition-all shadow-md glass hover:-translate-y-1 hover:shadow-lg card card-bordered'
    >
      <div className='card-body'>
        <div className='card-title'>
          <Link href={`/posts/${post.slug}`}>
            <h2 className='font-semibold transition-colors hover:text-gray-500'>
              {post.title} 
            </h2>
          </Link>
          {post.tags.map((tag, idx) => (
            <Badge label={tag} color={matchTagAndColor(tag)} key={idx}/>
          ))}
        </div>
      </div>
    </article>
  );
}
