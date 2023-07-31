import Link from 'next/link';
import React from 'react';
import { Post } from '@/types/Post';


const matchTagAndColor = (tag: string) => {
  switch(tag) {
    case '일반' :
      return 'badge-primary';
    case '엔지니어':
      return 'badge-secondary';
    case '개인 사용자':
      return 'badge-accent';
  }
}

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
            <span
              key={idx}
              className={`text-sm px-1 rounded-full ` + matchTagAndColor(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
