import React from "react";

interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto bg-[#1E1E1E] rounded-2xl ">
      <table className="w-full border-collapse bg-[#1E1E1E] rounded-2xl shadow ">
        {children}
      </table>
    </div>
  );
};
