import { getAllTags, getNumberOfPageByTag, getPostsByTagAndPage } from '@/lib/notionAPI';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post } from '@/types/post';


export const getStaticPaths: GetStaticPaths = async () => {
  const allTagList = await getAllTags();
  let params: {params: {tag: string, page: string}}[] = [];
  
  await Promise.all(
    allTagList.map((tagName:string) => {
      return getNumberOfPageByTag(tagName).then((numberOfPagesByTag:number) => {
        for(let i = 1; i <= numberOfPagesByTag; i++) {
          params.push({params: { tag: tagName, page: i.toString() }});
        }  
      });
    })
  )

  console.log('params', params)

  return {
    paths: params,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const currentTag = ctx.params?.tag?.toString() ?? '';
  const currentPage = parseInt((ctx.params?.page?.toString() ?? '1'), 10) ;
  const posts = await getPostsByTagAndPage(currentTag, currentPage);
  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 6, // ISA 사용(6시간마다 갱신)
  };
};

interface BlogTagListProps {
  posts: Post[];
}

export default function BlogTagPageList({ posts }: BlogTagListProps) {
  console.log('postByTag',posts)
  return (
    <main>
      <div className='container h-screen min-w-full px-8'>
        <section className='grid max-w-4xl gap-2 mx-auto place-items-center'>
          {posts.map((post: Post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </section>
        {/* <section className="flex justify-center py-10">
          <Pagination currentPage={Number(currentPage)} totalPage={numberOfPage} />
        </section> */}
      </div>
    </main>
  );
}
