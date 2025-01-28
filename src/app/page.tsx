"use client";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Link from "next/link";
import { FaCaretRight, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "Will I work with the same marketing team all the time?",
    content:
      "Yes! The same team members will work with you throughout the entire relationship ",
  },
  {
    question: "How many revisions can I get per funnel?",
    content:
      "You’re entitled to 2 revisions during the duration that we work together.    ",
  },
  {
    question: "How can I talk with the team?",
    content:
      "You can chat with us over Zoom when we start the project, and once we start the working process, you can reach out to us on Whatsapp or Linkedin anytime you need!",
  },
  {
    question: "How do I know which services are right for my business?",
    content:
      "We conduct a thorough analysis of your goals, target audience, and industry to recommend tailored digital marketing services that align with your needs.",
  },
  {
    question: "Can you work with businesses of all sizes?",
    content:
      "Absolutely. We tailor our services to meet the unique needs and budgets of businesses, whether large enterprises or small startups.",
  },
  {
    question: "What sets your services apart from others?",
    content:
      "Our approach is client-focused, with personalized strategies, transparent communication, and a commitment to delivering measurable results.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <MainLayout>
      <main>
        <section className="min-h-screen hero" id="home">
          <div className="container mx-auto flex flex-col items-center pt-32 px-3">
            <h1 className="text-center text-3xl md:text-[4.5rem] leading-[1.5] gradient-text">
              Automate Payroll with PayStream
            </h1>
            <p className="text-xl leading-[1.5] md:text-2xl mb-8 text-center mt-3">
              Experience smooth salary automation and tracking, designed to
              improve payment processes effortlessly
            </p>

            <div className="flex">
              <Link
                href="/dashboard"
                className="btn btn-hover color-6 md:text-xl text-white"
                target="blank_"
              >
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

        <section>
          <div className="container mx-auto flex flex-col items-center px-4 py-32">
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
                  Balancing worker contracts, payment schedules, and compliance
                  can be overwhelming.
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
                  Delays in payments can disrupt cash flow and upset
                  relationships with employees and vendors, creating unnecessary
                  stress and setbacks.
                </p>
              </div>

              <div className="gradient-border flex flex-col items-center rounded-sm border border-[#ffffff70] px-4 py-10 text-center">
                <h3 className="text-lg uppercase">Accuracy and Efficiency</h3>
                <p className="mt-2 text-[#ffffffcc]">
                  Manual payment processes are prone to errors and
                  inefficiencies, consuming valuable time that could be spent on
                  other aspect of business.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto flex flex-col items-center py-32 px-3 md:px-0">
            <h2 className="text-center text-3xl md:text-[5rem] lg:text-[6rem] md:leading-[1.4]">
              <span>Streamline Your Workflow</span>
              <br />
            </h2>
            <p className="md:my-16 text-center text-xl leading-[1.8] md:w-[50%] my-8 ">
              As a visionary leader, your energy is better spent building your
              business, not managing payroll issues.
            </p>
          </div>
        </section>

        <section className="mb-32 px-3 md:px-16 roadmap">
          <div className="grid justify-between mb-32 mt-12 w-[90%] mx-auto items-center md:grid-cols-[50%,50%] ">
            <div>
              <h2 className="md:text-[3.5rem] leading-[1.4] text-[2.8rem] gradient-text md:w-[80%]">
                Let PayStream Solve the Problem
              </h2>
            </div>
            <div className="md:ml-24 mt-5 md:mt-0">
              <p className="text-2xl leading-[1.7] ">
                Here's how we simplify salary management and free you to focus
                on what matters:
              </p>
            </div>
          </div>
          <div className="phases">
            <h3>Phase 1</h3>
            <span className="arrow top">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292894 8.70711C-0.0976307 8.31658 -0.0976306 7.68342 0.292894 7.29289C0.683418 6.90237 1.31658 6.90237 1.70711 7.29289L6 11.5858L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071L0.292894 8.70711ZM0.292895 1.70711C-0.0976298 1.31658 -0.0976297 0.683417 0.292895 0.292893C0.683419 -0.097632 1.31658 -0.0976319 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976316 11.3166 -0.0976315 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292895 1.70711Z"
                  fill="#1a62ff"
                />
              </svg>
            </span>
            <div className="container-t left">
              <div className="content">
                <h3>Phase 1: Setup & Strategy</h3>
                <p>
                  We analyze your workforce and payment structure, setting up
                  customized contracts and payment schedules tailored to your
                  need
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="phases">
            <h3>Phase 2</h3>
            <span className="arrow bottom">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292894 8.70711C-0.0976307 8.31658 -0.0976306 7.68342 0.292894 7.29289C0.683418 6.90237 1.31658 6.90237 1.70711 7.29289L6 11.5858L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071L0.292894 8.70711ZM0.292895 1.70711C-0.0976298 1.31658 -0.0976297 0.683417 0.292895 0.292893C0.683419 -0.097632 1.31658 -0.0976319 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976316 11.3166 -0.0976315 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292895 1.70711Z"
                  fill="#1a62ff"
                />
              </svg>
            </span>
            <div className="container-t right">
              <div className="content items-l">
                <h3>Automated Payments</h3>
                <p>
                  Implement smart automation to release payments based on
                  predefined schedules, ensuring accuracy and timeliness.
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="phases">
            <h3>Phase 3</h3>
            <span className="arrow bottom">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292894 8.70711C-0.0976307 8.31658 -0.0976306 7.68342 0.292894 7.29289C0.683418 6.90237 1.31658 6.90237 1.70711 7.29289L6 11.5858L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071L0.292894 8.70711ZM0.292895 1.70711C-0.0976298 1.31658 -0.0976297 0.683417 0.292895 0.292893C0.683419 -0.097632 1.31658 -0.0976319 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976316 11.3166 -0.0976315 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292895 1.70711Z"
                  fill="#00fff8"
                />
              </svg>
            </span>
            <div className="container-t left">
              <div className="content items-l">
                <h3>Tracking & Insights</h3>
                <p>
                  Gain full visibility into your payroll with real-time
                  dashboards that track total spend, upcoming payments, and
                  worker statuses.
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="phases">
            <h3>Phase 4</h3>
            <span className="arrow bottom">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292894 8.70711C-0.0976307 8.31658 -0.0976306 7.68342 0.292894 7.29289C0.683418 6.90237 1.31658 6.90237 1.70711 7.29289L6 11.5858L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071L0.292894 8.70711ZM0.292895 1.70711C-0.0976298 1.31658 -0.0976297 0.683417 0.292895 0.292893C0.683419 -0.097632 1.31658 -0.0976319 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976316 11.3166 -0.0976315 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292895 1.70711Z"
                  fill="#00fff8"
                />
              </svg>
            </span>
            <div className="container-t right">
              <div className="content items-l">
                <h3>Multi Token Support</h3>
                <p>
                  Pay employees in their preferred tokens — ETH, SOL, USDC, and
                  more
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="phases">
            <h3>Phase 5</h3>
            <span className="arrow bottom">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292894 8.70711C-0.0976307 8.31658 -0.0976306 7.68342 0.292894 7.29289C0.683418 6.90237 1.31658 6.90237 1.70711 7.29289L6 11.5858L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071L0.292894 8.70711ZM0.292895 1.70711C-0.0976298 1.31658 -0.0976297 0.683417 0.292895 0.292893C0.683419 -0.097632 1.31658 -0.0976319 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976316 11.3166 -0.0976315 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292895 1.70711Z"
                  fill="#00fff8"
                />
              </svg>
            </span>
            <div className="container-t left">
              <div className="content items-l">
                <h3>Multi-Chain Support </h3>
                <p>
                  Ensure payments are handled securely. PayStreams is built on
                  Streamflow, which has be thoroughly audited for reliability
                  and safety.
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="phases">
            <h3>Phase 6</h3>
            <span className="arrow bottom">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292894 8.70711C-0.0976307 8.31658 -0.0976306 7.68342 0.292894 7.29289C0.683418 6.90237 1.31658 6.90237 1.70711 7.29289L6 11.5858L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071L0.292894 8.70711ZM0.292895 1.70711C-0.0976298 1.31658 -0.0976297 0.683417 0.292895 0.292893C0.683419 -0.097632 1.31658 -0.0976319 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976316 11.3166 -0.0976315 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292895 1.70711Z"
                  fill="#1a62ff"
                />
              </svg>
            </span>
            <div className="container-t right">
              <div className="content items-r">
                <h3>Compliance & Security</h3>
                <p>
                  Ensure payments are handled securely. PayStreams is built on
                  Streamflow, which has be thoroughly audited for reliability
                  and safety.
                </p>
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
        </section>

        <section className="mb-16 mt-32 pb-16 px-4">
          <div className="container mx-auto border py-24 md:px-16 flex flex-col items-center text-center px-4 demo-box rounded-xl">
            <h2 className="font-bold md:text-[3.5rem] text-2xl leading-[1.3] gradient-text inline-block">
              Get Started with Paystream
            </h2>
            <p className="text-xl my-12 mb-6 leading-[1.7] md:w-[75%] mx-auto">
              Take the first step towards effortless payroll management and
              focus on growing your business with confidence.
            </p>
            <Link
              href="https://luminx-calender.netlify.app/"
              className="btn btn-hover color-6 text-xl text-white"
              target="blank_"
            >
              Book a Demo Now
            </Link>
          </div>
        </section>

        <section id="FAQS">
          <div className="container mx-auto flex flex-col items-center py-32 px-6">
            <h2 className="text-3xl text-center md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="my-12 md:mt-32 grid w-full md:grid-cols-2">
              <ul className="card-gradient z-10 my-12 rounded-lg p-6 font-bold">
                {faqs.map((faq, index) => (
                  <li
                    className="tab flex items-center justify-between p-4"
                    style={{
                      cursor: "pointer",
                      background:
                        activeTab === index ? " #1a62ff" : "transparent",
                      color: activeTab === index ? "white" : "white",
                    }}
                    onClick={() => setActiveTab(index)}
                    key={index}
                  >
                    {faq.question}
                    <span className="text-3xl">
                      <FaCaretRight size={20} />
                    </span>
                  </li>
                ))}
              </ul>

              {/*   <div className="card-gradient-2 md:ml-[-3rem] h-[22rem] md:h-[31rem] p-6 py-12 md:pl-[4rem] text-center">
                <h2 className="font-medium text-xl">
                  {faqs[activeTab].question}
                </h2>
                <p className="mt-6 text-xl font-light leading-[1.7]">
                  {faqs[activeTab].content}
                </p>
              </div> */}
            </div>
          </div>
        </section>

        <footer className="border-t border-[#00000050] py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between md:flex-row flex-col">
              <h2 className="text-3xl font-bold uppercase">Paystream.</h2>
              <nav className="md:mt-0 mt-6">
                <ul>
                  <li className="mr-6 inline-block">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="mr-6 inline-block">
                    <Link href="/dashboard">App</Link>
                  </li>
                  <li className="inline-block">
                    <Link href="#contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mb-10 mt-12 flex items-center justify-between">
              <p>&copy; Made by Paystream</p>
              <div className="flex gap-6">
                <div className="rounded-full border border-[#1a62ff] p-3 text-xl leading-[1]">
                  <a href="#">
                    <FaInstagram />
                  </a>
                </div>
                <div className="rounded-full border border-[#1a62ff] p-3 text-xl leading-[1]">
                  <a href="#">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </MainLayout>
  );
}
