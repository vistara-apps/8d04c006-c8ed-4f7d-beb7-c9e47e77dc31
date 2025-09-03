'use client';

import { useState, useEffect } from 'react';
import { Bet } from '../types';

// Mock data for demonstration
const mockBets: Bet[] = [
  {
    betId: '1',
    creatorId: 'user1',
    participants: ['user1', 'user2'],
    description: 'Lakers vs Warriors - Lakers to win',
    outcome: 'Lakers win',
    stakeAmount: 50,
    status: 'in_progress',
    creationTimestamp: Date.now() - 86400000, // 1 day ago
  },
  {
    betId: '2',
    creatorId: 'user2',
    participants: ['user2', 'user3'],
    description: 'Bitcoin to reach $100k by end of year',
    outcome: 'BTC reaches $100k',
    stakeAmount: 25,
    status: 'open',
    creationTimestamp: Date.now() - 43200000, // 12 hours ago
  },
  {
    betId: '3',
    creatorId: 'user3',
    participants: ['user3', 'user1'],
    description: 'Chiefs vs Bills - Under 47.5 total points',
    outcome: 'Under 47.5 points',
    stakeAmount: 100,
    status: 'settled',
    creationTimestamp: Date.now() - 172800000, // 2 days ago
    settlementTimestamp: Date.now() - 86400000,
    winningParticipantId: 'user3',
  },
];

export function useBets() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchBets = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBets(mockBets);
      } catch (err) {
        setError('Failed to fetch bets');
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  const createBet = async (betData: Omit<Bet, 'betId' | 'creationTimestamp' | 'status'>) => {
    try {
      const newBet: Bet = {
        ...betData,
        betId: Math.random().toString(36).substr(2, 9),
        creationTimestamp: Date.now(),
        status: 'open',
      };
      setBets(prev => [newBet, ...prev]);
      return newBet;
    } catch (err) {
      throw new Error('Failed to create bet');
    }
  };

  const settleBet = async (betId: string, winningParticipantId: string) => {
    setBets(prev => prev.map(bet => 
      bet.betId === betId 
        ? { ...bet, status: 'settled' as const, winningParticipantId, settlementTimestamp: Date.now() }
        : bet
    ));
  };

  return {
    bets,
    loading,
    error,
    createBet,
    settleBet,
  };
}
