/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    isBraveWallet?: boolean;
    isTrust?: boolean;
    isTrustWallet?: boolean;
    providers?: Array<{
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      isBraveWallet?: boolean;
      isTrust?: boolean;
      isTrustWallet?: boolean;
    }>;
    request: (request: { method: string; params?: Array<any> }) => Promise<any>;
    on: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    removeAllListeners?: () => void;
  };
  coinbaseWalletExtension?: typeof window.ethereum;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
}