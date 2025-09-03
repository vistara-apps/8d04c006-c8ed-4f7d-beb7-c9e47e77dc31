'use client';

import { useBets } from '../hooks/useBets';
import { BetCard } from './BetCard';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Trophy, Users } from 'lucide-react';

export function Dashboard() {
  const { bets, loading, error } = useBets();

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

  const settledBets = bets.filter(bet => bet.status === 'settled');
  const activeBets = bets.filter(bet => bet.status !== 'settled' && bet.status !== 'canceled');
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stakeAmount, 0);
  const wonBets = settledBets.filter(bet => bet.winningParticipantId === 'current-user');
  const winRate = settledBets.length > 0 ? (wonBets.length / settledBets.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center">
          <BarChart3 className="w-8 h-8 mr-3" />
          Dashboard
        </h1>
        <p className="text-white/70 mt-1">Your betting analytics and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Win Rate</p>
              <p className="text-2xl font-bold">{winRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Total Staked</p>
              <p className="text-2xl font-bold">${totalStaked}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Bets Won</p>
              <p className="text-2xl font-bold">{wonBets.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Active Bets</p>
              <p className="text-2xl font-bold">{activeBets.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="h-48 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-white/30 mx-auto mb-2" />
            <p className="text-white/60">Chart visualization coming soon</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {bets.slice(0, 3).map((bet) => (
            <BetCard
              key={bet.betId}
              bet={bet}
              variant={bet.status === 'settled' ? 'settled' : 'active'}
            />
          ))}
        </div>
      </div>

      {/* Leaderboard Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Friend Leaderboard</h3>
        <div className="space-y-3">
          {['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'].map((name, index) => (
            <div key={name} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-white/60">#{index + 1}</span>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
                  {name[0]}
                </div>
                <span className="font-medium">{name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{Math.floor(Math.random() * 100)}%</div>
                <div className="text-xs text-white/60">{Math.floor(Math.random() * 20)} bets</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
