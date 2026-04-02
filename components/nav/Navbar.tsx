import Link from 'next/link';
import React from 'react';
import NavbarItem from './NavbarItem';
import IconBook from '../icons/IconBook';
import IconBag from '../icons/IconBag';
import IconCompas from '../icons/IconCompas';
import IconProfile from '../icons/IconProfile';

export default function Navbar() {
  return (
    <div className='fixed z-20 flex gap-2 py-2 px-2 rounded-full mt-6 text-text pointer-events-auto overflow-hidden'>
      <NavbarItem icon={<IconBook />} text="Collection" link='/collection' />
      <NavbarItem icon={<IconBag />} text="Shopping List" link='/shopping-list' />
      <NavbarItem icon={<IconCompas />} text="Explore" link='/explore' />
      <NavbarItem icon={<IconProfile />} text="Profile" link='/profile' />
      <div className='absolute inset-0 scale-200 -z-10 backdrop-blur-sm bg-section-50'></div>
    </div>
  );
}
