'use client';

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import api from '@/lib/api';

interface LivePulseWidgetProps {
  onActionBlocked?: (actionTitle: string, redirectUrl: string) => void;
}

export const LivePulseWidget: React.FC<LivePulseWidgetProps> = ({ onActionBlocked }) => {
  const [eventData, setEventData] = useState({
    title: 'CU Programming Contest 2026',
    venue: 'Lab 4 & 5',
  });

  const [ruleData, setRuleData] = useState({
    title: 'Tuition Waiver CGPA Guidelines',
    dept: 'Accounts',
  });

  const [lostFoundData, setLostFoundData] = useState({
    title: 'Casio Scientific Calculator',
    location: 'Room 402',
  });

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get('/events');
        const list = res.data?.data || res.data;
        if (Array.isArray(list) && list.length > 0) {
          setEventData({
            title: list[0].title || 'CU Programming Contest 2026',
            venue: list[0].venue || 'Lab 4 & 5',
          });
        }
      } catch {
        // Fallback
      }

      try {
        const res = await api.get('/lost-found');
        const list = res.data?.data || res.data;
        if (Array.isArray(list) && list.length > 0) {
          setLostFoundData({
            title: list[0].title || 'Casio Scientific Calculator',
            location: list[0].locationFoundOrLost || 'Room 402',
          });
        }
      } catch {
        // Fallback
      }
    };

    fetchLatest();
  }, []);

  return (
    <div className="bg-[#09090B] text-white rounded-2xl p-5 border border-zinc-800 shadow-xl space-y-3.5">
      {/* Widget Header */}
      <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight px-1">
        <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
        <span>Live Campus Pipeline (No Sign-In Needed)</span>
      </div>

      {/* Item 1: Event */}
      <div
        onClick={() => onActionBlocked && onActionBlocked('view event', '/events')}
        className="bg-white text-zinc-950 rounded-xl px-4 py-3 flex items-center justify-between text-xs shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center gap-2.5 truncate mr-2">
          <span className="bg-[#DC2626] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">
            EVENT
          </span>
          <span className="font-bold truncate text-zinc-900">{eventData.title}</span>
        </div>
        <span className="text-zinc-500 font-semibold text-xs shrink-0">{eventData.venue}</span>
      </div>

      {/* Item 2: Rule */}
      <div
        onClick={() => onActionBlocked && onActionBlocked('view tuition rules', '/helpdesk')}
        className="bg-white text-zinc-950 rounded-xl px-4 py-3 flex items-center justify-between text-xs shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center gap-2.5 truncate mr-2">
          <span className="bg-[#09090B] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">
            RULE
          </span>
          <span className="font-bold truncate text-zinc-900">{ruleData.title}</span>
        </div>
        <span className="text-zinc-500 font-semibold text-xs shrink-0">{ruleData.dept}</span>
      </div>

      {/* Item 3: Found */}
      <div
        onClick={() => onActionBlocked && onActionBlocked('inspect lost & found item', '/lost-found')}
        className="bg-white text-zinc-950 rounded-xl px-4 py-3 flex items-center justify-between text-xs shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center gap-2.5 truncate mr-2">
          <span className="bg-[#FEF08A] text-[#854D0E] font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">
            FOUND
          </span>
          <span className="font-bold truncate text-zinc-900">{lostFoundData.title}</span>
        </div>
        <span className="text-zinc-500 font-semibold text-xs shrink-0">{lostFoundData.location}</span>
      </div>
    </div>
  );
};

export default LivePulseWidget;
