import { ReactNode } from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Navbar = () => (
  <div className="navBar">
      <div className="flex items-center flex-wrap justify-start w-full lg:mx-0 mx-auto">
        <a href="/rank" className="transition bg-transparent px-10 py-3 rounded font-normal text-white text-left border-none">Pins</a>
        <a href="#" className="transition bg-transparent px-10 py-3 rounded font-normal text-white text-left border-none">News</a>
        <a href="#" className="transition bg-transparent px-10 py-3 rounded font-normal text-white text-left border-none">Clips</a>

        <a href="#" className="transition flex-1 bg-transparent px-10 py-3 rounded font-normal text-white border-none text-right">Randomize</a>
        <a href="#" className="transition bg-transparent px-10 py-3 rounded font-normal text-white border-none text-right">Sign-In</a>

      </div>
      </div>
      
      
);

export { Navbar };
