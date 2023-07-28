import Head from 'next/head'
import { getAllPosts } from '../../lib/notionAPI';
import Link from 'next/link';

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    }
  }
}

type Post = {
  id: string;
  title: string;
  date: string;
  slug: string;
  tags: string;
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
        <div className="container min-w-full px-4">
          <h1 className='py-10 font-mono text-5xl text-center'>Notion Blog 🫠</h1>
          <section className='grid gap-3 md:grid-cols-2'>
          {
            allPosts.map((post: Post) => {
              return (
                <article key={post.id} className='shadow-xl card'>
                <div className='card-body'>
                    <div className="card-title">
                      <Link href={`/posts/${post.slug}`}>
                        <h2 className='font-semibold'>{post.title}</h2>
                      </Link>
                      <span className='rounded-full badge-primary'>{post.tags}</span>
                    </div>
                    <span>{post.date}</span>
                </div>
                </article>
                )
          })
          }
          </section>
        </div>
      </main>
    </div>
  );
}
