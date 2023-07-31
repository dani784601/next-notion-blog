import Head from 'next/head'
import { getAllPosts } from '../../lib/notionAPI';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/Post';

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    }
  }
}

export default function Home({ allPosts } : { allPosts: Post[]}) {
  console.log('allPosts', allPosts);
  return (
    <div>
      <Head>
        <title>Notion-Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container min-w-full px-8">
          <div className='flex items-center justify-center gap-1 text-5xl'>
            <h1 className='py-10 font-mono text-center'>Notion Blog</h1>
            <div className="hover:animate-spin">🥕</div>
          </div>
          <section className='grid max-w-4xl gap-2 mx-auto place-items-center md:grid-cols-2'>
          {
            allPosts.map((post: Post) => <PostCard post={post} key={post.id} />)
          }
          </section>
        </div>
      </main>
    </div>
  );
}
