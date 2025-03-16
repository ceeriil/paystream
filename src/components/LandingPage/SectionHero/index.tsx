import React from "react";
import Link from "next/link";
import Image from "next/image";

export const SectionHero = () => {
  return (
    <section className="min-h-screen hero" id="home">
      <div className="container mx-auto flex flex-col items-center pt-32 px-3">
        <h1 className="text-center text-3xl md:text-[4.5rem] leading-[1.5] gradient-text">
          Automate Payroll with PayStream
        </h1>
        <p className="text-xl leading-[1.5] md:text-2xl mb-8 text-center mt-3">
          Experience smoooth payment automation and tracking, designed to
          improve payment processes effortlessly
        </p>

        <div className="flex">
          <Link
            href="/dashboard"
            className="btn btn-hover color-6 md:text-xl text-white"
            target="blank_">
            Go to App
          </Link>
        </div>

        <div className="pt-16 relative block pb-16">
          <Image
            src="/img/hero-img.png"
            alt="hero-image"
            width={809}
            height={513}
          />
        </div>
      </div>
    </section>
  );
};
