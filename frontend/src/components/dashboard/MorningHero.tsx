'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MorningHeroProps {
  name?: string;
  department?: string;
  universityId?: string;
  onBrowseAll?: () => void;
}

export const MorningHero: React.FC<MorningHeroProps> = ({
  name = 'Tanvir Ahmed',
  department = 'Department of Computer Science & Engineering',
  universityId = '2021-1-60-001',
  onBrowseAll,
}) => {
  return (
    <div className="w-full bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/50 text-[#DC2626] text-xs font-semibold mb-1">
            <Sparkles className="h-3.5 w-3.5 text-[#DC2626]" />
            <span>Campus Morning Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
            Good morning, {name} 👋
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {department} | ID: {universityId}
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          {onBrowseAll ? (
            <Button
              onClick={onBrowseAll}
              className="w-full sm:w-auto bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 h-11 rounded-lg shadow-sm shadow-red-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Browse All Hubs</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Link href="/events" className="block w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 h-11 rounded-lg shadow-sm shadow-red-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Browse All Hubs</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MorningHero;
