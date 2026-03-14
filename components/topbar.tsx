'use client';

import { Bell, Search, User } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 text-zinc-300">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search transactions, users..."
            className="h-9 w-64 rounded-md border border-zinc-800 bg-zinc-900 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-zinc-800 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
            <User className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-sm font-medium hidden sm:block">
            <p className="text-zinc-200">Regulator Admin</p>
            <p className="text-xs text-zinc-500">Bank Indonesia</p>
          </div>
        </div>
      </div>
    </header>
  );
}
