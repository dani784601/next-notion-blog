import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    page_size: 100, // default
  });
  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post: any) => {
  const { properties } = post;
  const tagNames = properties['타깃 독자']?.multi_select?.map(
    (obj: any) => obj.name
  );
  return {
    id: post?.id ?? '',
    title: properties?.내용?.title[0]?.plain_text ?? '',
    date: properties?.게시일?.date?.start ?? new Date().toString(),
    slug: properties?.slug?.rich_text[0]?.plain_text ?? '',
    tags: tagNames ?? [],
  };
};
