import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Spinner } from "@/components/Spinner";

// Schema for employee creation validation
const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  walletAddress: z.string().min(1, "Wallet address is required"),
  additionalWallets: z.array(z.string()).default([]),
  email: z.string().email("Invalid email address"),
  status: z.boolean().default(true),
  estimatedSalary: z.number().min(0, "Salary must be non-negative"),
  employerNotes: z.string().optional(),
});

type EmployeeFormData = z.infer<typeof createEmployeeSchema>;

export function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    title: "",
    employmentType: "",
    walletAddress: "",
    additionalWallets: [],
    email: "",
    status: true,
    estimatedSalary: 0,
    employerNotes: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "estimatedSalary" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log("Current user:", user);
      if (!user) {
        throw new Error("Not authenticated");
      }

      // Get the current user's token
      const token = await user.getIdToken();
      console.log("Got token:", token ? "Token exists" : "No token");

      // Validate form data
      const validatedData = createEmployeeSchema.parse(formData);

      // Send request to API with token
      console.log("Sending request to API...");
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      console.log("API Response:", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        throw new Error(data.error || "Failed to create employee");
      }

      console.log("Employee added successfully");
      setOpen(false);
      setFormData({
        name: "",
        title: "",
        employmentType: "",
        walletAddress: "",
        additionalWallets: [],
        email: "",
        status: true,
        estimatedSalary: 0,
        employerNotes: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.errors[0].message);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-gradient px-4 py-3 rounded-xl font-medium text-sm text-white">
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem] sm:rounded-[2rem] bg-[#121313]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-medium">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleInputChange}
              className="rounded-xl bg-[#171818] border-none placeholder:font-[300]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title" className="font-medium">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter job title"
              value={formData.title}
              onChange={handleInputChange}
              className="rounded-xl bg-[#171818] border-none placeholder:font-[300]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="employmentType" className="font-medium">
              Employment Type
            </Label>
            <Select
              value={formData.employmentType}
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: "employmentType", value },
                })
              }>
              <SelectTrigger
                id="employmentType"
                className="rounded-xl bg-[#171818] border-none">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="walletAddress" className="font-medium">
              Wallet Address
            </Label>
            <Input
              id="walletAddress"
              name="walletAddress"
              placeholder="Enter wallet address"
              value={formData.walletAddress}
              onChange={handleInputChange}
              className="rounded-xl bg-[#171818] border-none placeholder:font-[300]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              className="rounded-xl bg-[#171818] border-none placeholder:font-[300]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="estimatedSalary" className="font-medium">
              Estimated Salary
            </Label>
            <Input
              id="estimatedSalary"
              name="estimatedSalary"
              type="number"
              min="0"
              placeholder="Enter estimated salary"
              value={formData.estimatedSalary}
              onChange={handleInputChange}
              className="rounded-xl bg-[#171818] border-none placeholder:font-[300]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="employerNotes" className="font-medium">
              Notes
            </Label>
            <Input
              id="employerNotes"
              name="employerNotes"
              placeholder="Enter notes (optional)"
              value={formData.employerNotes}
              onChange={handleInputChange}
              className="rounded-xl bg-[#171818] border-none placeholder:font-[300]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="btn-gradient"
            onClick={handleSubmit}
            disabled={loading}>
            {loading ? <Spinner /> : null}
            Add Employee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
