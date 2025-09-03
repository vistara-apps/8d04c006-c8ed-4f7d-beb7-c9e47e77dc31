'use client';

import { BetCard } from './BetCard';
import { useBets } from '../hooks/useBets';
import { Trophy, Clock } from 'lucide-react';

export function ActiveBets() {
  const { bets, loading, error, settleBet } = useBets();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const activeBets = bets.filter(bet => bet.status === 'open' || bet.status === 'in_progress');
  const openBets = activeBets.filter(bet => bet.status === 'open');
  const inProgressBets = activeBets.filter(bet => bet.status === 'in_progress');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Active Bets</h1>
        <p className="text-white/70 mt-1">Track your ongoing and open bets</p>
      </div>

      {/* Open Bets */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-green-400" />
          Open Bets ({openBets.length})
        </h2>
        <div className="space-y-4">
          {openBets.map((bet) => (
            <BetCard
              key={bet.betId}
              bet={bet}
              variant="active"
            />
          ))}
          {openBets.length === 0 && (
            <div className="card text-center py-8">
              <p className="text-white/60">No open bets</p>
            </div>
          )}
        </div>
      </div>

      {/* In Progress Bets */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          In Progress ({inProgressBets.length})
        </h2>
        <div className="space-y-4">
          {inProgressBets.map((bet) => (
            <BetCard
              key={bet.betId}
              bet={bet}
              variant="active"
              onSettle={settleBet}
            />
          ))}
          {inProgressBets.length === 0 && (
            <div className="card text-center py-8">
              <p className="text-white/60">No bets in progress</p>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {activeBets.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active bets</h3>
          <p className="text-white/60">Create a new bet to get started!</p>
        </div>
      )}
    </div>
  );
}
