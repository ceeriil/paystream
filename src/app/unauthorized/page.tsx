"use client";

import { useEffect } from "react";
import EmptyState from "@/components/EmptyState";

const UnauthorizeState: React.FC = () => {
  useEffect(() => {
    console.error("Unauthorized access attempt detected.");
  }, []);

  return (
    <EmptyState
      title="Uh No"
      subtitle="You don't have permission for this resource"
      showReset
      label="Go back home"
    />
  );
};

export default UnauthorizeState;
