import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center bg-red-800 p-3 ">
        <Link href="/" className="mr-4 inline-flex items-center p-2 ">
          <span className="text-xl font-bold uppercase tracking-wide text-white">
            Extravaganza
          </span>
        </Link>
        <button
          className=" ml-auto inline-flex rounded p-3 text-white outline-none hover:bg-red-900 hover:text-white lg:hidden"
          onClick={handleClick}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:w-auto lg:flex-grow`}
        >
          <div className="flex w-full flex-col items-start lg:ml-auto lg:inline-flex lg:h-auto  lg:w-auto lg:flex-row lg:items-center">
            <Link
              href="/checkin"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-red-900 hover:text-white lg:inline-flex lg:w-auto "
            >
              Check In
            </Link>
            <Link
              href="/coat"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-red-900 hover:text-white lg:inline-flex lg:w-auto"
            >
              Coat Check
            </Link>
            <Link
              href="/counter"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-red-900 hover:text-white lg:inline-flex lg:w-auto"
            >
              Counter
            </Link>
            <Link
              href="/prizes"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-red-900 hover:text-white lg:inline-flex lg:w-auto"
            >
              Prizes
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
