import React from "react";
import { BiError } from "react-icons/bi";
import { Card } from "../ui/card";

export const PaymentError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Card className="flex items-center justify-center mt-[4rem] flex-col text-center border min-h-[20rem] text-lg">
      <BiError size={80} className=" mb-5 " />
      <span className="font-semibold">
        Error: <span>{errorMessage}</span>
      </span>
    </Card>
  );
};
