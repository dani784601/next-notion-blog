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
  console.table('allPosts',allPosts);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
