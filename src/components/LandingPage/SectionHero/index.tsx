import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { TerminalFrame } from "@/components/TerminalFrame";

export const SectionHero = () => {
  return (
    <section className="min-h-screen hero" id="home">
      <div className="container mx-auto flex flex-col items-center pt-32 px-4">
        <h1 className="text-center text-4xl font-medium md:text-[4.5rem] lg:leading-[1.5] gradient-text leading-[1.3]">
          Automate Payroll with PayStream
        </h1>
        <p className="lg:text-xl text-lg leading-[1.5] md:text-2xl mb-8 text-center mt-3">
          Experience smoooth payment automation and tracking, designed to
          improve payment processes effortlessly
        </p>

        <div className="flex">
          <Link
            href="/dashboard"
            className="btn btn-hover color-6 md:text-xl text-white py-4 px-12"
            target="blank_">
            Go to App
          </Link>
        </div>

        <div className="pt-16 block pb-16 relative min-w-[80%] ">
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={false}>
            <TerminalFrame>
              <Image
                src="/img/capture.png"
                alt="hero-image"
                width={809}
                height={513}
                className="object-cover w-full  rounded-b-xl "
                priority
                quality={100}
              />
            </TerminalFrame>
          </Tilt>
        </div>
      </div>
    </section>
  );
};
