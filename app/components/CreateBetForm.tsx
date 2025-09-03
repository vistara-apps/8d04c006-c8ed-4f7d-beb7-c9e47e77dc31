'use client';

import { useState } from 'react';
import { Bet } from '../types';
import { X, DollarSign, Users, FileText } from 'lucide-react';

interface CreateBetFormProps {
  onClose: () => void;
  onSubmit: (betData: Omit<Bet, 'betId' | 'creationTimestamp' | 'status'>) => Promise<void>;
}

export function CreateBetForm({ onClose, onSubmit }: CreateBetFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    outcome: '',
    stakeAmount: '',
    participants: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.stakeAmount) return;

    setLoading(true);
    try {
      await onSubmit({
        creatorId: 'current-user', // Would come from auth context
        participants: ['current-user', ...formData.participants.split(',').map(p => p.trim()).filter(Boolean)],
        description: formData.description,
        outcome: formData.outcome || 'TBD',
        stakeAmount: parseFloat(formData.stakeAmount),
      });
      onClose();
    } catch (error) {
      console.error('Failed to create bet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create New Bet</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              <FileText className="w-4 h-4 inline mr-1" />
              Bet Description
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g., Lakers vs Warriors - Lakers to win"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Stake Amount (USDC)
            </label>
            <input
              type="number"
              className="input w-full"
              placeholder="50"
              min="1"
              step="0.01"
              value={formData.stakeAmount}
              onChange={(e) => setFormData({ ...formData, stakeAmount: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <Users className="w-4 h-4 inline mr-1" />
              Participants (comma-separated usernames)
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="friend1, friend2"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={loading || !formData.description || !formData.stakeAmount}
            >
              {loading ? 'Creating...' : 'Create Bet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
