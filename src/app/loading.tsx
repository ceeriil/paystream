import { Spinner } from "@/components";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[70vh]">
      <Spinner />
    </div>
  );
};

export default loading;
