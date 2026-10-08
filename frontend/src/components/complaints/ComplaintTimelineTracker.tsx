'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ComplaintTimelineTrackerProps {
  initialTicketId?: string;
  onSubmitNewGrievance?: () => void;
}

export const ComplaintTimelineTracker: React.FC<ComplaintTimelineTrackerProps> = ({
  initialTicketId = 'CU-TICK-1001',
  onSubmitNewGrievance,
}) => {
  const router = useRouter();
  const [ticketInput, setTicketInput] = useState(initialTicketId);
  const [activeTicket, setActiveTicket] = useState(initialTicketId);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) {
      toast.error('Please enter a ticket identifier');
      return;
    }
    setActiveTicket(ticketInput.trim().toUpperCase());
    toast.success(`Tracking status for ${ticketInput.trim().toUpperCase()}`);
  };

  const handleCtaClick = () => {
    if (onSubmitNewGrievance) {
      onSubmitNewGrievance();
    } else {
      router.push('/complaints/new');
    }
  };

  return (
    <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      {/* Ticket Input Search Bar */}
      <div>
        <label className="text-xs font-black tracking-wider uppercase text-zinc-500 mb-1.5 block">
          Track Campus Grievance Ticket
        </label>
        <form onSubmit={handleTrack} className="flex gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
            <Input
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              placeholder="Enter Ticket ID (e.g. CU-TICK-1001)"
              className="pl-10 h-10 font-mono text-xs sm:text-sm font-bold uppercase bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#09090B] hover:bg-zinc-800 text-white font-bold text-xs px-5 h-10 rounded-xl transition-all shadow-sm"
          >
            Track
          </Button>
        </form>
      </div>

      {/* Status Card */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-950/60 shadow-sm space-y-5">
        {/* Header & Subtitle */}
        <div className="space-y-1 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              {activeTicket}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
              IN PROGRESS
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white tracking-tight mt-1">
            AC Unit 2 Malfunctioning in Room 604
          </h3>
          <p className="text-xs text-zinc-500 font-medium">
            Category: Classroom Infrastructure | Submitted: Tanvir Ahmed
          </p>
        </div>

        {/* 4-Step Visual Progress Stepper */}
        <div className="py-2">
          <div className="flex items-center justify-between relative">
            {/* Step 1: SUBMITTED */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-sm">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-black text-[#10B981] uppercase tracking-wider">
                ✓ SUBMITTED
              </span>
            </div>

            {/* Line 1 -> 2 (Green) */}
            <div className="flex-1 h-1 bg-[#10B981] mx-2 -mt-5" />

            {/* Step 2: REVIEWED */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-sm">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-black text-[#10B981] uppercase tracking-wider">
                ✓ REVIEWED
              </span>
            </div>

            {/* Line 2 -> 3 (Green) */}
            <div className="flex-1 h-1 bg-[#10B981] mx-2 -mt-5" />

            {/* Step 3 (Active): IN PROGRESS */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-md ring-4 ring-red-100 dark:ring-red-950">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-black text-[#DC2626] uppercase tracking-wider">
                ● IN PROGRESS
              </span>
            </div>

            {/* Line 3 -> 4 (Gray #E4E4E7) */}
            <div className="flex-1 h-1 bg-[#E4E4E7] dark:bg-zinc-800 mx-2 -mt-5" />

            {/* Step 4: RESOLVED */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#E4E4E7] dark:bg-zinc-800 text-zinc-400 flex items-center justify-center border border-zinc-300 dark:border-zinc-700">
                <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">
                ○ RESOLVED
              </span>
            </div>
          </div>
        </div>

        {/* Admin Remarks Callout Box */}
        <div className="bg-zinc-100 dark:bg-zinc-900/90 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 mt-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-zinc-950 dark:text-zinc-100">
              Admin Remarks (Engineering & Maintenance):
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              Last updated: Today, 11:30 AM
            </span>
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono italic">
            "Technician assigned. Inspection scheduled for Saturday at 11 AM."
          </p>
        </div>
      </div>

      {/* Bottom CTA: + Submit New Grievance (Named or Anonymous) */}
      <button
        onClick={handleCtaClick}
        className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs sm:text-sm w-full py-2.5 rounded-lg transition-all active:scale-[0.99] shadow-sm shadow-red-600/20 flex items-center justify-center gap-2"
      >
        <span>+ Submit New Grievance (Named or Anonymous)</span>
      </button>
    </div>
  );
};

export default ComplaintTimelineTracker;
