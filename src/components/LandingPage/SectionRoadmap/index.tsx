import React from "react";

export const SectionRoadmap = () => {
  return (
    <section className="mb-32 px-3 md:px-16 roadmap">
      <div className="grid justify-between mb-32 mt-12 w-[90%] mx-auto items-center md:grid-cols-[50%,50%] ">
        <div>
          <h2 className="md:text-[3.5rem] leading-[1.4] text-[2.8rem] gradient-text md:w-[80%]">
            Let PayStream Solve the Problem
          </h2>
        </div>
        <div className="md:ml-24 mt-5 md:mt-0">
          <p className="text-2xl leading-[1.7] ">
            Heres how yu can simplify salary management and free yourself to
            focus on what matters:
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
            xmlns="http://www.w3.org/2000/svg">
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
              Analyze the workforce and payment structure to set up customized
              contracts and payment schedules tailored to specific needs.
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
            xmlns="http://www.w3.org/2000/svg">
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
              Implement smart automation to release payments based on predefined
              schedules, ensuring accuracy and timeliness.
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
            xmlns="http://www.w3.org/2000/svg">
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
              Gain full visibility into your payroll with real-time dashboards
              that track total spend, upcoming payments, and worker statuses.
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
            xmlns="http://www.w3.org/2000/svg">
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
              Pay employees in their preferred tokens — ETH, SOL, USDC, and more
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
            xmlns="http://www.w3.org/2000/svg">
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
              Pay employees across multiple chains without the hassle of
              bridging assets
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
            xmlns="http://www.w3.org/2000/svg">
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
              Streamflow, which has be thoroughly audited for reliability and
              safety.
            </p>
          </div>
        </div>
      </div>
      {/*  */}

      {/*  */}
    </section>
  );
};
