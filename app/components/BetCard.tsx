'use client';

import { Bet } from '../types';
import { UserAvatar } from './UserAvatar';
import { Clock, DollarSign, Users } from 'lucide-react';
import { cn } from '../utils/cn';

interface BetCardProps {
  bet: Bet;
  variant?: 'active' | 'settled' | 'create';
  className?: string;
  onSettle?: (betId: string, winningParticipantId: string) => void;
}

const statusColors = {
  open: 'bg-green-500/20 text-green-400',
  in_progress: 'bg-yellow-500/20 text-yellow-400',
  settled: 'bg-blue-500/20 text-blue-400',
  canceled: 'bg-red-500/20 text-red-400',
};

export function BetCard({ bet, variant = 'active', className, onSettle }: BetCardProps) {
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className={cn('card animate-fade-in', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <UserAvatar username="Creator" size="small" />
          <span className="text-sm font-medium">Creator</span>
          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[bet.status])}>
            {bet.status.replace('_', ' ')}
          </span>
        </div>
        <div className="text-xs text-white/60 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {formatTimeAgo(bet.creationTimestamp)}
        </div>
      </div>

      <h3 className="font-semibold mb-2 text-white">{bet.description}</h3>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-white/80">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>${bet.stakeAmount} USDC</span>
          </div>
          <div className="flex items-center text-white/80">
            <Users className="w-4 h-4 mr-1" />
            <span>{bet.participants.length}</span>
          </div>
        </div>
        
        {variant === 'active' && bet.status === 'in_progress' && onSettle && (
          <button 
            onClick={() => onSettle(bet.betId, bet.participants[0])}
            className="btn-primary text-xs px-3 py-1"
          >
            Settle
          </button>
        )}
        
        {variant === 'settled' && bet.winningParticipantId && (
          <div className="text-green-400 text-xs font-medium">
            Winner: {bet.winningParticipantId}
          </div>
        )}
      </div>
    </div>
  );
}
