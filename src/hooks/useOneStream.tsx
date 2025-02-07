import { useEffect, useState } from "react";
import { getOneStream } from "@/services/streamflow";
import { Stream } from "@streamflow/stream";
import { useSolanaClient } from "@/services/streamflow";

/**
 * Fetches a single stream by ID.
 *
 * @export
 * @param {string} id - The ID of the stream to fetch.
 * @returns {{ stream: Types.IGetOneResponse | undefined; fetchStream; loading: boolean; error: Error | undefined; }}
 */
export function useOneStream(id: string): {
  stream: Stream | undefined;
  fetchStream: () => void;
  loading: boolean;
  error: Error | undefined;
} {
  const [stream, setStream] = useState<Stream | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();
  const { solanaClient } = useSolanaClient();

  const fetchStream = () => {
    if (!id) {
      setError(new Error("Stream ID is required"));
      return;
    }

    setLoading(true);

    getOneStream(solanaClient, id)
      .then((streamData) => setStreams(streamData))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStream();
    return () => {
      setStream(undefined);
      setLoading(true);
      setError(undefined);
    };
  }, [id, solanaClient]);

  return { stream, fetchStream, loading, error };
}
