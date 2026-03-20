import React from 'react';
import Navbar from './Navbar';

export default function Header() {
    return (
        <header className='absolute inset-0 flex justify-center w-full pointer-events-none'>
            <Navbar />
        </header>
    );
}
