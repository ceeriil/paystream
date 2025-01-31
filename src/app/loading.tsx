import { Spinner } from "@/components/Spinner";

const loading = () => {
  return <div className="flex items-center justify-center w-full min-h-[70vh]"><Spinner></Spinner></div>;
};

export default loading;
