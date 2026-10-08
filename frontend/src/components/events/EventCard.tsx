'use client';

import React from 'react';
import { EventItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: EventItem;
  onRSVP: (event: EventItem) => void;
  isRegistered?: boolean;
  onViewTicket?: (event: EventItem) => void;
  isRSVPLoading?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRSVP,
  isRegistered = false,
  onViewTicket,
  isRSVPLoading = false,
}) => {
  const isFull = (event.registeredCount || 0) >= (event.maxCapacity || 100);
  const isPast = new Date(event.eventDate).getTime() < Date.now();
  const capacityPercent = Math.min(
    100,
    Math.round(((event.registeredCount || 0) / (event.maxCapacity || 1)) * 100)
  );

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-red-100 text-[#DC2626] border-red-200';
      case 'Cultural':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Sports':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Debate':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-red-100 text-[#DC2626] border-red-200';
    }
  };

  return (
    <Card className="flex flex-col justify-between overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] hover:border-[#DC2626] dark:hover:border-[#DC2626] transition-all duration-300 hover:shadow-lg group rounded-xl">
      {/* Banner Top Container */}
      <div className="relative h-44 w-full bg-[#09090B] overflow-hidden flex items-end p-4">
        {event.bannerUrl ? (
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-red-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

        <div className="relative z-10 w-full flex items-center justify-between">
          <span
            className={`text-[11px] font-black tracking-wide px-2.5 py-1 rounded-md border shadow-sm ${getCategoryBadgeClass(
              event.category
            )}`}
          >
            {event.category || 'Technical'}
          </span>
          {event.isInterUniversity && (
            <span className="text-[10px] font-black tracking-wide px-2 py-0.5 rounded bg-zinc-900 text-white border border-zinc-700">
              Inter-University
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <CardHeader className="pb-2 pt-4 px-5">
        <div className="flex items-center space-x-1.5 text-xs text-[#DC2626] font-bold mb-1">
          <span>{event.clubName}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white line-clamp-1 group-hover:text-[#DC2626] transition-colors tracking-tight">
          {event.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="px-5 py-2 space-y-2.5 text-xs">
        <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-300">
          <Calendar className="h-4 w-4 text-[#DC2626] shrink-0" />
          <span className="font-semibold">{formatDate(event.eventDate)}</span>
        </div>

        <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-300">
          <MapPin className="h-4 w-4 text-zinc-500 shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>

        {/* Capacity Meter */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-[11px] mb-1 font-medium">
            <span className="text-zinc-500 flex items-center gap-1">
              <Users className="h-3 w-3" /> Seats Reserved
            </span>
            <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
              {event.registeredCount || 0} / {event.maxCapacity}
            </span>
          </div>
          <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                capacityPercent >= 90
                  ? 'bg-red-700'
                  : 'bg-[#DC2626]'
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 pt-3 pb-5 border-t border-zinc-100 dark:border-zinc-800/80">
        {isRegistered ? (
          <Button
            variant="outline"
            className="w-full border-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 font-bold text-xs h-10 flex items-center justify-center gap-2"
            onClick={() => onViewTicket && onViewTicket(event)}
          >
            <Ticket className="h-4 w-4" />
            <span>View RSVP Pass & QR</span>
          </Button>
        ) : (
          <Button
            disabled={isFull || isPast || isRSVPLoading}
            className={`w-full font-bold text-xs h-10 flex items-center justify-center gap-2 transition-all ${
              isPast || isFull
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                : 'bg-[#DC2626] hover:bg-red-700 text-white shadow-sm shadow-red-600/20 active:scale-95'
            }`}
            onClick={() => onRSVP(event)}
          >
            {isPast ? (
              'Event Ended'
            ) : isFull ? (
              'Capacity Full'
            ) : isRSVPLoading ? (
              'Generating QR Pass...'
            ) : (
              <>
                <span>RSVP Now & Get Ticket</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
