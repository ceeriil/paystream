const TestnetBanner = ({ network }: { network: string }) => {
  if (network !== "solana-devnet") return null;
  return (
    <div className="bg-yellow-500 text-black text-center py-2 font-semibold sticky top-0 z-20">
      You are currently on Testnet
    </div>
  );
};

export default TestnetBanner;
