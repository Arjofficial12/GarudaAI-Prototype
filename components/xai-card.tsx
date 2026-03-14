'use client';

import { BrainCircuit, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const xaiData = [
  { name: 'Base Rate', value: 2.5, type: 'base', explanation: 'Historical baseline inflation rate' },
  { name: 'Commodity Volatility', value: 0.6, type: 'positive', explanation: 'High volatility in essential food prices (+0.6%)' },
  { name: 'Cash-out Anomaly', value: 0.4, type: 'positive', explanation: 'Sudden spike in digital cash-outs in West Java (+0.4%)' },
  { name: 'Tx Velocity', value: -0.1, type: 'negative', explanation: 'Slight slowdown in retail transaction velocity (-0.1%)' },
  { name: 'Predicted', value: 3.4, type: 'total', explanation: 'Final LSTM predicted inflation rate' },
];

export function XAIExplanation() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-indigo-500" />
            Explainable AI (XAI) Insights
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Understanding the factors driving the 3.4% Q3 Inflation Prediction
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
          <Info className="h-4 w-4" />
          Model: LSTM + SHAP Values
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={xaiData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} domain={[0, 4]} />
              <Tooltip
                cursor={{ fill: '#27272a', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}%`, 'Contribution']}
              />
              <ReferenceLine y={2.5} stroke="#52525b" strokeDasharray="3 3" />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {xaiData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.type === 'base' ? '#3f3f46' : 
                      entry.type === 'positive' ? '#ef4444' : 
                      entry.type === 'negative' ? '#10b981' : 
                      '#f97316'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-zinc-300 mb-4">Key Driving Factors</h4>
          {xaiData.filter(d => d.type === 'positive' || d.type === 'negative').map((factor, idx) => (
            <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-zinc-950 border border-zinc-800/50">
              <div className={`mt-0.5 p-1 rounded-md ${factor.type === 'positive' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {factor.type === 'positive' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">{factor.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{factor.explanation}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-xs text-indigo-300 leading-relaxed">
              <strong>Regulator Action:</strong> The AI suggests monitoring West Java&apos;s cash-out velocity closely, as it strongly correlates with localized inflation spikes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
