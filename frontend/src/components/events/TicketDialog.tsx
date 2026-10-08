'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event?: {
    title: string;
    venue: string;
    eventDate: string;
  };
  student?: {
    name: string;
    universityId: string;
    department: string;
  };
  ticketHash?: string;
  // Compatibility with older callers
  ticketData?: {
    ticketHash: string;
    eventTitle: string;
    clubName?: string;
    venue: string;
    eventDate: string;
    studentName: string;
    studentUniversityId: string;
    department?: string;
  } | null;
}

export const TicketDialog: React.FC<TicketDialogProps> = ({
  isOpen,
  onClose,
  event: directEvent,
  student: directStudent,
  ticketHash: directTicketHash,
  ticketData,
}) => {
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);

  // Normalize props for either call signature
  const event = directEvent || (ticketData
    ? {
        title: ticketData.eventTitle,
        venue: ticketData.venue,
        eventDate: ticketData.eventDate,
      }
    : {
        title: 'CU Intra-University Programming Contest 2026',
        venue: 'Lab 4 & 5 • Academic Building',
        eventDate: new Date().toISOString(),
      });

  const student = directStudent || (ticketData
    ? {
        name: ticketData.studentName,
        universityId: ticketData.studentUniversityId,
        department: ticketData.department || 'CSE',
      }
    : {
        name: 'Tanvir Ahmed',
        universityId: '2021-1-60-001',
        department: 'CSE',
      });

  const ticketHash =
    directTicketHash ||
    ticketData?.ticketHash ||
    'CU-PASS-8849-2021-1-60-001-A9F4';

  const handleDownload = () => {
    try {
      const svg = qrRef.current?.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `ticket-${student.universityId}-${ticketHash.slice(0, 8)}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
        toast.success('Pass QR downloaded successfully!');
      } else {
        window.print();
      }
    } catch {
      window.print();
    }
  };

  const handleViewMyPasses = () => {
    onClose();
    router.push('/events/my-passes');
  };

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-2 border-[#09090B] bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="bg-[#09090B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎟️</span>
            <DialogTitle className="text-base font-extrabold tracking-tight text-white">
              Official Event Entry Pass
            </DialogTitle>
          </div>
        </div>

        {/* Student & Event Information */}
        <div className="px-6 pt-5 pb-2 text-left">
          <h3 className="text-lg font-black text-zinc-950">{student.name}</h3>
          <p className="text-xs font-medium text-zinc-500">
            Student ID: {student.universityId} • Dept: {student.department}
          </p>
          <div className="mt-2 text-xs font-semibold text-zinc-700 bg-zinc-100 p-2 rounded-lg">
            📍 {event.venue}
          </div>
        </div>

        {/* Centered QR Code Box */}
        <div className="flex flex-col items-center justify-center p-4">
          <div
            ref={qrRef}
            className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl relative shadow-sm"
          >
            <QRCodeSVG
              fgColor="#09090B"
              includeMargin={false}
              level="H"
              size={170}
              value={ticketHash}
            />
            {/* Center City Brand Stamp */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-8 w-8 rounded-full bg-[#DC2626] text-white text-[10px] font-black flex items-center justify-center ring-4 ring-white">
                CU
              </div>
            </div>
          </div>
          <span className="mt-3 font-mono text-[11px] font-bold text-zinc-500 tracking-wider">
            HASH: {ticketHash}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 p-6 pt-2 bg-zinc-50 border-t border-zinc-100">
          <Button
            onClick={handleDownload}
            className="w-full bg-[#09090B] hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 h-10"
          >
            <Download className="h-3.5 w-3.5" /> Download Pass
          </Button>
          <Button
            onClick={handleViewMyPasses}
            className="w-full border-zinc-300 font-bold text-xs text-zinc-900 h-10 flex items-center justify-center gap-1.5"
            variant="outline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View My Passes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;
