import { getPostsByPage } from '@/lib/notionAPI';
import Head from 'next/head';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import type { GetStaticProps } from 'next';
import type { Post } from '@/types/post';

export const getStaticProps: GetStaticProps = async () => {
  const postByPage = await getPostsByPage();
  return {
    props: {
      postByPage,
    },
    revalidate: 60 * 60 * 6, // ISA 사용(6시간마다 갱신)
  };
};

export default function Home({ postByPage }: { postByPage: Post[] }) {
  console.log('postByPage', postByPage);
  return (
    <div>
      <Head>
        <title>Notion-Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='container h-screen min-w-full px-8'>
          <section className='flex items-center justify-center gap-1 text-5xl'>
            <h1 className='py-10 font-mono text-center whitespace-nowrap'>Notion Blog</h1>
            <div className='hover:animate-spin'>🥕</div>
          </section>
          <section className='grid max-w-4xl gap-2 mx-auto place-items-center md:grid-cols-2'>
            {postByPage.map((post: Post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </section>
          <section className='flex justify-center py-10'>
            <Link className='btn' href='/posts/page/1'>
              더보기
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
