'use client';

import { useState } from 'react';
import { BetCard } from './BetCard';
import { CreateBetForm } from './CreateBetForm';
import { useBets } from '../hooks/useBets';
import { Plus, TrendingUp, Users, DollarSign } from 'lucide-react';

export function BetFeed() {
  const { bets, loading, error, createBet, settleBet } = useBets();
  const [showCreateForm, setShowCreateForm] = useState(false);

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
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stakeAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Real-time Bet Feed</h1>
          <p className="text-white/70 mt-1">Stay updated with your friends' latest bets</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Bet</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Active Bets</p>
              <p className="text-xl font-semibold">{activeBets.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Total Staked</p>
              <p className="text-xl font-semibold">${totalStaked} USDC</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-white/70">Participants</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Bet CTA */}
      <div className="card text-center py-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <h3 className="text-lg font-semibold mb-2">Ready to make a bet?</h3>
        <p className="text-white/70 mb-4">Create custom bets and invite your friends to participate</p>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary"
        >
          Create Your First Bet
        </button>
      </div>

      {/* Bet List */}
      <div className="space-y-4">
        {bets.map((bet) => (
          <BetCard
            key={bet.betId}
            bet={bet}
            variant={bet.status === 'settled' ? 'settled' : 'active'}
            onSettle={settleBet}
          />
        ))}
        
        {bets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No bets yet. Be the first to create one!</p>
          </div>
        )}
      </div>

      {/* Create Bet Modal */}
      {showCreateForm && (
        <CreateBetForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={createBet}
        />
      )}
    </div>
  );
}
