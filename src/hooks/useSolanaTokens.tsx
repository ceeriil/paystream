import { useEffect, useState } from "react";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { useAppKitProvider } from "@reown/appkit/react";
import {
  useAppKitConnection,
  type Provider,
} from "@reown/appkit-adapter-solana/react";

interface TokenBalance {
  mint: string | null;
  balance: number;
  name?: string;
  symbol?: string;
  logoURI?: string;
}

interface UseSolanaTokensResult {
  tokens: TokenBalance[];
  loading: boolean;
}

/**
 * Custom hook to fetch and subscribe to balances of SOL and SPL tokens associated with a connected wallet on the Solana blockchain.
 * Provides details such as token name, symbol, and logo URI along with the balance.
 * Automatically updates the balances upon any changes detected on the blockchain.
 *
 * @returns {UseSolanaTokensResult} An array of token balances and a loading state.
 */
function useSolanaTokens(): UseSolanaTokensResult {
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const publicKey = walletProvider?.publicKey;

  useEffect(() => {
    if (!connection || !walletProvider || !publicKey) {
      setTokens([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchBalances = async () => {
      try {
        if (!publicKey) {
          throw new Error("Public key is null");
        }

        const solInfo = await connection.getAccountInfo(publicKey as PublicKey);

        const solBalance: TokenBalance = {
          mint: "Native SOL",
          balance: solInfo ? solInfo.lamports / LAMPORTS_PER_SOL : 0,
          name: "Solana",
          symbol: "SOL",
          logoURI:
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        };

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey as PublicKey,
          { programId: TOKEN_PROGRAM_ID },
        );

        const tokenList = await new TokenListProvider().resolve();
        const tokensData = tokenList
          .filterByClusterSlug("mainnet-beta")
          .getList();

        const splTokens = tokenAccounts.value
          .map((account) => {
            const tokenBalance = account.account.data.parsed.info.tokenAmount;
            const tokenInfo: TokenInfo | undefined = tokensData.find(
              (t) => t.address === account.account.data.parsed.info.mint,
            );

            return {
              mint: account.account.data.parsed.info.mint,
              balance: tokenBalance.uiAmount,
              name: tokenInfo?.name,
              symbol: tokenInfo?.symbol,
              logoURI: tokenInfo?.logoURI,
            };
          })
          .filter((token) => token.balance > 0);

        const filteredTokens = [solBalance, ...splTokens].filter(
          (token) => token.balance > 0,
        );

        setTokens(filteredTokens);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
      }
      setLoading(false);
    };

    fetchBalances();

    const solSubscriptionId = connection.onAccountChange(
      publicKey as PublicKey,
      (updatedAccountInfo) => {
        setTokens((existingTokens) => {
          const updatedSolBalance = {
            ...existingTokens[0],
            balance: updatedAccountInfo.lamports / LAMPORTS_PER_SOL,
          };
          return [updatedSolBalance, ...existingTokens.slice(1)];
        });
      },
      "confirmed",
    );

    return () => {
      connection.removeAccountChangeListener(solSubscriptionId);
    };
  }, [connection, publicKey]);

  return { tokens, loading };
}

export default useSolanaTokens;
