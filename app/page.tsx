'use client';

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { BetFeed } from './components/BetFeed';
import { ActiveBets } from './components/ActiveBets';
import { Dashboard } from './components/Dashboard';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { Settings, Search, Bell } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('feed');
  const { address, isConnected } = useAccount();

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <BetFeed />;
      case 'create':
        return <BetFeed />; // Create form is handled within BetFeed
      case 'active':
        return <ActiveBets />;
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-white/60">Coming soon...</p>
          </div>
        );
      default:
        return <BetFeed />;
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Welcome to PuntPal</h1>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Your friends, your bets, on-chain. Connect your wallet to start betting smarter, together.
          </p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Search bets, friends..."
                  className="input pl-10 pr-4 py-2 w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-white/60 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <Identity address={address}>{address}</Identity>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
