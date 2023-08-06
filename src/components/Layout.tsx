import NavBar from './NavBar'

export default function Layout({children} : { children: React.ReactNode}) {
  return (
    <div className='min-w-[360px]'>
      <NavBar />
      {children}
    </div>
  )
}
