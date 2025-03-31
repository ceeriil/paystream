import {
  ICreateSolanaExt,
  SolanaStreamClient,
} from "@streamflow/stream/solana";
import {
  ICreateStreamData,
  StreamType,
  StreamDirection,
  ICreateResult,
  ICancelData,
  ITransactionResult,
  Stream,
  ICluster,
} from "@streamflow/stream";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { Keypair } from "@solana/web3.js";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { IGetOneData } from "@streamflow/stream";

const getCluster = (network: string) => {
  switch (network) {
    case "solana-mainnet":
      return ICluster.Mainnet;
    default:
      return ICluster.Devnet;
  }
};

// Create a function to initialize SolanaStreamClient
const createSolanaClient = (rpcUrl: string, network: ICluster) => {
  return new SolanaStreamClient(rpcUrl, network);
};

export const useSolanaClient = () => {
  const { caipNetwork } = useAppKitNetwork();
  const network =
    (caipNetwork as { network?: string })?.network || "solana-devnet";

  const [solanaClient, setSolanaClient] = useState<SolanaStreamClient | null>(
    null,
  );

  useEffect(() => {
    const newRpcUrl =
      network === "solana-mainnet"
        ? "https://mainnet.helius-rpc.com/?api-key=d6b842be-5729-49db-a0b0-4a19822b3533"
        : "https://devnet.helius-rpc.com/?api-key=d6b842be-5729-49db-a0b0-4a19822b3533"; //don't steal my rpc please. this one is free

    const newSolanaClient = createSolanaClient(newRpcUrl, getCluster(network));
    setSolanaClient(newSolanaClient);
  }, [network]);

  return { solanaClient };
};

/**
 * Create a new stream on the Solana blockchain
 *
 * @async
 * @param {ICreateStreamData} streamParams
 * @param {ICreateSolanaExt} solanaParams
 * @param {(stream: ICreateResult) => void} onSuccess
 * @param {(error: unknown) => void} onError
 * @returns {Promise<ICreateResult | undefined>}
 */
export const createStream = async (
  solanaClient: SolanaStreamClient,
  streamParams: ICreateStreamData,
  solanaParams: ICreateSolanaExt,
  onSuccess: (stream: ICreateResult) => void,
  onError: (error: unknown) => void,
): Promise<ICreateResult | undefined> => {
  try {
    const stream = await solanaClient.create(streamParams, solanaParams);
    if (stream) {
      onSuccess(stream);
    }
    return stream;
  } catch (error) {
    onError(error);
  }
};

/**
 * Get all streams from the Solana blockchain
 *
 * @async
 * @param {string} address
 * @param {string} solanaClient
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getAllStreams = async (
  solanaClient: SolanaStreamClient,
  address: string,
): Promise<[string, Stream][] | undefined> => {
  try {
    const streams = await solanaClient.get({
      address,
      type: StreamType.All,
      direction: StreamDirection.All,
    });
    return streams;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get one streams from the Solana blockchain
 *
 * @async
 * @param {string} address
 * @param {string} solanaClient
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getOneStream = async (
  solanaClient: SolanaStreamClient,
  id: string,
): Promise<Stream | undefined> => {
  try {
    const data: IGetOneData = { id };
    const stream = await solanaClient.getOne(data);
    return stream;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Cancel a stream on the Solana blockchain
 *
 * @async
 * @param {ICancelData} cancelStreamParams
 * @param {{
 *     invoker: SignerWalletAdapter | Keypair;
 *   }} solanaParams
 * @param {(stream: ITransactionResult) => void} onSuccess
 * @param {(error: unknown) => void} onError
 * @returns {Promise<void>}
 */
export const cancelStream = async (
  solanaClient: SolanaStreamClient,
  cancelStreamParams: ICancelData,
  solanaParams: { invoker: SignerWalletAdapter | Keypair },
  onSuccess: (stream: ITransactionResult) => void,
  onError: (error: unknown) => void,
): Promise<void> => {
  try {
    const stream = await solanaClient.cancel(cancelStreamParams, solanaParams);
    if (stream) {
      onSuccess(stream);
    }
  } catch (error) {
    onError(error);
  }
};
