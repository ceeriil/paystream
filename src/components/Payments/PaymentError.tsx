import React from "react";
import { BiError } from "react-icons/bi";

export const PaymentError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex items-center justify-center mt-[4rem] font-bold text-gray-400 flex-col text-center">
      <BiError className="text-[6rem] mb-3" />
      Error: {errorMessage}
    </div>
  );
};
