"use client";

import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { DicebearAvatar } from "@/components/ui/dicebear-avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useFetchEmployee } from "@/hooks/useFetchEmployee";
import { PaymentsTable } from "@/components/PaymentsTable";
import { useAllStreams } from "@/hooks/useAllStream";
import { Stream } from "@streamflow/stream";
import { useEffect } from "react";
import { Spinner } from "@/components";
import { Address } from "@/components/Address";
import { BookText, CreditCard } from "lucide-react";

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;
  const { streams, loadingStream, streamError } = useAllStreams();

  const paystreamStreams = streams?.filter(
    ([, stream]: [string, Stream]) =>
      stream.name?.toLowerCase().includes("paystream") &&
      stream.recipient === params.id,
  );

  useEffect(() => {
    console.log("stream for account", paystreamStreams);
  });

  const { employee, loading, error } = useFetchEmployee(employeeId);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <div className="p-6 text-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold">Employee not found</h1>
          <p className="text-gray-500">
            {error || "No employee data available"}
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/employees")}
            className="mt-4">
            Back to Employees
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/employees")}>
          ← Back to Employees
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <DicebearAvatar
              seed={employee.walletAddress}
              size={80}
              className="h-20 w-20"
            />
            <div>
              <h1 className="text-2xl font-bold">{employee.name}</h1>
              <p className="text-gray-500">{employee.email}</p>
              <Badge variant="default" className="mt-2">
                {employee.employmentType}
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <BookText size={16} className="mr-1" /> Employee Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium">{employee.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employment Type</p>
                <p className="font-medium">{employee.employmentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              {" "}
              <CreditCard size={16} className="mr-1" /> Payment Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Primary Wallet</p>

                <Address
                  address={employee.walletAddress}
                  type="account"
                  length="long"
                />
              </div>
              {employee.additionalWallets.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Additional Wallets</p>
                  <div className="space-y-2">
                    {employee.additionalWallets.map((wallet, index) => (
                      <p key={index} className="font-medium">
                        {wallet}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Total Payment Streams</p>
                <p className="font-medium">{paystreamStreams?.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payments</p>
                <p className="font-medium">0 USDC</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <h2 className="mb-10 text-2xl font-medium mt-24">Payments</h2>

      <Card className="">
        {(() => {
          switch (true) {
            case loadingStream:
              return <p>loading</p>;
            case !paystreamStreams || paystreamStreams.length === 0:
              return (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  No payment streams available
                </div>
              );
            default:
              return <PaymentsTable streams={paystreamStreams} />;
          }
        })()}
      </Card>
    </div>
  );
}
