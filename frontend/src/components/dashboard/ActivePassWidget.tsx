'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Ticket, ArrowRight, ShieldCheck } from 'lucide-react';
import { TicketDialog } from '@/components/events/TicketDialog';

interface ActivePassWidgetProps {
  eventTitle?: string;
  passHolder?: string;
  universityId?: string;
  department?: string;
  venue?: string;
  ticketHash?: string;
}

export const ActivePassWidget: React.FC<ActivePassWidgetProps> = ({
  eventTitle = 'Programming Contest 2026',
  passHolder = 'Tanvir Ahmed',
  universityId = '2021-1-60-001',
  department = 'CSE',
  venue = 'Lab 4 & 5, Academic Bldg',
  ticketHash = 'CU-PASS-8849-2021-1-60-001-A9F4',
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="bg-[#09090B] text-white rounded-xl p-5 border border-zinc-800 shadow-xl flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-[#DC2626]" />
              <span className="text-xs font-black tracking-wider uppercase text-zinc-300">
                Active Event Pass
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              VERIFIED
            </span>
          </div>

          {/* Pass Details & Mini QR Code Layout */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="text-base font-extrabold text-white truncate">
                {eventTitle}
              </h3>
              <p className="text-xs text-zinc-300 font-medium">
                Pass Holder: <span className="text-white font-bold">{passHolder}</span>
              </p>
              <p className="text-xs font-mono text-zinc-400">
                ID: {universityId}
              </p>
              <div className="pt-1 text-[11px] text-zinc-400 flex items-center gap-1">
                <span>📍 {venue}</span>
              </div>
            </div>

            {/* Embedded Mini QR Preview Box */}
            <div
              onClick={() => setDialogOpen(true)}
              className="bg-white rounded-lg p-1.5 w-16 h-16 shrink-0 shadow-md flex items-center justify-center relative cursor-pointer hover:ring-2 hover:ring-[#DC2626] transition-all group"
              title="Click to view full pass"
            >
              <QRCodeSVG
                value={ticketHash}
                size={52}
                level="M"
                fgColor="#09090B"
                includeMargin={false}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-3.5 w-3.5 rounded-full bg-[#DC2626] text-white text-[6px] font-black flex items-center justify-center ring-1 ring-white">
                  CU
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 mt-4 border-t border-zinc-800/90 flex items-center justify-between">
          <button
            onClick={() => setDialogOpen(true)}
            className="text-[#DC2626] hover:text-red-400 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 group cursor-pointer"
          >
            <span>VIEW FULL PASS (QR CODE)</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[10px] font-mono text-zinc-500">
            ENTRY: OCT 2026
          </span>
        </div>
      </div>

      {/* Full Pass Dialog Modal */}
      <TicketDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        event={{
          title: eventTitle,
          venue: venue,
          eventDate: new Date().toISOString(),
        }}
        student={{
          name: passHolder,
          universityId: universityId,
          department: department,
        }}
        ticketHash={ticketHash}
      />
    </>
  );
};

export default ActivePassWidget;
