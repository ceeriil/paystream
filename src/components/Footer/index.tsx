import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";

export const MainFooter = () => {
  return (
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
                <Link href="#">Documentation</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mb-10 mt-12 flex items-center justify-between">
          <p> Copyright &copy; 2025 Paystream</p>
          <div className="flex gap-6">
            <div className="rounded-full border border-[#1a62ff] p-3 text-xl leading-[1]">
              <a href="#">
                <FaDiscord />
              </a>
            </div>
            <div className="rounded-full border border-[#1a62ff] p-3 text-xl leading-[1]">
              <a href="https://github.com/ceeriil/paystream" target="blank_">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
