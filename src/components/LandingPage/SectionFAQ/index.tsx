import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "Who can use PayStream?",
    content:
      "PayStream is designed to support a variety of use cases, including athlete payments, white-collar jobs, construction contracts, and more",
  },
  {
    id: 2,
    question: "Can I pay employees in my token?",
    content:
      "Yes, PayStream is designed to support payments with various tokens across multiple chains. However, v1 currently only supports USDC on Solana for easier asset tracking.",
  },
  {
    id: 3,
    question: "What Network is PayStream built on?",
    content:
      "PayStream v1 is currently built on Solana. Future versions will expand support to all Streamflow-supported networks, including Etherium, Aptos and Sui",
  },

  {
    id: 4,
    question: "Are my funds secure with PayStream?",
    content:
      "Yes, your funds are secure with PayStream. It is built on Streamflow, a platform that has been thoroughly audited for security",
  },
  {
    id: 5,
    question: "Does PayStream charge any fees?",
    content:
      "PayStream itself does not charge any fees. However, there is a 0.1% fee applied by Streamflow.",
  },
  {
    id: 6,
    question: "How can I get started with PayStream?",
    content:
      "Getting started with PayStream is simple! Link your wallet and begin creating contracts for your employees. PayStream offers an intuitive user experience, but you can also read our docs to understand each feature in detail. For support or issues, feel free to join our Discord community.",
  },
];

export const SectionFAQ = () => {
  const [activeTab, setActiveTab] = useState(faqs[0].id);

  const activeFaq = faqs.find((faq) => faq.id === activeTab);

  return (
    <section id="FAQS">
      <div className="container mx-auto flex flex-col items-center py-32 px-6">
        <h2 className="text-3xl text-center md:text-5xl">
          Frequently Asked Questions
        </h2>
        <div className="my-12 md:mt-32 grid w-full md:grid-cols-2">
          <ul className="card-gradient bg-black border-[#ffffff20] z-10 my-12 rounded-lg p-6 font-bold border">
            {faqs.map((faq) => (
              <li key={faq.id}>
                <button
                  className="tab flex items-center justify-between p-4 w-full hover:bg-[#ffffff15]"
                  style={{
                    cursor: "pointer",
                    background: activeTab === faq.id ? " #1a62ff" : "",
                  }}
                  onClick={() => setActiveTab(faq.id)}>
                  {faq.question}
                  <span className="text-3xl">
                    <FaCaretRight size={20} />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {activeFaq && (
            <div className="card-gradient-2 md:ml-[-3rem] min-h-[22rem] md:min-h-[31rem] p-6 py-12 md:pl-[4rem] text-center">
              <h2 className="font-medium text-xl"> {activeFaq.question}</h2>
              <p className="mt-6 text-xl font-light leading-[1.7]">
                {activeFaq.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
