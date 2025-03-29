import React from "react";

export const TerminalFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative border-[0.5px] border-[#282e45]  bg-[#282e45] rounded-xl h-auto ">
        <div className="py-3 px-5 border-b border-[#404040]   ">
          <div className="flex space-x-3">
            <div className="bg-[#0f132f] w-4 h-4 rounded-full opacity-70" />
            <div className="bg-[#0f132f] w-4 h-4 rounded-full opacity-70" />
            <div className="bg-[#0f132f] w-4 h-4 rounded-full opacity-70" />
          </div>
        </div>
        <div className="h-auto rounded-b-xl  ">{children}</div>
      </div>
    </div>
  );
};
