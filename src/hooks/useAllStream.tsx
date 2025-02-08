import { useEffect, useState } from "react";
import { getAllStreams } from "@/services/streamflow";
import { Stream } from "@streamflow/stream";
import { useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import { useSolanaClient } from "@/services/streamflow";
import { Provider } from "@reown/appkit-adapter-solana/react";

/**
 * Returns all streams of the user's wallet on the Solana blockchain.
 *
 * @export
 * @returns {{ streams: [string, Stream][] | undefined; fetchStreams; loading: boolean; error: Error | undefined; }}
 */
export function useAllStreams(): {
  streams: [string, Stream][] | undefined;
  fetchStreams: () => void;
  loading: boolean;
  error: Error | undefined;
} {
  const [streams, setStreams] = useState<[string, Stream][] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const { solanaClient } = useSolanaClient();
  const { caipNetwork } = useAppKitNetwork();

  const fetchStreams = () => {
    if (!walletProvider) {
      setError(new Error("Wallet not connected or public key not found"));
      return;
    }

    if (!solanaClient) {
      setError(new Error("Solana client not initialized"));
      return;
    }

    const publicKeyString = walletProvider?.publicKey?.toString() || "";

    setLoading(true);

    getAllStreams(solanaClient, publicKeyString)
      .then((streamData) => setStreams(streamData))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStreams();
    return () => {
      setStreams(undefined);
      setLoading(true);
      setError(undefined);
    };
  }, [walletProvider, solanaClient]);

  return { streams, fetchStreams, loading, error };
}
