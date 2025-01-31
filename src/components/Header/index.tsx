import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "home",
      href: "/",
    },
    {
      id: 2,
      link: "docs",
      href: "https://paystream.gitbook.io/paystream",
    },
    {
      id: 3,
      link: "dahsboard",
      href: "/dashboard",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav md:px-16 z-20 navbar">
      <div className="flex items-center">
        <Image src="/logo.png" width={24} height={24} alt="Paystream Logo" />
        <h2 className="text-2xl font-signature ml-4">
          <a
            className="link-underline link-underline-black"
            href="/"
            rel="noreferrer"
          >
            PayStream
          </a>
        </h2>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, href }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={href}>{link}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-[100] text-white md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen text-white z-[99] bg-black">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={"#" + link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
