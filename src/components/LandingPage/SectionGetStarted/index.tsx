import React from "react";
import Link from "next/link";

export const SectionGetStarted = () => {
  return (
    <section className="mb-16 mt-20 pb-16 px-4">
      <div className="container mx-auto border py-24 md:px-16 flex flex-col items-center text-center px-4 demo-box rounded-xl neon-box">
        <h2 className="font-bold md:text-[3.5rem] text-2xl leading-[1.3] gradient-text inline-block">
          Get Started with Paystream
        </h2>
        <p className="text-xl my-12 mb-6 leading-[1.7] md:w-[75%] mx-auto">
          Take the first step towards effortless payroll management and focus on
          growing your business with confidence.
        </p>
        <Link
          href="/dashboard"
          className="btn btn-hover color-6 text-xl text-white px-10"
          target="blank_">
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
};
