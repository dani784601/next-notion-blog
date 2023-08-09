import { getNumberOfPage, getPostsByPage } from '@/lib/notionAPI';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post } from '@/types/post';


export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPage();
  let params = [];
  for(let i = 1; i <= numberOfPage; i++) {
    params.push({params: { page: i.toString() }});
  }
  return {
    paths: params,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const numberOfPage = await getNumberOfPage();
  const currentPage = parseInt(ctx.params?.page?.toString() ?? '0');
  const postByPage = await getPostsByPage(currentPage);
  return {
    props: {
      postByPage,
      currentPage,
      numberOfPage
    },
    revalidate: 60 * 60 * 6, // ISA 사용(6시간마다 갱신)
  };
};

interface BlogPageListProps {
  postByPage: Post[];
  currentPage: number;
  numberOfPage: number;
}

export default function BlogPageList({ postByPage, currentPage, numberOfPage }: BlogPageListProps) {
  return (
    <main>
      <div className='container h-screen min-w-full px-8'>
        <section className='grid max-w-4xl gap-2 mx-auto place-items-center'>
          {postByPage.map((post: Post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </section>
        <section className="flex justify-center py-10">
          <Pagination currentPage={currentPage} totalPage={numberOfPage} />
        </section>
      </div>
    </main>
  );
}
