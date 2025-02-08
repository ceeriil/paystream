"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signOut,
  signInWithCustomToken,
} from "firebase/auth";
import { useAppKitAccount } from "@reown/appkit/react";
import { app } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (
    signatureHex: string,
    publicKey: string,
    nonce: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isConnected } = useAppKitAccount();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!isConnected && user) {
      signOut(auth);
      console.log("signed out");
    }
  }, [isConnected, user, auth]);

  const signIn = async (
    signatureHex: string,
    publicKey: string,
    nonce: string,
  ) => {
    try {
      const response = await fetch("/api/auth/solana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signatureHex,
          publicKey,
          nonce,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to authenticate");
      }

      if (data.firebaseToken) {
        await signInWithCustomToken(auth, data.firebaseToken);
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
