'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, ShieldAlert, BarChart3, Database, Home, Settings, LogOut, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Fraud Monitoring', href: '/fraud', icon: ShieldAlert },
  { name: 'Macroeconomic', href: '/macro', icon: BarChart3 },
  { name: 'Feature Engine', href: '/features', icon: Database },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-zinc-950 border-r border-zinc-800 text-zinc-300">
      <div className="flex h-16 items-center px-6 border-b border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <Activity className="h-6 w-6 text-emerald-500" />
          <span>Garuda-AI</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-zinc-800 text-white'
                    : 'hover:bg-zinc-800/50 hover:text-white'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive ? 'text-emerald-500' : 'text-zinc-500')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-800/50 hover:text-white cursor-pointer transition-colors">
          <Settings className="h-5 w-5 text-zinc-500" />
          Settings
        </div>
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-800/50 hover:text-white cursor-pointer transition-colors text-red-400 hover:text-red-300">
          <LogOut className="h-5 w-5" />
          Logout
        </div>
      </div>
    </div>
  );
}
