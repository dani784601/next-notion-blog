import Head from 'next/head'
import { getAllPosts } from '../../lib/notionAPI';

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    }
  }
}


export default function Home({ allPosts } : any) {
  console.log('allPosts',allPosts);
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
            allPosts.map((post) => {
              return (
                <article key={post.id} className='p-2 border-4 rounded-md'>
                  <div className="flex gap-1">
                    <h2 className='font-semibold'>{post.title}</h2>
                    <span className='bg-blue-300 rounded-full'>{post.tags}</span>
                  </div>
                  <span>{post.date}</span>
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
