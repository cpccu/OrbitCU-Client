'use client';

import React, { useState } from 'react';
import { ItemIncidentCard } from '@/components/lost-found/ItemIncidentCard';
import { ReportItemDialog } from '@/components/lost-found/ReportItemDialog';
import { Button } from '@/components/ui/button';
import { Plus, Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function LostFoundPage() {
  const { user } = useAuth();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const items = [
    {
      id: 'lf-item-1',
      type: 'FOUND' as const,
      status: 'OPEN' as const,
      title: 'Casio fx-991EX Calculator',
      location: 'Room 402, 3rd Floor',
      date: 'Found 2 hours ago',
      quote: 'Found on back bench. Has initials sticker.',
      contact: '01711-234567',
      reporterName: 'Sabbir Hossain (CSE)',
    },
    {
      id: 'lf-item-2',
      type: 'FOUND' as const,
      status: 'OPEN' as const,
      title: 'City University Student ID Card (CU-2023-4190)',
      location: 'Ground Floor Cafeteria counter near juice bar',
      date: 'Found 5 hours ago',
      quote: 'Belongs to a CSE department student with green lanyard.',
      contact: 'cafeteria@city.edu',
      reporterName: 'Cafeteria Supervisor',
    },
    {
      id: 'lf-item-3',
      type: 'LOST' as const,
      status: 'OPEN' as const,
      title: 'Logitech Wireless Presentation Clicker',
      location: 'Auditorium 2 Stage Podium',
      date: 'Lost yesterday at 4:30 PM',
      quote: 'Left plugged into podium USB hub during debate tournament.',
      contact: 'debate@city.edu',
      reporterName: 'Debate Society Secretary',
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B]/50 py-8">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                Lost & Found Incident Board
              </h1>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626]">
                Screen 4 Left
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Verify and reclaim misplaced personal property reported across academic buildings.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => {
              if (!user) {
                toast.error('Please log in with student credentials to file an incident.');
                return;
              }
              setReportDialogOpen(true);
            }}
            className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm shadow-red-600/20"
          >
            <Plus className="h-4 w-4" />
            <span>Report Found / Lost Item</span>
          </Button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reported items by keyword, location, or room..."
            className="pl-10 h-10 text-xs bg-white dark:bg-[#09090B] border-zinc-200 dark:border-zinc-800 rounded-xl"
          />
        </div>

        {/* Incident Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <ItemIncidentCard
              key={item.id}
              id={item.id}
              type={item.type}
              status={item.status}
              title={item.title}
              location={item.location}
              date={item.date}
              quote={item.quote}
              contact={item.contact}
              reporterName={item.reporterName}
            />
          ))}
        </div>

        {/* Report Item Dialog */}
        <ReportItemDialog
          isOpen={reportDialogOpen}
          onClose={() => setReportDialogOpen(false)}
          onItemReported={() => {
            toast.success('Incident logged successfully!');
          }}
        />
      </div>
    </div>
  );
}
