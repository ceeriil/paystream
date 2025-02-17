import React from "react";
import { Spinner } from "../Spinner";

export const EmployeeLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}>
      <Spinner />
    </div>
  );
};
