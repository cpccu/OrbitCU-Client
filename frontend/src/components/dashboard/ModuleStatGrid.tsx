'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, BookOpen, HelpCircle, Megaphone, ArrowRight } from 'lucide-react';

interface ModuleStat {
  icon: React.ElementType;
  title: string;
  metric: string;
  actionText: string;
  href: string;
  highlightAction?: boolean;
}

const STATS: ModuleStat[] = [
  {
    icon: Calendar,
    title: 'Clubs & Events',
    metric: '2 Active Today',
    actionText: 'View upcoming →',
    href: '/events',
    highlightAction: true,
  },
  {
    icon: BookOpen,
    title: 'Resource Vault',
    metric: 'CSE-221 Notes',
    actionText: 'Search past papers →',
    href: '/resources',
    highlightAction: false,
  },
  {
    icon: HelpCircle,
    title: 'Helpdesk Guidelines',
    metric: 'Fee Waiver FAQ',
    actionText: 'Read rules →',
    href: '/helpdesk',
    highlightAction: false,
  },
  {
    icon: Megaphone,
    title: 'Grievance Box',
    metric: '1 Active Ticket',
    actionText: 'Track status →',
    href: '/complaints',
    highlightAction: false,
  },
];

export const ModuleStatGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Link
            key={stat.title}
            href={stat.href}
            className="group relative bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:border-[#DC2626] dark:hover:border-[#DC2626] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:bg-red-50 dark:group-hover:bg-red-950/50 group-hover:text-[#DC2626] transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-[#DC2626] transition-colors" />
              </div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white mt-1 tracking-tight">
                {stat.metric}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
              <span
                className={`text-xs font-bold transition-colors ${
                  stat.highlightAction
                    ? 'text-[#DC2626] group-hover:text-red-700'
                    : 'text-zinc-600 dark:text-zinc-400 group-hover:text-[#DC2626]'
                }`}
              >
                {stat.actionText}
              </span>
              <ArrowRight
                className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ${
                  stat.highlightAction ? 'text-[#DC2626]' : 'text-zinc-400 group-hover:text-[#DC2626]'
                }`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ModuleStatGrid;
