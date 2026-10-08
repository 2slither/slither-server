import React, { useState } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { MenuScreen } from './components/screens/MenuScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ErrorScreen } from './components/screens/ErrorScreen';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

type AppState = 'menu' | 'game' | 'error';

interface ErrorState {
    message: string;
}

export const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('menu');
    const [nickname, setNickname] = useState<string>('');
    const [error, setError] = useState<ErrorState | null>(null);

    const handleStartGame = (playerNickname: string) => {
        setNickname(playerNickname);
        setAppState('game');
        setError(null);
    };

    const handleGameEnd = () => {
        setAppState('menu');
        setNickname('');
        setError(null);
    };

    const handleError = (errorMessage: string) => {
        setError({ message: errorMessage });
        setAppState('error');
    };

    const handleRetry = () => {
        setError(null);
        setAppState('menu');
    };

    const appId = (import.meta as any).env?.VITE_PRIVY_APP_ID;

    if (!appId) {
        return (
            <div className="app">
                <ErrorScreen
                    message="Missing Privy App ID. Please check your environment configuration."
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    return (
        <PrivyProvider
            appId={appId}
            config={{
                appearance: {
                    theme: 'dark',
                    accentColor: '#676FFF',
                },
                loginMethods: ['email', 'wallet'],
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                },
                // ---- Solana RPC config ----
                // This is what was missing. Privy needs to know where to
                // reach Solana's RPC endpoints, otherwise the SDK crashes
                // trying to read `endpoints` off of undefined.
                solana: {
                    rpcs: {
                        'solana:mainnet': {
                            rpc: 'https://api.mainnet-beta.solana.com',
                        },
                        'solana:devnet': {
                            rpc: 'https://api.devnet.solana.com',
                        },
                    },
                },
            }}
        >
            <AuthProvider>
                <GameProvider>
                    <div className="app">
                        {appState === 'menu' && (
                            <MenuScreen onStartGame={handleStartGame} />
                        )}

                        {appState === 'game' && (
                            <GameScreen
                                nickname={nickname}
                                onGameEnd={handleGameEnd}
                            />
                        )}

                        {appState === 'error' && error && (
                            <ErrorScreen
                                message={error.message}
                                onRetry={handleRetry}
                            />
                        )}
                    </div>
                </GameProvider>
            </AuthProvider>
        </PrivyProvider>
    );
};
