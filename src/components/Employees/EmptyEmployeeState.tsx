import { CircleDollarSign } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import { AddEmployeeDialog } from "../AddEmployeeDialogue";

export const EmptyEmployeeState = () => {
  return (
    <Card className="flex flex-col items-center justify-center min-h-[20rem] text-center text-gray-400 mt-[4rem] ">
      <CircleDollarSign size={80} className="mb-5" />
      <p className="text-lg font-semibold mb-5 ">
        No Employee found. Create one, and it will appear here!
      </p>
      <AddEmployeeDialog />
    </Card>
  );
};
