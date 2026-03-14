'use client';

import { Activity, AlertTriangle, ArrowUpRight, ArrowDownRight, TrendingUp, ShieldAlert, DollarSign, ActivitySquare } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { XAIExplanation } from '@/components/xai-card';

const data = [
  { time: '00:00', volume: 4000, fraud: 24 },
  { time: '04:00', volume: 3000, fraud: 13 },
  { time: '08:00', volume: 2000, fraud: 98 },
  { time: '12:00', volume: 2780, fraud: 39 },
  { time: '16:00', volume: 1890, fraud: 48 },
  { time: '20:00', volume: 2390, fraud: 38 },
  { time: '24:00', volume: 3490, fraud: 43 },
];

const inflationData = [
  { month: 'Jan', rate: 2.1 },
  { month: 'Feb', rate: 2.3 },
  { month: 'Mar', rate: 2.5 },
  { month: 'Apr', rate: 2.8 },
  { month: 'May', rate: 3.1 },
  { month: 'Jun', rate: 3.4 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">National Risk Dashboard</h1>
        <p className="text-zinc-400 mt-1">Real-time overview of Indonesia&apos;s financial system stability.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Systemic Risk Score</h3>
            <ActivitySquare className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">42.8</span>
            <span className="text-sm text-emerald-500 flex items-center"><ArrowDownRight className="h-3 w-3 mr-1"/> -2.1</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Stable condition (Scale 0-100)</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Fraud Detected (24h)</h3>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">1,284</span>
            <span className="text-sm text-red-500 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +12.5%</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Rp 4.2B prevented loss</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Transaction Volume</h3>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">8.4M</span>
            <span className="text-sm text-emerald-500 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +4.1%</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Transactions per hour</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">Inflation Prediction</h3>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">3.4%</span>
            <span className="text-sm text-orange-500 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1"/> +0.3%</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Forecast for next quarter</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Transaction & Fraud Heatmap</h3>
            <p className="text-sm text-zinc-400">Real-time volume vs detected anomalies</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVolume)" />
                <Area type="monotone" dataKey="fraud" stroke="#ef4444" fillOpacity={1} fill="url(#colorFraud)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Regional Economic Stress</h3>
            <p className="text-sm text-zinc-400">LSTM Time Series Prediction</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inflationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="rate" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <XAIExplanation />

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="border-b border-zinc-800 p-6">
          <h3 className="text-lg font-medium text-white">Recent High-Risk Alerts</h3>
          <p className="text-sm text-zinc-400">Transactions blocked by Fraud Detection Engine</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3 font-medium">Tx ID</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Risk Score</th>
                <th className="px-6 py-3 font-medium">Triggered Features</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { id: 'TX-9823', time: 'Just now', amount: 'Rp 45,000,000', score: 98, features: 'Sudden spike, New device', status: 'Blocked' },
                { id: 'TX-9822', time: '2 mins ago', amount: 'Rp 12,500,000', score: 85, features: 'Impossible travel, VPN', status: 'Investigating' },
                { id: 'TX-9821', time: '15 mins ago', amount: 'Rp 2,000,000', score: 92, features: 'Rapid micro-tx, Circular', status: 'Blocked' },
                { id: 'TX-9820', time: '1 hour ago', amount: 'Rp 150,000,000', score: 99, features: 'Fraud ring, Blacklisted', status: 'Blocked' },
              ].map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-zinc-300">{tx.id}</td>
                  <td className="px-6 py-4 text-zinc-400">{tx.time}</td>
                  <td className="px-6 py-4 text-zinc-300">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tx.score > 90 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                      {tx.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{tx.features}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tx.status === 'Blocked' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                      {tx.status}
                    </span>
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
