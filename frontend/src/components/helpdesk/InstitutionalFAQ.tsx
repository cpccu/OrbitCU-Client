'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Mail, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const InstitutionalFAQ: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      {/* Pinned Alert Notice */}
      <div className="bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-[#DC2626] p-3.5 rounded-lg flex items-start gap-3">
        <span className="text-base select-none shrink-0 mt-0.5">📌</span>
        <div className="space-y-0.5">
          <h4 className="font-black text-xs sm:text-sm tracking-tight text-[#DC2626]">
            PINNED NOTICE: ACCOUNTS OFFICE
          </h4>
          <p className="text-xs text-red-900 dark:text-red-300 font-medium leading-relaxed">
            Tuition fee installment deadline for current semester: Oct 25
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#DC2626]" />
            <span>Institutional Policies & Knowledgebase</span>
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">OFFICIAL ARCHIVE</span>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-waiver"
          className="space-y-3"
        >
          {/* Expanded Item 1: Tuition Fee Waiver */}
          <AccordionItem
            value="item-waiver"
            className="border-2 border-[#DC2626] rounded-xl px-4 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm transition-all"
          >
            <AccordionTrigger className="text-sm font-black text-zinc-950 dark:text-white hover:no-underline py-3.5">
              <span className="flex items-center gap-2 text-left">
                <span>What are the criteria for a tuition fee waiver?</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4 text-xs text-zinc-700 dark:text-zinc-300 space-y-3">
              <ul className="space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Students maintaining CGPA ≥ 3.80 receive a 25% waiver.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Students maintaining CGPA ≥ 3.90 receive a 50% waiver.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Minimum credit load: 12 Credits (No dropped courses).</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-xs">
                <Mail className="h-3.5 w-3.5 text-[#DC2626]" />
                <span className="font-bold text-[#DC2626]">
                  Official routing: Accounts Office (accounts@city.edu)
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Collapsed Item 2: Course Retake Policy */}
          <AccordionItem
            value="item-retake"
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40"
          >
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:no-underline py-3.5">
              <span>What is the course retake policy and maximum grade capping?</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
              <p>
                Students may retake any course where they earned a grade of B- or lower. A maximum of 2 retakes are permitted per academic term. The higher grade replaces the previous in CGPA computation, though transcript logs maintain retake history.
              </p>
              <p className="text-[11px] font-semibold text-zinc-500">
                Routing: Registrar Office (registrar@city.edu) • Annex 101
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Collapsed Item 3: Library Fines */}
          <AccordionItem
            value="item-library"
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40"
          >
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:no-underline py-3.5">
              <span>What are the central library borrowing limits and overdue fines?</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
              <p>
                Undergraduate students may borrow up to 3 textbooks for 14 calendar days. Renewals can be requested once online. Overdue materials incur a daily fine of 5 BDT per item.
              </p>
              <p className="text-[11px] font-semibold text-zinc-500">
                Routing: Library Helpdesk • 2nd Floor Central Library
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Collapsed Item 4: Proctorial Office */}
          <AccordionItem
            value="item-proctorial"
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40"
          >
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:no-underline py-3.5">
              <span>What are the Proctorial Office guidelines regarding campus conduct?</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
              <p>
                All students must visibly wear their official City University ID card lanyards on campus premises. Smoking, political campaigning, or unauthorized room occupations are strictly penalized by the Proctorial Board.
              </p>
              <p className="text-[11px] font-semibold text-zinc-500">
                Emergency Proctor Contact: proctor@city.edu • Hotline: Ext. 204
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Collapsed Item 5: Bus Routes & Timings */}
          <AccordionItem
            value="item-bus-service"
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40"
          >
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:no-underline py-3.5">
              <span>What are the university bus routes, departure times, and stops?</span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
              <p>
                City University operates 8 daily dedicated buses covering 6 routes: Mirpur (7:15 & 7:45 AM), Uttara/Tongi (7:00 & 7:30 AM), Dhanmondi/Mohammadpur (7:10 AM), Motijheel/Farmgate (6:50 AM), Savar/Ashulia (7:30 & 8:15 AM), and Gazipur/Konabari (7:15 AM). Return buses depart from Permanent Campus at 1:45 PM, 3:30 PM, and 4:30 PM.
              </p>
              <p className="text-[11px] font-semibold text-zinc-500">
                Routing: Transport Section • Hotline: 01819-223344 • Ext. 302 (transport@city.edu)
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default InstitutionalFAQ;
