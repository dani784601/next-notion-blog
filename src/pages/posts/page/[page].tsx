import type { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getNumberOfPage, getPostsByPage } from '../../../../lib/notionAPI';
import PostCard from '../../../components/PostCard';
import type { Post } from '@/types/post';
import { PAGE_SIZE } from '../../../../constants/constants';
import Pagination from '../../../components/Pagination';


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
  const currentPage = Number(ctx.params?.page);
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
  currentPage: string;
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
          <Pagination currentPage={Number(currentPage)} totalPage={numberOfPage} />
        </section>
      </div>
    </main>
  );
}
