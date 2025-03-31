import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Droplet } from "lucide-react";

export default function FaucetButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="https://spl-token-faucet.com/?token-name=USDC-Dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20] text-white hover:bg-[#ffffff35] transition border border-[#ffffff30]">
          <Droplet size={20} />
        </Link>
      </TooltipTrigger>
      <TooltipContent>Get test USDC tokens</TooltipContent>
    </Tooltip>
  );
}
