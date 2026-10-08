import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AppLayoutShell } from '@/components/common/AppLayoutShell';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CampusOS — City University Hub',
  description:
    'Autonomous Student Life & Academic Infrastructure Hub for City University. Events, Academic Vault, Smart Helpdesk, and Grievance Governance.',
  keywords: [
    'City University',
    'CampusOS',
    'Student Portal',
    'Events',
    'Notes',
    'Helpdesk',
    'Grievance',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-zinc-50/50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100`}>
        <AuthProvider>
          <AppLayoutShell>{children}</AppLayoutShell>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
