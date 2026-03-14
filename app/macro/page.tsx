'use client';

import { BarChart3, TrendingUp, AlertCircle, Map, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { IndonesiaMap } from '@/components/indonesia-map';

const inflationData = [
  { month: 'Jan', actual: 2.1, predicted: 2.15, stress: 12 },
  { month: 'Feb', actual: 2.3, predicted: 2.28, stress: 15 },
  { month: 'Mar', actual: 2.5, predicted: 2.55, stress: 18 },
  { month: 'Apr', actual: 2.8, predicted: 2.75, stress: 24 },
  { month: 'May', actual: 3.1, predicted: 3.05, stress: 35 },
  { month: 'Jun', actual: 3.4, predicted: 3.42, stress: 42 },
  { month: 'Jul', actual: null, predicted: 3.6, stress: 48 },
  { month: 'Aug', actual: null, predicted: 3.8, stress: 55 },
];

const regionalStress = [
  { region: 'Jakarta', score: 45, trend: 'up' },
  { region: 'Jawa Barat', score: 38, trend: 'up' },
  { region: 'Jawa Timur', score: 32, trend: 'stable' },
  { region: 'Sumatera Utara', score: 28, trend: 'down' },
  { region: 'Bali', score: 22, trend: 'stable' },
];

export default function Macroeconomic() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-orange-500" />
            Economic Early Warning System
          </h1>
          <p className="text-zinc-400 mt-1">Menganalisis indikator ekonomi untuk mendeteksi potensi tekanan ekonomi.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Predicted Inflation (Q3)</p>
              <h3 className="text-2xl font-bold text-white">3.8%</h3>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Based on LSTM Time Series & Transaction Velocity</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">National Stress Index</p>
              <h3 className="text-2xl font-bold text-white">42.5 / 100</h3>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Moderate risk. Driven by commodity price volatility.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <LineChartIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Cash-out Anomaly</p>
              <h3 className="text-2xl font-bold text-white">+14.2%</h3>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Sudden increase in cash-out activity in West Java.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <IndonesiaMap />
        </div>

        <div className="col-span-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Map className="h-5 w-5 text-zinc-400" />
              Regional Stress Index
            </h3>
            <p className="text-sm text-zinc-400">Top 5 highest risk regions</p>
          </div>
          <div className="space-y-4 mt-6">
            {regionalStress.map((region, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800/50">
                <div>
                  <p className="font-medium text-zinc-200">{region.region}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${region.score > 40 ? 'bg-red-500' : region.score > 30 ? 'bg-orange-500' : 'bg-yellow-500'}`}
                        style={{ width: `${region.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500">{region.score}/100</span>
                  </div>
                </div>
                <div className={`p-1.5 rounded-md ${region.trend === 'up' ? 'bg-red-500/10 text-red-500' : region.trend === 'down' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                  {region.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : region.trend === 'down' ? <TrendingUp className="h-4 w-4 transform rotate-180" /> : <div className="h-4 w-4 flex items-center justify-center">-</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Inflation Trend & Prediction</h3>
            <p className="text-sm text-zinc-400">Actual vs LSTM Predicted Inflation Rate</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inflationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
                <Line type="monotone" dataKey="actual" name="Actual Inflation (%)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="predicted" name="Predicted Inflation (%)" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
