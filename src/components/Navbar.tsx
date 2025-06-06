import { navLists } from "@/constants";
import { appleImg, bagImg, searchImg } from "@/utils";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <Image alt="Apple logo" src={appleImg} width={14} height={18} />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image src={searchImg} alt="search img" width={18} height={18} />
          <Image src={bagImg} alt="bag img" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
