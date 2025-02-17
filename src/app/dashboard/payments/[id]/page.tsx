"use client";

import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useOneStream } from "@/hooks/useOneStream";
import { Address } from "@/components/Address";
import Link from "next/link";
import { ArrowUpRight, XCircle, PlusCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const streamId = params.id as string;

  const { stream, loading, error } = useOneStream(streamId);

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

  if (!stream) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">Payment Not Found</h1>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/payments")}
            className="mt-4">
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
          onClick={() => router.push("/dashboard/payments")}>
          ← Back to Payments
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Address
              address={streamId}
              type="contract"
              className="text-xl font-medium"
              length="long"
            />
            <Badge variant="default" className="mt-3">
              One Time Payment
            </Badge>
          </div>
          <Link
            className="btn-gradient px-4 py-3 rounded-xl font-[600] text-sm mt-5 flex  items-center "
            href="">
            {" "}
            View on StreamFlow
            <ArrowUpRight size={16} className="ml-2" />
          </Link>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Amount </p>
                <div className="flex items-center space-x-1">
                  <Image
                    src={"/img/token-logo.svg"}
                    width={20}
                    height={20}
                    alt="token logo"
                    className="mr-1"
                  />
                  10 <p className="font-medium"> USDC</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500"> Amount Paid </p>
                <div className="flex items-center space-x-1">
                  <Image
                    src={"/img/token-logo.svg"}
                    width={20}
                    height={20}
                    alt="token logo"
                    className="mr-1"
                  />
                  10 <p className="font-medium"> USDC</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500"> Unpaid </p>
                <div className="flex items-center space-x-1">
                  <Image
                    src={"/img/token-logo.svg"}
                    width={20}
                    height={20}
                    alt="token logo"
                    className="mr-1"
                  />
                  10 <p className="font-medium"> USDC</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">
                  {new Date(stream.start).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Unlock Date</p>
                <p className="font-medium">
                  {new Date(stream.end).toLocaleString()}
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
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Recipients Address</p>
                <p className="font-medium">{stream.recipient}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Paid to</p>
                <p className="font-medium">-</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="mt-3 bg-green-400 text-sm py-0.5 px-2.5 rounded-md text-black inline-block font-semibold">
                  Ongoing
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount per Peiod</p>
                <div className="flex items-center space-x-1">
                  <Image
                    src={"/img/token-logo.svg"}
                    width={20}
                    height={20}
                    alt="token logo"
                    className="mr-1"
                  />
                  10 <p className="font-medium"> USDC per week</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Actions</p>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => console.log("Cancel Payment")}
                        className="text-red-500 hover:text-red-700">
                        <XCircle size={24} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Cancel Payment</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => console.log("Top Up")}
                        className="text-green-500 hover:text-green-700">
                        <PlusCircle size={24} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Top Up</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => console.log("Transfer Funds")}
                        className="text-blue-500 hover:text-blue-700">
                        <ArrowRight size={24} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Change Recipient</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
