'use client';

import { Database, Search, ChevronDown, ChevronRight, Activity, User, Smartphone, MapPin, Store, Network, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const featureGroups = [
  {
    id: 'tx-behavior',
    title: 'Transaction Behavior Features',
    count: 15,
    icon: Activity,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    features: [
      'Transaction frequency per hour', 'Transaction frequency per day', 'Transaction frequency per week',
      'Average transaction amount', 'Transaction amount deviation from average', 'Sudden spike in transaction amount',
      'Transaction velocity (jumlah transaksi dalam waktu singkat)', 'Time gap between transactions',
      'Repeated transaction to same recipient', 'First-time transaction to new recipient',
      'Night-time transaction activity', 'Transaction outside usual time pattern',
      'Consecutive failed transaction attempts', 'High-value transaction anomaly', 'Rapid micro-transactions pattern'
    ]
  },
  {
    id: 'user-behavior',
    title: 'User Behavioral Features',
    count: 10,
    icon: User,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    features: [
      'User account age', 'Login frequency change', 'Sudden profile information change',
      'Unusual login time', 'Sudden change in spending category', 'Device switching frequency',
      'Sudden increase in transfer volume', 'First transaction after long inactivity',
      'Behavioral similarity with known fraud patterns', 'User risk score history trend'
    ]
  },
  {
    id: 'device-intel',
    title: 'Device Intelligence Features',
    count: 10,
    icon: Smartphone,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    features: [
      'Device fingerprint uniqueness', 'New device detection', 'Multiple accounts on same device',
      'Emulator detection', 'Rooted / jailbroken device detection', 'Device OS mismatch anomaly',
      'Browser fingerprint anomaly', 'Device reputation score', 'Rapid device switching behavior',
      'Suspicious device cluster detection'
    ]
  },
  {
    id: 'location-network',
    title: 'Location & Network Features',
    count: 8,
    icon: MapPin,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    features: [
      'Geolocation anomaly detection', 'Sudden location change (impossible travel)',
      'High-risk country transaction', 'IP address reputation score', 'VPN / proxy detection',
      'Public WiFi usage anomaly', 'Multiple users using same IP', 'Rapid IP switching pattern'
    ]
  },
  {
    id: 'merchant-risk',
    title: 'Merchant & Counterparty Risk',
    count: 8,
    icon: Store,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    features: [
      'Merchant risk score', 'Transaction to newly created merchant', 'Merchant fraud history score',
      'Transaction to blacklisted account', 'Suspicious merchant category code', 'Merchant location anomaly',
      'Transaction concentration to one merchant', 'Unusual merchant-user interaction pattern'
    ]
  },
  {
    id: 'graph-network',
    title: 'Graph & Network Analysis Features',
    count: 7,
    icon: Network,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    features: [
      'Transaction network centrality score', 'Fraud ring detection score', 'Account-to-account clustering anomaly',
      'Shared device network detection', 'Shared phone/email network detection', 'Circular transaction pattern detection',
      'Rapid money movement chain detection'
    ]
  },
  {
    id: 'macro-risk',
    title: 'Macroeconomic & Systemic Risk Features',
    count: 7,
    icon: TrendingUp,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    features: [
      'Regional inflation trend score', 'Commodity price volatility indicator', 'Regional economic stress index',
      'Transaction volume anomaly vs regional economy', 'Sudden increase in cash-out activity',
      'Regional digital payment volatility', 'Economic anomaly correlation score'
    ]
  }
];

export default function FeatureEngine() {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'tx-behavior': true,
    'macro-risk': true
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Database className="h-8 w-8 text-indigo-500" />
            65 Analytical Features
          </h1>
          <p className="text-zinc-400 mt-1">The core intelligence engine powering Garuda-AI&apos;s hybrid detection models.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search features..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-4 text-sm text-zinc-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {featureGroups.map((group) => {
          const isExpanded = expandedGroups[group.id];
          const Icon = group.icon;
          
          return (
            <div key={group.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-200">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg border ${group.bg} ${group.border}`}>
                    <Icon className={`h-5 w-5 ${group.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-white">{group.title}</h3>
                    <p className="text-sm text-zinc-500">{group.count} features</p>
                  </div>
                </div>
                <div className="text-zinc-500">
                  {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-zinc-800/50 bg-zinc-950/30">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {group.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 rounded-md bg-zinc-900 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                        <div className={`mt-1 h-1.5 w-1.5 rounded-full ${group.bg.replace('/10', '')} flex-shrink-0`} />
                        <span className="text-sm text-zinc-300 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
