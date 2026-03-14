'use client';

import { ShieldAlert, Search, Filter, AlertOctagon, CheckCircle2, AlertTriangle, Eye, Activity, Play, Square } from 'lucide-react';
import { useState, useEffect } from 'react';

const initialTransactions = [
  { id: 'TX-9823', user: 'USR-4421', amount: 'Rp 45,000,000', type: 'Transfer', score: 98, anomaly: 95, status: 'Blocked', time: '10:42:05', reason: 'Isolation Forest: Anomaly Detected. XGBoost: High probability of Account Takeover.' },
  { id: 'TX-9822', user: 'USR-1192', amount: 'Rp 12,500,000', type: 'Payment', score: 85, anomaly: 88, status: 'Review', time: '10:41:12', reason: 'Impossible travel detected (Jakarta -> Moscow in 2 hours).' },
  { id: 'TX-9821', user: 'USR-8834', amount: 'Rp 2,000,000', type: 'Transfer', score: 92, anomaly: 90, status: 'Blocked', time: '10:35:55', reason: 'Rapid micro-transactions pattern matching known fraud ring.' },
  { id: 'TX-9820', user: 'USR-0021', amount: 'Rp 150,000,000', type: 'Transfer', score: 99, anomaly: 98, status: 'Blocked', time: '09:15:22', reason: 'Transaction to blacklisted account. Device fingerprint mismatch.' },
  { id: 'TX-9819', user: 'USR-5541', amount: 'Rp 500,000', type: 'Payment', score: 12, anomaly: 5, status: 'Passed', time: '09:10:01', reason: 'Normal behavior pattern.' },
  { id: 'TX-9818', user: 'USR-7762', amount: 'Rp 3,500,000', type: 'Transfer', score: 45, anomaly: 30, status: 'Passed', time: '08:45:33', reason: 'Slight deviation in amount, but device and location are trusted.' },
];

const generateRandomTransaction = () => {
  const id = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
  const user = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
  const amount = `Rp ${(Math.floor(1 + Math.random() * 100) * 50000).toLocaleString()}`;
  const isFraud = Math.random() > 0.8;
  const score = isFraud ? Math.floor(75 + Math.random() * 25) : Math.floor(5 + Math.random() * 40);
  const anomaly = isFraud ? Math.floor(80 + Math.random() * 20) : Math.floor(2 + Math.random() * 30);
  const status = score > 90 ? 'Blocked' : score > 70 ? 'Review' : 'Passed';
  const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
  
  let reason = 'Normal behavior pattern.';
  if (isFraud) {
    const reasons = [
      'Isolation Forest: High deviation from user\'s usual spending time.',
      'XGBoost: Device fingerprint anomaly detected.',
      'Rapid micro-transactions detected from new IP.',
      'Location anomaly: IP address does not match GPS coordinates.',
      'Velocity check failed: 5th transaction in 2 minutes.'
    ];
    reason = reasons[Math.floor(Math.random() * reasons.length)];
  }

  return { id, user, amount, type: Math.random() > 0.5 ? 'Transfer' : 'Payment', score, anomaly, status, time, reason, isNew: true };
};

export default function FraudMonitoring() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setTransactions(prev => {
          const newTx = generateRandomTransaction();
          // Keep only the last 15 transactions to prevent memory issues
          const updated = [newTx, ...prev].slice(0, 15);
          // Remove 'isNew' flag after a short delay for animation
          setTimeout(() => {
            setTransactions(current => 
              current.map(tx => tx.id === newTx.id ? { ...tx, isNew: false } : tx)
            );
          }, 2000);
          return updated;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-red-500" />
            Fraud Detection Engine
          </h1>
          <p className="text-zinc-400 mt-1">Real-time transaction monitoring and Explainable AI insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {isLive ? (
              <>
                <Square className="h-4 w-4 fill-current" /> Stop Live Feed
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" /> Start Live Feed
              </>
            )}
          </button>
          <button className="flex items-center gap-2 rounded-md bg-zinc-900 border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Live Transactions</p>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                124/s
                {isLive && <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertOctagon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Blocked (24h)</p>
              <h3 className="text-2xl font-bold text-white">1,284</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Under Review</p>
              <h3 className="text-2xl font-bold text-white">342</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Safe Transactions</p>
              <h3 className="text-2xl font-bold text-white">8.2M</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by TX ID, User ID..."
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 py-2 pl-9 pr-4 text-sm text-zinc-300 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
          {isLive && (
            <div className="text-xs font-medium text-blue-400 flex items-center gap-2 animate-pulse">
              <Activity className="h-4 w-4" />
              Monitoring Live Stream...
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Anomaly Score</th>
                <th className="px-6 py-4 font-medium">Risk Score</th>
                <th className="px-6 py-4 font-medium">XAI Reason (Explainable AI)</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {transactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  className={`group transition-all duration-500 ${
                    tx.isNew ? 'bg-blue-500/10' : 'hover:bg-zinc-800/20'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-mono text-zinc-300 flex items-center gap-2">
                      {tx.id}
                      {tx.isNew && <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">New</span>}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{tx.time} • {tx.type}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-400">{tx.user}</td>
                  <td className="px-6 py-4 font-medium text-zinc-300">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${tx.anomaly > 80 ? 'bg-red-500' : tx.anomaly > 40 ? 'bg-orange-500' : 'bg-blue-500'}`}
                          style={{ width: `${tx.anomaly}%` }}
                        />
                      </div>
                      <span className={`font-mono text-xs ${tx.anomaly > 80 ? 'text-red-400' : tx.anomaly > 40 ? 'text-orange-400' : 'text-blue-400'}`}>
                        {tx.anomaly}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${tx.score > 80 ? 'bg-red-500' : tx.score > 40 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                          style={{ width: `${tx.score}%` }}
                        />
                      </div>
                      <span className={`font-mono text-xs ${tx.score > 80 ? 'text-red-400' : tx.score > 40 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                        {tx.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-zinc-400 max-w-xs truncate group-hover:whitespace-normal group-hover:break-words transition-all duration-200">
                      {tx.reason}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
