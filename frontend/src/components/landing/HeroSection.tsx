'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onGateTrigger?: (actionTitle: string, redirectUrl?: string) => void;
  onActionBlocked?: (action: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGateTrigger,
  onActionBlocked,
}) => {
  const scrollToModules = () => {
    const el = document.getElementById('modules');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-start justify-center space-y-6 text-left">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/70 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-[#DC2626] text-xs font-black tracking-wide shadow-sm">
        <span>🏛️</span>
        <span className="tracking-wider">OFFICIAL CITY UNIVERSITY PORTAL</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
        One URL. Zero Chaos.<br />
        <span className="text-[#DC2626]">Single Source of Truth.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed font-normal">
        Replacing 10+ Facebook groups and flooded chats with verified calendars, direct academic helpdesk answers, and live campus service pipelines.
      </p>

      {/* Action Group Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Primary Button */}
        <Link href="/login">
          <Button
            size="lg"
            className="bg-[#DC2626] hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-red-600/20 active:scale-95 transition-all text-sm h-12 cursor-pointer"
          >
            <span>Log In with ID</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>

        {/* Secondary Button */}
        <Button
          size="lg"
          variant="outline"
          onClick={scrollToModules}
          className="border-zinc-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold px-6 py-2.5 rounded-xl text-sm h-12 cursor-pointer shadow-sm"
        >
          <span>Explore Hubs</span>
          <ChevronDown className="h-4 w-4 ml-1 text-zinc-600 dark:text-zinc-400" />
        </Button>
      </div>

      {/* Trust & Metric Strip */}
      <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-zinc-800/80 w-full">
        <div className="flex items-center gap-1.5">
          <span className="font-black text-zinc-900 dark:text-white">100%</span>
          <span>Open Public Preview</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-black text-zinc-900 dark:text-white">Zero</span>
          <span>Mandatory Sign-In to Browse</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-black text-zinc-900 dark:text-white">Encrypted</span>
          <span>Role-Based JWT Sessions</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
