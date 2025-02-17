import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Employee } from "@/services/db/employees";

export const useFetchEmployee = (walletAddress: string) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!user) {
        setLoading(false);
        return setError("Not authenticated");
      }

      if (!walletAddress) {
        setLoading(false);
        return setError("Wallet address is required");
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/employees/${walletAddress}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }

        const data = await response.json();
        setEmployee(data.employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [user, walletAddress]);

  return { employee, loading, error };
};
