import Link from "next/link";

export default function Pagination({currentPage = 1, totalPage = 1}) {
  let pages = [];
  for(let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  
  return (
    <ul className='join'>
      {
        pages.map(page => (
        <li key={page}>
          <Link href={`/posts/page/${page}`} className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}>{page}</Link>
        </li>
          ))
      }
    </ul>
  )
}
