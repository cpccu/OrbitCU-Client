'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarDays, BookOpen, HelpCircle, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModuleShowcaseGridProps {
  onGateTrigger?: (actionTitle: string, redirectUrl?: string) => void;
}

export const ModuleShowcaseGrid: React.FC<ModuleShowcaseGridProps> = ({ onGateTrigger }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      {/* Card 1: Club & Event Engine */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <h3 className="text-lg font-black text-zinc-950 dark:text-white">
              Club & Event Engine
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            All 10+ campus clubs unified in one verified calendar. Check contest dates, sports meets, and reserve seats.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/events" className="block w-full">
            <Button
              variant="outline"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Browse 12 Upcoming Events</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Card 2: Academic Vault (Gated with Dashed Red Border & STUDENTS ONLY badge) */}
      <div className="bg-white dark:bg-zinc-900 border-2 border-dashed border-red-400 dark:border-red-500/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 relative">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                Academic Vault
              </h3>
            </div>
            <span className="bg-red-100 dark:bg-red-950/60 text-[#DC2626] dark:text-red-400 font-black text-[10px] tracking-wider px-2.5 py-1 rounded-md">
              STUDENTS ONLY
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Past exam papers, question archives, and lab manuals are securely protected for authenticated students.
          </p>
        </div>

        <div className="pt-2">
          {onGateTrigger ? (
            <Button
              onClick={() => onGateTrigger('access the Academic Resource Vault', '/resources')}
              className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-11 rounded-xl shadow-sm shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Access Vault</span>
              <Lock className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Link href="/login?redirect=%2Fresources" className="block w-full">
              <Button className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-11 rounded-xl shadow-sm shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer">
                <span>Sign In to Access Vault</span>
                <Lock className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Card 3: Helpdesk & Grievances */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">❓</span>
            <h3 className="text-lg font-black text-zinc-950 dark:text-white">
              Helpdesk & Grievances
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Instant policy answers on grading, fee waivers, or real-time public tickets with varsity bus route schedules.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/helpdesk" className="block w-full">
            <Button
              variant="outline"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Search Knowledge Base</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModuleShowcaseGrid;
