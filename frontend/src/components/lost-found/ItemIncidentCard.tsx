'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClaimItemDialog } from '@/components/lost-found/ClaimItemDialog';
import { LostFoundItem } from '@/types';
import { toast } from 'sonner';

export interface ItemIncidentProps {
  id?: string;
  type?: 'FOUND' | 'LOST';
  status?: 'OPEN' | 'RESOLVED';
  title?: string;
  location?: string;
  date?: string;
  quote?: string;
  imageUrl?: string;
  contact?: string;
  reporterName?: string;
  onClaim?: () => void;
  onContact?: () => void;
}

export const ItemIncidentCard: React.FC<ItemIncidentProps> = ({
  id = 'item-casio-1',
  type = 'FOUND',
  status = 'OPEN',
  title = 'Casio fx-991EX Calculator',
  location = 'Room 402, 3rd Floor',
  date = 'Found 2 hours ago',
  quote = 'Found on back bench. Has initials sticker.',
  imageUrl,
  contact = 'student@city.edu',
  reporterName = 'Sabbir Hossain',
  onClaim,
  onContact,
}) => {
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  const mockItem: LostFoundItem = {
    _id: id,
    type: type,
    status: status,
    title: title,
    category: 'Calculator',
    locationFoundOrLost: location,
    dateOfIncident: new Date().toISOString(),
    description: quote,
    imageUrl: imageUrl,
    contactNumberOrEmail: contact,
    reporterId: { _id: 'rep-mock', name: reporterName },
  };

  const handleClaimClick = () => {
    if (onClaim) {
      onClaim();
    } else {
      setClaimModalOpen(true);
    }
  };

  const handleContactClick = () => {
    if (onContact) {
      onContact();
    } else {
      toast.info(`Reporter contact: ${contact} (${reporterName})`);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#DC2626] dark:hover:border-[#DC2626] transition-all">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          {/* Left Photo Placeholder (130x130px light-gray container with 📟 icon and "PHOTO UPLOADED" label) */}
          <div className="w-full sm:w-[130px] h-[130px] bg-zinc-100 dark:bg-zinc-800/80 rounded-xl flex flex-col items-center justify-center p-3 text-center shrink-0 border border-zinc-200 dark:border-zinc-700 relative overflow-hidden group">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl select-none" role="img" aria-label="Incident Item">
                  📟
                </span>
                <span className="mt-1.5 font-mono text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  PHOTO UPLOADED
                </span>
              </div>
            )}
          </div>

          {/* Right Metadata */}
          <div className="flex-1 min-w-0 space-y-2 w-full">
            {/* Badges */}
            <div className="flex items-center gap-2">
              <span className="bg-[#09090B] text-white text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded shadow-sm uppercase">
                {type}
              </span>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                {status}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-extrabold text-zinc-950 dark:text-white tracking-tight line-clamp-1">
              {title}
            </h3>

            {/* Location & Date */}
            <div className="space-y-0.5 text-xs">
              <p className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                <span>📍 Location:</span>
                <span className="text-zinc-900 dark:text-zinc-100">{location}</span>
              </p>
              <p className="text-zinc-500 font-medium flex items-center gap-1.5">
                <span>🕒 Date:</span>
                <span>{date}</span>
              </p>
            </div>

            {/* Quote Note */}
            <div className="text-zinc-500 text-xs italic bg-zinc-50 dark:bg-zinc-900/60 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
              "{quote}"
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleClaimClick}
                className="bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded transition-all active:scale-95 shadow-sm shadow-red-600/15"
              >
                🤝 Claim This Item
              </button>
              <button
                onClick={handleContactClick}
                className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold py-2 px-4 rounded transition-colors"
              >
                Contact Reporter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Item Modal */}
      <ClaimItemDialog
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        item={mockItem}
      />
    </>
  );
};

export default ItemIncidentCard;
