import React, { useState } from 'react';
import { GameServerInfo } from '../../types';
import { useGameContext } from '../../contexts/GameContext';
import { MenuScreenProps } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
    const [nickname, setNickname] = useState('');
    const { setSelectedServer } = useGameContext();
    const { isLoading } = useAuth();

    const handlePlayClick = () => {
        // LOCAL PATCH: no login, no wallet, no payment. Just play.
        const freeServer = {
            type: 'FREE',
            name: 'Free Server',
        } as unknown as GameServerInfo;

        setSelectedServer(freeServer);
        onStartGame(nickname.trim() || 'Player');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handlePlayClick();
    };

    const canPlay = nickname.trim().length > 0;

    if (isLoading) {
        return (
            <div className="screen">
                <div className="menu-container">
                    <h1 className="game-title">slither.io</h1>
                    <p className="game-subtitle">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="screen">
            <div className="menu-container">
                <h1 className="game-title">slither.io</h1>
                <p className="game-subtitle">Don't run into other players!</p>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter your nickname"
                        maxLength={20}
                        autoComplete="off"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        autoFocus
                        className="nickname-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && canPlay) {
                                handlePlayClick();
                            }
                        }}
                    />

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!canPlay}
                        className={`play-button ${!canPlay ? 'disabled' : ''}`}
                    >
                        Play Game
                    </button>
                </div>
            </div>
        </div>
    );
};
