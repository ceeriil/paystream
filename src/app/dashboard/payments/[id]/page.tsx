"use client";

import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAllStreams } from "@/hooks/useAllStream";
import { Spinner } from "@/components/Spinner";

export default function PaymentDetailPage() {
  const { streams, loading, error } = useAllStreams();
  const params = useParams();
  const router = useRouter();
  const streamId = params.id as string;

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-[4rem]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-gray-400 mt-10">
        <p>Error loading Payment details: {error.message}</p>
      </div>
    );
  }

  const stream = streams?.find((s) => s[0] === streamId);

  if (!stream) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">Payment Not Found</h1>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/payments")}
            className="mt-4"
          >
            Back to Payments
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
          onClick={() => router.push("/dashboard/payments")}
        >
          ← Back to Payments
        </Button>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold">{stream.recipient}</h1>
        <p className="text-gray-500">Payment Details</p>
        <Badge variant="default" className="mt-2">
          {stream.status}
        </Badge>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Stream Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{stream.amount} USDC</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">
                  {new Date(stream.start).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">
                  {new Date(stream.end).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              Recipient Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Wallet Address</p>
                <p className="font-medium">{stream.recipient}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{stream.status}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
