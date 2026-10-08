'use client';

import React, { useState } from 'react';
import { InstitutionalFAQ } from '@/components/helpdesk/InstitutionalFAQ';
import { BusScheduleSection } from '@/components/helpdesk/BusScheduleSection';
import Link from 'next/link';
import { ArrowRight, MessageSquareWarning, Bus, HelpCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function HelpdeskPage() {
  const [activeTab, setActiveTab] = useState('bus');

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B]/50 py-8">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        {/* Top Header */}
        <div className="text-left space-y-1 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Smart Helpdesk & Campus Services
            </h1>
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626]">
              Help Center
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500">
            Varsity bus schedules, routes, institutional rules, waiver criteria, and academic guidelines.
          </p>
        </div>

        {/* Section Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 mb-4">
            <TabsTrigger
              value="bus"
              className="text-xs font-bold px-4 py-2 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-[#DC2626] data-[state=active]:shadow-sm"
            >
              <Bus className="h-4 w-4" />
              <span>Bus Schedule & Routes</span>
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="text-xs font-bold px-4 py-2 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-[#DC2626] data-[state=active]:shadow-sm"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Institutional Rules & FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bus" className="space-y-6 mt-0">
            <BusScheduleSection />
          </TabsContent>

          <TabsContent value="faq" className="space-y-6 mt-0">
            <InstitutionalFAQ />
          </TabsContent>
        </Tabs>

        {/* Escalation CTA */}
        <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950 text-[#DC2626] shrink-0 mt-0.5">
              <MessageSquareWarning className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                Have a grievance or maintenance issue?
              </h4>
              <p className="text-xs text-zinc-500">
                Submit an anonymous or identified report directly to proctorial administration.
              </p>
            </div>
          </div>
          <Link
            href="/complaints"
            className="text-xs font-bold bg-[#DC2626] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>Open Grievance Box</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
