'use client';

import React, { useState } from 'react';
import { ComplaintTimelineTracker } from '@/components/complaints/ComplaintTimelineTracker';
import { ComplaintForm } from '@/components/complaints/ComplaintForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ShieldCheck, EyeOff, Clock } from 'lucide-react';

export default function ComplaintsPage() {
  const [newGrievanceOpen, setNewGrievanceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B]/50 py-8">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                Campus Grievance Box & Tracker
              </h1>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626]">
                Screen 4 Right
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Transparent resolution lifecycle with whistleblower protection and proctorial inspection tracking.
            </p>
          </div>
        </div>

        {/* Protocol Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white dark:bg-[#09090B] rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start space-x-2.5 shadow-sm">
            <EyeOff className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-zinc-950 dark:text-white">Zero Retaliation</p>
              <p className="text-zinc-500">Anonymous toggle strips identity from database records.</p>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-[#09090B] rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start space-x-2.5 shadow-sm">
            <Clock className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-zinc-950 dark:text-white">24h SLA Turnaround</p>
              <p className="text-zinc-500">Tickets assigned to maintenance within 24 hours.</p>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-[#09090B] rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start space-x-2.5 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-zinc-950 dark:text-white">Public Audit Log</p>
              <p className="text-zinc-500">Track resolution stage and official administrator notes.</p>
            </div>
          </div>
        </div>

        {/* Screen 4 Right: Campus Grievance Stepper & Tracker */}
        <ComplaintTimelineTracker
          onSubmitNewGrievance={() => setNewGrievanceOpen(true)}
        />

        {/* Submit New Grievance Dialog */}
        <Dialog open={newGrievanceOpen} onOpenChange={setNewGrievanceOpen}>
          <DialogContent className="max-w-xl p-6 bg-white dark:bg-[#09090B] border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <DialogHeader className="text-left mb-2">
              <DialogTitle className="text-lg font-black text-zinc-950 dark:text-white">
                Intake Grievance Submission Form
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">
                Ensure high specificity regarding room numbers and malfunction descriptions to expedite resolution.
              </DialogDescription>
            </DialogHeader>
            <ComplaintForm
              onComplaintSubmitted={() => {
                setNewGrievanceOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
