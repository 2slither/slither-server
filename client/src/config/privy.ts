import type { PrivyClientConfig } from '@privy-io/react-auth';
import { environment } from './environment';

export const privyConfig: PrivyClientConfig = {
  
  // Appearance configuration to match the slither.io theme
  appearance: {
    theme: 'dark',
    accentColor: '#4ecdc4',
    logo: undefined,
    showWalletLoginFirst: false,
  },
  
  // Authentication methods - remove 'wallet' to prevent external wallet connections
  loginMethods: ['email', 'google'],
  
  // Embedded wallet configuration - ONLY Solana
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    // Disable Ethereum wallets completely
    ethereum: {
      createOnLogin: 'off',
    },
    // Enable ONLY Solana wallets and force recreation
    solana: {
      createOnLogin: 'users-without-wallets',
    },
  },
  

  
  // Configure Solana RPC endpoints to use environment variable
    solanaClusters: [
    {
      name: 'mainnet-beta',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
    },
  ],
  
  // Additional security
  mfa: {
    noPromptOnMfaRequired: false,
  },
  
  // Legal requirements
  legal: {
    termsAndConditionsUrl: undefined,
    privacyPolicyUrl: undefined,
  },
}; 
