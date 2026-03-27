import Link from 'next/link';
import React from 'react';
import NavbarItem from './NavbarItem';

export default function Navbar() {
  return (
    <div className='fixed z-10 flex gap-4 py-2 px-2 rounded-full mt-6 text-text pointer-events-auto overflow-hidden'>
      <NavbarItem text="Collection" iconSrc="/file.svg" link='/collection' />
      <NavbarItem text="Shopping List" iconSrc="/file.svg" link='/shopping-list' />
      <NavbarItem text="Explore" iconSrc="/file.svg" link='/explore' />
      <NavbarItem text="Profile" iconSrc="/file.svg" link='/profile' />
      <div className='absolute inset-0 scale-200 -z-10 backdrop-blur-sm bg-section-50'></div>
    </div>
  );
}
