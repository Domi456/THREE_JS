import React from "react";
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../contants';

const Navbar = () => {
    return(
        <header className="mt-5 w-full py-5  sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex w-full screen-max-width">
                <img src={appleImg} alt="apple-logo" width={25} height={25}/>
                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav,i) => (
                        <div key={nav} className="cursor-pointer px-5 text-gray-400 hover:text-white transition-all">
                            {nav}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-7 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} alt="search" width={18} height={18}/>
                    <img src={bagImg} alt="bag" width={18} height={18}/>
                </div>
            </nav>
        </header>
    )
}

export default Navbar