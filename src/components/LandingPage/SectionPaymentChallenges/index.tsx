import React from "react";

export const SectionPaymentChallenges = () => {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-center px-4 py-32 ">
        <p className="mb-5 font-[300] uppercase">
          Addressing Payment Challenges
        </p>
        <h2 className="md:text-5xl font-[500] text-center text-3xl">
          Ready for some unfiltered truth?
        </h2>
        <div className="my-12 mt-24 grid grid-cols-1 gap-8 gap-y-16 md:grid-cols-3">
          <div className="gradient-border flex flex-col items-center rounded-sm border border-[#ffffff70] px-4 py-10 text-center">
            <h3 className="text-lg uppercase">Time Contrainst</h3>
            <p className="mt-2 text-[#ffffffcc]">
              Managing payroll manually takes valuable time, hindering the
              growth of your business.
            </p>
          </div>

          <div className="gradient-border flex flex-col items-center rounded-sm border border-[#ffffff70] px-4 py-10 text-center">
            <h3 className="text-lg uppercase">Complex Processes</h3>
            <p className="mt-2 text-[#ffffffcc]">
              Balancing worker contracts, payment schedules, and compliance can
              be overwhelming.
            </p>
          </div>

          <div className="gradient-border flex flex-col items-center rounded-sm border border-[#ffffff70] px-4 py-10 text-center">
            <h3 className="text-lg uppercase">Tracking Headaches</h3>
            <p className="mt-2 text-[#ffffffcc]">
              Monitoring paid and pending payments without clear systems can
              lead to confusion and errors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 gap-y-16 md:mx-16 md:grid-cols-2">
          <div className="gradient-border flex flex-col items-center rounded-sm border border-[#ffffff70] px-4 py-10 text-center">
            <h3 className="text-lg uppercase">Late Payments</h3>
            <p className="mt-2 text-[#ffffffcc]">
              Delays in payments can disrupt cash flow and upset relationships
              with employees and vendors, creating unnecessary stress and
              setbacks.
            </p>
          </div>

          <div className="gradient-border flex flex-col items-center rounded-sm border border-[#ffffff70] px-4 py-10 text-center">
            <h3 className="text-lg uppercase">Accuracy and Efficiency</h3>
            <p className="mt-2 text-[#ffffffcc]">
              Manual payment processes are prone to errors and inefficiencies,
              consuming valuable time that could be spent on other aspect of
              business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
