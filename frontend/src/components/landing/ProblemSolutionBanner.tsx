'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  XCircle,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const ProblemSolutionBanner: React.FC = () => {
  const problems = [
    '10+ fragmented Facebook groups with unverified spam, fake circulars, and expired notices.',
    'Urgent exam announcements buried under hundreds of casual WhatsApp and Messenger chat pings.',
    'Dead Google Drive links and lost handwritten notes right before midterm and final examinations.',
    'Misplaced calculators and student IDs posted onto disappearing Instagram stories without any claim tracking.',
    'Physical paper suggestion boxes ignored for months with zero feedback or resolution tracking.',
  ];

  const solutions = [
    'One centralized portal authenticated via official City University Student ID and JWT credentials.',
    'Official club event engine with capacity counters and dynamic tamper-proof QR entry passes.',
    'Decentralized peer study vault organized by Department, Course Code (e.g., CSE-221), and Examination Term.',
    'Searchable Lost & Found repository with photo verification and direct ownership claim workflows.',
    'Whistleblower-protected grievance redressal box with public ticket ID tracking (CU-TICK-XXXX).',
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] dark:bg-zinc-950/70 border-t border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-2 text-xs font-bold uppercase tracking-widest text-[#DC2626] border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40"
          >
            THE CAMPUS PARADIGM SHIFT
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
            From Social Media Chaos to an Autonomous Operating System
          </h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            See how CampusOS eliminates administrative friction and communication breakdown across City University.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Old Way (Fragmented Chaos) */}
          <Card className="border-red-200/80 dark:border-red-950/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between">
            <CardHeader className="p-6 pb-4 border-b border-red-100 dark:border-red-950/50 bg-red-50/40 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    The Fragmented Way
                  </CardTitle>
                </div>
                <Badge variant="outline" className="border-red-300 text-red-700 dark:border-red-800 dark:text-red-400 text-[10px] font-bold">
                  UNVERIFIED & CHAOTIC
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Facebook groups, Telegram channels, and scattered WhatsApp chats.
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-3.5 flex-1">
              {problems.map((text, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right: The CampusOS Standard (Autonomous Hub) */}
          <Card className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md ring-1 ring-zinc-950/5 dark:ring-white/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-bl-full pointer-events-none" />

            <CardHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center text-[#DC2626]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg font-bold text-zinc-950 dark:text-white">
                    The CampusOS Standard
                  </CardTitle>
                </div>
                <Badge className="bg-[#DC2626] text-white hover:bg-red-700 text-[10px] font-bold">
                  SINGLE SOURCE OF TRUTH
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Unified digital infrastructure built specifically for City University.
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-3.5 flex-1">
              {solutions.map((text, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionBanner;
