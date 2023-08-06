import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PAGE_SIZE } from '../constants/constants';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

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

export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      property: 'slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString.parent ?? '', // 본문 내용이 존재하지 않을 경우(null or undefined) 빈문자열('')로 대체
  };
};

export const getPostsByPage = async (currentPage = 1) => {
  const allPosts = await getAllPosts();
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = currentPage - 1 + PAGE_SIZE;
  return allPosts.slice(startIdx, endIdx);
};

export const getNumberOfPage = async () => {
  const allPosts = await getAllPosts();
  if (allPosts.length % PAGE_SIZE > 0) {
    return Math.floor(allPosts.length / PAGE_SIZE) + 1;
  } else {
    return Math.floor(allPosts.length / PAGE_SIZE);
  }
};
