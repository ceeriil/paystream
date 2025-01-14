import MainLayout from "@/layouts/MainLayout/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <section className="p-8 flex flex-col h-full justify-center items-center">
        <h1 className="text-5xl font-bold mb-3">PayStream ⚡</h1>
        <p className="text-lg ">
          Automates salary payments and tracks worker payments seamlessly.
        </p>
        <Link
          href={"/dashboard"}
          className="mb-3 mt-6 rounded-full inline-block py-4 px-8 text-white btn-gradient font-bold "
        >
          Go to Dashboard
        </Link>
      </section>
    </MainLayout>
  );
}
