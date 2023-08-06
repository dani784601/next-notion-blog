import React from 'react';
import Link from 'next/link';

type Menus = {
  type: 'in' | 'out';
  url: string;
  label: string;
}

const menus : Menus[] = [
  {
    type: 'in',
    url: '/',
    label: 'home',
  },
  {
    type: 'out',
    url: 'https://github.com/dani784601',
    label: 'github',
  },
  {
    type: 'out',
    url: 'mailto:dani784601@gmail.com',
    label: 'contact',
  },
];

export default function NavBar() {
  return (
    <nav className='navbar'>
        <div className='flex-1 p-2 text-xl font-semibold'>
          <Link href='/profile'>Dani</Link>
        </div>
        <div className='flex-none'>
          <ul className='px-1 menu menu-horizontal'>
            {menus.map((menu) => <Menu key={menu.url}  props={menu} /> )}
          </ul>
        </div>
    </nav>
  );
}

function Menu({props} : {props : Menus}) {
  return (
    <li>
      {props.type === 'in' ? (
        <Link href={props.url}>{props.label}</Link>
      ) : (
        <a href={props.url} target='_blank'>{props.label}</a>
      )}
    </li>
  );
}
