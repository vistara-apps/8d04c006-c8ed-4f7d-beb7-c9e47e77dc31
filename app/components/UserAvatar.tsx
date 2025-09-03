'use client';

import { cn } from '../utils/cn';

interface UserAvatarProps {
  src?: string;
  username?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: 'w-8 h-8 text-sm',
  medium: 'w-10 h-10 text-base',
  large: 'w-16 h-16 text-xl',
};

export function UserAvatar({ src, username, size = 'medium', className }: UserAvatarProps) {
  const initials = username ? username.slice(0, 2).toUpperCase() : '??';
  
  return (
    <div className={cn(
      'rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center font-semibold text-white',
      sizeMap[size],
      className
    )}>
      {src ? (
        <img src={src} alt={username} className="w-full h-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
