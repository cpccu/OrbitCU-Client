'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface FeedItem {
  id: string;
  badgeText: string;
  badgeStyle: string;
  title: string;
  metadata: string;
  href: string;
}

const FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed-1',
    badgeText: 'EVENT',
    badgeStyle: 'bg-red-100 text-[#DC2626] border border-red-200',
    title: 'CU Intra-University Programming Contest 2026',
    metadata: 'Lab 4 & 5 • 10:00 AM',
    href: '/events',
  },
  {
    id: 'feed-2',
    badgeText: 'FOUND',
    badgeStyle: 'bg-[#09090B] text-white border border-zinc-900',
    title: 'Casio fx-991EX Scientific Calculator reported found',
    metadata: 'Room 402 • 2h ago',
    href: '/lost-found',
  },
  {
    id: 'feed-3',
    badgeText: 'VAULT',
    badgeStyle: 'bg-sky-100 text-sky-700 border border-sky-200',
    title: 'CSE-221: Algorithms Dynamic Programming Lecture Notes uploaded',
    metadata: 'Vault Archive • 3h ago',
    href: '/resources',
  },
  {
    id: 'feed-4',
    badgeText: 'ALERT',
    badgeStyle: 'bg-amber-100 text-amber-700 border border-amber-200',
    title: 'Tuition fee installment deadline for current semester: Oct 25',
    metadata: 'Accounts Office • Pinned',
    href: '/helpdesk',
  },
];

export const LiveCampusFeed: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626]" />
            </span>
            <h2 className="text-sm font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider">
              Live Campus Feed
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-zinc-500 font-mono">
            REAL-TIME DISPATCH
          </span>
        </div>

        {/* Feed List */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {FEED_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="py-3.5 flex items-start justify-between gap-3 group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block text-[10px] font-black tracking-wide px-2 py-0.5 rounded ${item.badgeStyle}`}
                  >
                    {item.badgeText}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {item.metadata}
                  </span>
                </div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#DC2626] transition-colors truncate">
                  {item.title}
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-right">
        <Link
          href="/events"
          className="text-xs font-bold text-[#DC2626] hover:text-red-700 inline-flex items-center gap-1"
        >
          <span>View all campus announcements</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default LiveCampusFeed;
