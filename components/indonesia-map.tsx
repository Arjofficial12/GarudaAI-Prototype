'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

const generateSparklineData = (trend: 'up' | 'down' | 'stable') => {
  let base = 50;
  return Array.from({ length: 10 }).map((_, i) => {
    if (trend === 'up') base += Math.random() * 10;
    if (trend === 'down') base -= Math.random() * 10;
    if (trend === 'stable') base += (Math.random() * 10 - 5);
    return { value: base };
  });
};

const regions = [
  { id: 'sumatra', name: 'Sumatra', path: 'M 10,40 L 30,20 L 60,40 L 80,70 L 50,90 L 20,60 Z', color: '#1e3a8a', trend: 'up', cx: 45, cy: 55 },
  { id: 'java', name: 'Java', path: 'M 70,100 L 120,100 L 140,110 L 80,115 Z', color: '#ea580c', trend: 'up', cx: 105, cy: 105 },
  { id: 'kalimantan', name: 'Kalimantan', path: 'M 80,20 L 120,10 L 150,40 L 130,70 L 90,60 Z', color: '#9ca3af', trend: 'stable', cx: 115, cy: 40 },
  { id: 'sulawesi', name: 'Sulawesi', path: 'M 160,30 L 180,20 L 190,50 L 210,60 L 190,80 L 170,70 L 160,50 Z', color: '#1e3a8a', trend: 'up', cx: 185, cy: 50 },
  { id: 'papua', name: 'Papua', path: 'M 230,50 L 280,40 L 320,60 L 330,90 L 270,100 L 240,80 Z', color: '#9ca3af', trend: 'stable', cx: 280, cy: 70 },
  { id: 'bali-nusa', name: 'Bali & Nusa Tenggara', path: 'M 150,110 L 180,110 L 190,115 L 145,115 Z', color: '#ea580c', trend: 'up', cx: 165, cy: 112 },
  { id: 'maluku', name: 'Maluku', path: 'M 215,45 L 225,45 L 220,60 L 210,60 Z', color: '#1e3a8a', trend: 'up', cx: 218, cy: 52 },
];

export function IndonesiaMap() {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-zinc-950/50 rounded-xl border border-zinc-800 p-6 overflow-hidden flex flex-col">
      <div className="flex justify-between items-start mb-4 z-10">
        <div>
          <h3 className="text-lg font-bold text-white">Regional Economic Indicators</h3>
          <p className="text-sm text-zinc-400">Monetary Stability Outlook</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-blue-900"></span> Low Risk
          <span className="w-2 h-2 rounded-full bg-orange-600 ml-2"></span> High Risk
        </div>
      </div>

      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {/* SVG Map */}
        <svg 
          viewBox="0 0 350 150" 
          className="w-full h-full max-h-[400px] drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="grad-high" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
            <linearGradient id="grad-low" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <linearGradient id="grad-stable" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
          </defs>

          {regions.map((region) => (
            <g key={region.id} className="group cursor-pointer transition-all duration-300 hover:opacity-80">
              <path 
                d={region.path} 
                fill={
                  region.color === '#ea580c' ? 'url(#grad-high)' : 
                  region.color === '#1e3a8a' ? 'url(#grad-low)' : 
                  'url(#grad-stable)'
                }
                stroke="#27272a"
                strokeWidth="1"
                className="transition-all duration-300 group-hover:stroke-zinc-400"
              />
            </g>
          ))}
        </svg>

        {/* Overlay Mini Charts */}
        {regions.filter(r => r.trend === 'up').map((region) => (
          <div 
            key={`chart-${region.id}`}
            className="absolute bg-zinc-900/90 border border-zinc-700 rounded shadow-xl p-1 pointer-events-none transition-transform duration-300 hover:scale-110"
            style={{ 
              left: `${(region.cx / 350) * 100}%`, 
              top: `${(region.cy / 150) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '40px'
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateSparklineData(region.trend)}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
