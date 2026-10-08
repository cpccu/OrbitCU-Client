'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ItemIncidentCard } from '@/components/lost-found/ItemIncidentCard';
import { ReportItemDialog } from '@/components/lost-found/ReportItemDialog';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { LostFoundItem } from '@/types';
import api from '@/lib/api';

const INITIAL_ITEMS: LostFoundItem[] = [
  {
    _id: 'lf-item-1',
    type: 'FOUND',
    status: 'OPEN',
    title: 'Casio fx-991EX Calculator',
    category: 'Calculator',
    locationFoundOrLost: 'Room 402, 3rd Floor',
    dateOfIncident: new Date(Date.now() - 7200000).toISOString(),
    description: 'Found on back bench. Has initials sticker.',
    contactNumberOrEmail: '01711-234567',
    reporterId: { _id: 'rep-1', name: 'Sabbir Hossain (CSE)' },
  },
  {
    _id: 'lf-item-2',
    type: 'FOUND',
    status: 'OPEN',
    title: 'City University Student ID Card (CU-2023-4190)',
    category: 'ID Card',
    locationFoundOrLost: 'Ground Floor Cafeteria counter near juice bar',
    dateOfIncident: new Date(Date.now() - 18000000).toISOString(),
    description: 'Belongs to a CSE department student with green lanyard.',
    contactNumberOrEmail: 'cafeteria@city.edu',
    reporterId: { _id: 'rep-2', name: 'Cafeteria Supervisor' },
  },
  {
    _id: 'lf-item-3',
    type: 'LOST',
    status: 'OPEN',
    title: 'Logitech Wireless Presentation Clicker',
    category: 'Electronics',
    locationFoundOrLost: 'Auditorium 2 Stage Podium',
    dateOfIncident: new Date(Date.now() - 86400000).toISOString(),
    description: 'Left plugged into podium USB hub during debate tournament.',
    contactNumberOrEmail: 'debate@city.edu',
    reporterId: { _id: 'rep-3', name: 'Debate Society Secretary' },
  },
];

export default function LostFoundPage() {
  const { user } = useAuth();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');
  const [items, setItems] = useState<LostFoundItem[]>(INITIAL_ITEMS);
  const [loading, setLoading] = useState(false);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/lost-found');
      const fetched: LostFoundItem[] = res.data?.data || res.data;
      if (Array.isArray(fetched) && fetched.length > 0) {
        // Merge with locally stored items
        const localStored = localStorage.getItem('cu_lost_found_items');
        let localItems: LostFoundItem[] = [];
        if (localStored) {
          try {
            localItems = JSON.parse(localStored);
          } catch {}
        }
        
        const combined = [...localItems, ...fetched];
        // Unique by _id
        const uniqueMap = new Map<string, LostFoundItem>();
        combined.forEach((item) => {
          const id = item._id || (item as any).id;
          if (id && !uniqueMap.has(id)) {
            uniqueMap.set(id, item);
          }
        });
        setItems(Array.from(uniqueMap.values()));
      }
    } catch {
      // Use fallback or local storage
      const localStored = localStorage.getItem('cu_lost_found_items');
      if (localStored) {
        try {
          const parsed = JSON.parse(localStored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems([...parsed, ...INITIAL_ITEMS]);
          }
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleItemReported = (newItem: LostFoundItem) => {
    setItems((prev) => [newItem, ...prev]);
    try {
      const localStored = localStorage.getItem('cu_lost_found_items');
      const localItems: LostFoundItem[] = localStored ? JSON.parse(localStored) : [];
      localStorage.setItem('cu_lost_found_items', JSON.stringify([newItem, ...localItems]));
    } catch {}
    toast.success('Incident logged successfully on board!');
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.locationFoundOrLost || (item as any).location || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'ALL' || item.type === filterType;
    return matchesSearch && matchesType;
  });

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
                Campus Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Verify and reclaim misplaced personal property reported across academic buildings.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => {
              setReportDialogOpen(true);
            }}
            className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm shadow-red-600/20 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Report Found / Lost Item</span>
          </Button>
        </div>

        {/* Filters and Quick Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reported items by keyword, location, or room..."
              className="pl-10 h-10 text-xs bg-white dark:bg-[#09090B] border-zinc-200 dark:border-zinc-800 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
            {(['ALL', 'FOUND', 'LOST'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === t
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {t === 'ALL' ? 'All Items' : t === 'FOUND' ? 'Found Property' : 'Lost Inquiries'}
              </button>
            ))}
          </div>
        </div>

        {/* Incident Items List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No reported incidents match your search.</p>
              <p className="text-xs text-zinc-500 mt-1">Try another keyword or report a new item above.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const itemId = item._id || (item as any).id;
              const dateStr = item.dateOfIncident || (item as any).date;
              let formattedDate = 'Recently';
              if (dateStr) {
                try {
                  const d = new Date(dateStr);
                  formattedDate = !isNaN(d.getTime()) ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : String(dateStr);
                } catch {
                  formattedDate = String(dateStr);
                }
              }

              const reporterName = typeof item.reporterId === 'object' && item.reporterId
                ? (item.reporterId as any).name
                : (item as any).reporterName || 'Campus Community';

              return (
                <ItemIncidentCard
                  key={itemId}
                  id={itemId}
                  type={item.type}
                  status={item.status}
                  title={item.title}
                  location={item.locationFoundOrLost || (item as any).location}
                  date={formattedDate}
                  quote={item.description || (item as any).quote}
                  imageUrl={item.imageUrl}
                  contact={item.contactNumberOrEmail || (item as any).contact}
                  reporterName={reporterName}
                />
              );
            })
          )}
        </div>

        {/* Report Item Dialog */}
        <ReportItemDialog
          isOpen={reportDialogOpen}
          onClose={() => setReportDialogOpen(false)}
          onItemReported={handleItemReported}
        />
      </div>
    </div>
  );
}
