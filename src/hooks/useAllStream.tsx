import { useEffect, useState } from "react";
import { getAllStreams } from "@/services/streamflow";
import { Stream } from "@streamflow/stream";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { useSolanaClient } from "@/services/streamflow";

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

  const fetchStreams = async () => {
    if (!walletProvider) {
      setError(new Error("Wallet not connected or public key not found"));
      return;
    }

    const publicKeyString = (walletProvider as any)?.publicKey?.toString();

    console.log("pb string", publicKeyString);

    try {
      setLoading(true);
      const streamData = await getAllStreams(solanaClient, publicKeyString);
      setStreams(streamData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
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
