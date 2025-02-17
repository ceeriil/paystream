import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Employee } from "@/services/db/employees";

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!user) {
        setLoading(false);
        return setError("Not authenticated");
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/employees", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [user]);

  return { employees, loading, error };
};
