export interface User {
  userId: string; // Farcaster FID
  username: string;
  walletAddress: string;
  profilePictureUrl: string;
  friendsList: string[];
}

export interface Bet {
  betId: string;
  creatorId: string;
  participants: string[];
  description: string;
  outcome: string;
  stakeAmount: number; // USDC
  status: 'open' | 'in_progress' | 'settled' | 'canceled';
  creationTimestamp: number;
  settlementTimestamp?: number;
  winningParticipantId?: string;
}

export interface Outcome {
  outcomeId: string;
  betId: string;
  description: string;
  isWinningOutcome: boolean;
}

export type BetStatus = 'open' | 'in_progress' | 'settled' | 'canceled';
