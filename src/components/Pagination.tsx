import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  currentTag?: string;
};

export default function Pagination({
  currentPage = 1,
  totalPage = 1,
  currentTag,
}: PaginationProps) {
  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  return (
    <ul className='join'>
      {pages.map((page) => (
        <li key={page}>
          <Link
            href={
              currentTag
                ? `/posts/tag/${currentTag}/page/${page}`
                : `/posts/page/${page}`
            }
            className={`join-item btn ${
              currentPage === page ? 'btn-active' : ''
            }`}
          >
            {page}
          </Link>
        </li>
      ))}
    </ul>
  );
}
