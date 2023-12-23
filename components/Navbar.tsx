import React from "react";
import Link from "next/link";

import { ThemeToggler } from "./ThemeToggler";

import {arial} from '@/fonts/font'

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="fixed inset-x-0 top-0  dark:bg-gray-950 z-[10] h-fit   py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        <Link href={"/"} className="flex items-center gap-2">
          <p className={` ${arial.className} rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white`}>
            pomodorio
          </p>
        </Link>

        <div className="flex items-center">
          <ThemeToggler className=" mr-4" />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
