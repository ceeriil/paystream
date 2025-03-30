"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export const MainHeader = () => {
  const [nav, setNav] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  const links = [
    { id: 1, link: "home", href: "/" },
    { id: 2, link: "docs", href: "https://paystream.gitbook.io/paystream" },
    { id: 3, link: "dashboard", href: "/dashboard" },
  ];

  useEffect(() => {
    if (nav) {
      gsap.fromTo(
        navRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" },
      );

      gsap.fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [nav]);

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav md:px-16 z-20 navbar backdrop-blur-md bg-[#00000040]">
      <div className="flex items-center">
        <Image src="/logo.png" width={24} height={24} alt="Paystream Logo" />
        <h2 className="text-2xl font-signature ml-4">
          <Link
            className="link-underline link-underline-black"
            href="/"
            rel="noreferrer">
            PayStream
          </Link>
        </h2>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {links.map(({ id, link, href }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline">
            <Link href={href}>{link}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden flex flex-col space-y-1 cursor-pointer z-[100]"
        onClick={() => setNav(!nav)}>
        <div className="w-8 h-0.5 bg-white" />
        <div className="w-8 h-0.5 bg-white" />
      </button>

      {/* Mobile Navigation */}
      {nav && (
        <ul
          ref={navRef}
          className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen text-white z-[99] bg-[#000000]">
          {links.map(({ id, link }, index) => (
            <li
              key={id}
              ref={(el) => (linksRef.current[index] = el)}
              className="px-4 cursor-pointer capitalize py-6 text-4xl font-bold gradient-text">
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
