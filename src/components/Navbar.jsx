import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="">
      <div className="flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto">
        <Link href={"/"}>
          <p className="text-2xl font-bold text-gradient text-black">RESUME</p>
        </Link>
        <div className="flex gap-5">
          <Link href={"/sign-in"}> 
           <button className="primary-gradient text-white rounded-full px-4 py-2 cursor-pointer  w-fit">
            Sign In
          </button>
          </Link>
         
          <Link
            href={"/upload-resume"}
            className="primary-gradient text-white rounded-full px-4 py-2 cursor-pointer  w-fit"
          >
            upload resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
