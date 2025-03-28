import { useFormContext } from "react-hook-form";
import { Wallet, Search } from "lucide-react";
import { StepperFormValues } from "@/types/hook-stepper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useFetchEmployees } from "@/hooks/useFetchEmployees";
import Link from "next/link";

const Recipients = () => {
  const { register, setValue } = useFormContext<StepperFormValues>();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { employees } = useFetchEmployees();

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.walletAddress.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h4 className="stepper_step_heading">Recipient Information</h4>
      <div className="stepper_step_container">
        <div>
          <label
            htmlFor="paymentType"
            className="text-sm text-neutral-300 mb-2 inline-block">
            Token Amount
          </label>
          <Input
            id="tokenAmount"
            type="number"
            {...register("tokenAmount", { required: "Required" })}
          />
        </div>

        <div>
          <label
            htmlFor="recipientWallet"
            className="text-sm text-neutral-300 mb-2 inline-block">
            Recipient Wallet
          </label>
          <div className="relative">
            <Input
              id="recipientWallet"
              type="text"
              className="pr-12"
              {...register("recipientWallet", { required: "Required" })}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Wallet className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 shadow-lg rounded-md bg-black border-[#ffffff20] left-0 w-60">
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by name or wallet..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 text-xs border-[#ffffff20]"
                  />
                </div>

                <div className="flex flex-col">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <button
                        key={employee.name}
                        onClick={() => {
                          setValue("recipientWallet", employee.walletAddress);
                          setValue("recipientEmail", employee.email);
                          setOpen(false);
                          setSearch("");
                        }}
                        className="text-left text-xs p-2 hover:bg-[#ffffff16] rounded-md">
                        {employee.name}{" "}
                        <span className="text-gray-400">
                          ({employee.walletAddress.slice(0, 6)}...)
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400 p-2">
                      No employee found.{" "}
                      <Link
                        href="/dashboard/employees"
                        className="text-blue-500 underline">
                        Go to Employee Page
                      </Link>{" "}
                      to add an employee.
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <label
            htmlFor="recipientEmail"
            className="text-sm text-neutral-300 mb-2 inline-block">
            Recipient Email
          </label>
          <Input
            id="recipientEmail"
            type="email"
            {...register("recipientEmail", { required: "Required" })}
          />
        </div>
      </div>
    </div>
  );
};

export default Recipients;
