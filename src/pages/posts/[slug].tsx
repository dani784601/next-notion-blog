import React from 'react';
import { getAllPosts, getSinglePost } from '../../../lib/notionAPI';
import Badge from '@/components/Badge';
import { matchTagAndColor } from '../../../utils';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } })); // 정적 경로 설정
  return {
    paths,
    fallback: 'blocking', // 폴백 페이지를 표시하지 않음, false-폴백 페이지를 표시하지 않음(404페이지 표시), true-폴백 페이지를 표시함(404페이지가 아닌 클라이언트 사이드에서 HTML 을 표시함)
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 6, // ISA 사용(6시간마다 갱신)
  };
};

export default function Post({
  post,
}: {
  post: { metadata: any; markdown: any };
}) {
  console.log('markdown', post.markdown);
  return (
    <section className='container px-5 mx-auto mt-20 lg:px-2 lg:w-2/3'>
      <h2 className='w-full text-2xl font-bold'>{post.metadata.title}</h2>
      <hr className='my-1' />
      <span className='text-gray-500'>Posted date at {post.metadata.date}</span>
      <br />
      <div className='space-x-1'>
        {post.metadata.tags.map((tag: string, idx: number) => (
          <Badge key={idx} color={matchTagAndColor(tag)} label={tag} />
        ))}
      </div>
      <div className='mt-5 prose lg:prose-xl prose-pre:bg-[#1E1E1E]'>
        <ReactMarkdown
          children={post.markdown?.toString()}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  PreTag='div'
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </section>
  );
}
