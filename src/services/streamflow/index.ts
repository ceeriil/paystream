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

/**
 * create a new instance of the SolanaStreamClient
 */
const solanaClient = new SolanaStreamClient(
  "https://mainnet.helius-rpc.com/?api-key=d6b842be-5729-49db-a0b0-4a19822b3533",
  ICluster.Mainnet
);

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
  streamParams: ICreateStreamData,
  solanaParams: ICreateSolanaExt,
  onSuccess: (stream: ICreateResult) => void,
  onError: (error: unknown) => void
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
 * @returns {Promise<[string, Stream][] | undefined>}
 */
export const getAllStreams = async (
  address: string
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
  cancelStreamParams: ICancelData,
  solanaParams: {
    invoker: SignerWalletAdapter | Keypair;
  },
  onSuccess: (stream: ITransactionResult) => void,
  onError: (error: unknown) => void
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
