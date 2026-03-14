import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Garuda-AI | Risk Intelligence Platform',
  description: 'AI Risk Intelligence Platform untuk Stabilitas Sistem Keuangan Indonesia',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-emerald-500/30" suppressHydrationWarning>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
