import React, { useEffect, useState } from 'react'
import { navLinks } from '../constants';

const NavItems = ({ onClick }) => {
    return(
        <ul className='flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20'>
            {navLinks.map(({id, href, name}) => (
                <li key={id} className='text-neutral-400 hover:text-white font-generalsans max-sm:hover:bg-black-500 max-sm:w-full max-sm:rounded-md py-2 max-sm:px-5'>
                    <a href={href} className='text-lg md:text-base hover:text-white transition-colors' onClick={onClick}>{name}</a>
                </li>
            ))}        
        </ul>
    )
}

const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen); 

    return(
        <header className='fixed top-0 left-0 right-0 z-50 bg-black/90'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center py-5 mx-auto sm:px-10 px-5 h-17 md:h-30'>
                    <a href='/' className='text-neutral-400 font-bold text-xl hover:text-white transition-colors'>
                        <img src='assets/orange_d.png' className='w-27'></img>
                    </a>
                    <button onClick={toggleMenu} className='text-neutral-400 hover:text-white focus:outline-none flex sm:hidden' aria-label='toggle label'>
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt='toggle' className='w-6 h-6'></img>
                    </button>
                    <nav className='hidden sm:flex'>
                        <NavItems />
                    </nav>
                </div>
            </div>
            {isOpen && (
                <div className='nav-sidebar max-h-screen sm:hidden'>
                    <nav className='p-5'>
                        <NavItems onClick={toggleMenu} />
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar