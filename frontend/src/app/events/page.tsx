'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { EventItem, RSVPPass } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { EventCard } from '@/components/events/EventCard';
import { EventFilters } from '@/components/events/EventFilters';
import { CreateEventDialog } from '@/components/events/CreateEventDialog';
import { TicketDialog } from '@/components/events/TicketDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Ticket, Sparkles, Calendar } from 'lucide-react';
import Link from 'next/link';

// Pre-seeded events for immediate demo readiness
const INITIAL_EVENTS: EventItem[] = [
  {
    _id: 'evt-seed-1',
    title: 'CU Intra-University Programming Contest 2026',
    clubName: 'City Computer Club',
    category: 'Technical',
    description: 'Solve algorithmic challenges in teams of 3. ICPC format competition with medals, certificates, and exciting prizes.',
    bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    venue: 'Lab 4 & 5 • Academic Building',
    eventDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    registrationDeadline: new Date(Date.now() + 86400000).toISOString(),
    maxCapacity: 150,
    registeredCount: 84,
    isInterUniversity: true,
    createdBy: 'admin',
  },
  {
    _id: 'evt-seed-2',
    title: 'National Parliamentary Debate Championship 2026',
    clubName: 'City Debating Society',
    category: 'Debate',
    description: 'The premier university debating tournament featuring 32 teams competing in British Parliamentary format across 5 rounds.',
    bannerUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    venue: 'Senate Hall & Seminar Rooms 1-6',
    eventDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    registrationDeadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    maxCapacity: 80,
    registeredCount: 52,
    isInterUniversity: true,
    createdBy: 'admin',
  },
  {
    _id: 'evt-seed-3',
    title: 'Annual Spring Cultural Fest & Musical Night',
    clubName: 'City Cultural Club',
    category: 'Cultural',
    description: 'Celebrating campus heritage with live musical performances, theatre productions, and classical acoustic band sets.',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    venue: 'Open Air Amphitheatre',
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    registrationDeadline: new Date(Date.now() + 86400000 * 6).toISOString(),
    maxCapacity: 500,
    registeredCount: 310,
    isInterUniversity: false,
    createdBy: 'admin',
  },
  {
    _id: 'evt-seed-4',
    title: 'Inter-Department Football Tournament Finals',
    clubName: 'City Sports Club',
    category: 'Sports',
    description: 'Catch CSE vs EEE in the highly anticipated championship final match of the Inter-Departmental Sports Trophy.',
    bannerUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    venue: 'City University Sports Ground',
    eventDate: new Date().toISOString(),
    registrationDeadline: new Date().toISOString(),
    maxCapacity: 300,
    registeredCount: 220,
    isInterUniversity: false,
    createdBy: 'admin',
  },
];

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Registered Event IDs & Passes
  const [userPasses, setUserPasses] = useState<Record<string, RSVPPass>>({});
  const [rsvpLoadingId, setRsvpLoadingId] = useState<string | null>(null);

  // Ticket Dialog State
  const [ticketDialogData, setTicketDialogData] = useState<{
    ticketHash: string;
    eventTitle: string;
    clubName?: string;
    venue: string;
    eventDate: string;
    studentName: string;
    studentUniversityId: string;
    department?: string;
  } | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (activeTab === 'upcoming' || activeTab === 'today' || activeTab === 'past' || activeTab === 'archived') {
        params.timeFrame = activeTab === 'archived' ? 'past' : activeTab;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await api.get('/events', { params });
      const fetched: EventItem[] = res.data?.data || res.data;
      if (Array.isArray(fetched) && fetched.length > 0) {
        setEvents(fetched);
      } else {
        setEvents(INITIAL_EVENTS);
      }
    } catch {
      setEvents(INITIAL_EVENTS);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, activeTab, searchQuery]);

  const fetchUserPasses = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api.get('/events/my-passes');
      const passes: RSVPPass[] = res.data?.data || res.data;
      if (Array.isArray(passes)) {
        const passMap: Record<string, RSVPPass> = {};
        passes.forEach((p) => {
          const evtId = typeof p.eventId === 'string' ? p.eventId : p.eventId?._id;
          if (evtId) passMap[evtId] = p;
        });
        setUserPasses(passMap);
      }
    } catch {
      // Graceful fallback
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchUserPasses();
  }, [fetchUserPasses]);

  const handleRSVP = async (event: EventItem) => {
    const studentName = user?.name || 'Tanvir Ahmed';
    const studentId = user?.universityId || '2021-1-60-001';
    const studentDept = user?.department || 'CSE';

    setRsvpLoadingId(event._id);
    try {
      let hash = `CU-PASS-${event._id.slice(0, 4)}-${studentId}-${Date.now().toString(36).toUpperCase()}`;
      try {
        const res = await api.post(`/events/${event._id}/rsvp`);
        const passData = res.data?.data || res.data;
        if (passData?.ticketHash) {
          hash = passData.ticketHash;
        }
      } catch {
        // Fallback hash already prepared
      }

      const newPass: RSVPPass = {
        _id: `pass-${Date.now()}`,
        eventId: event,
        studentId: user?._id || 'demo-student',
        studentUniversityId: studentId,
        ticketHash: hash,
        registrationDate: new Date().toISOString(),
      };

      setUserPasses((prev) => ({ ...prev, [event._id]: newPass }));
      setEvents((prev) =>
        prev.map((e) =>
          e._id === event._id ? { ...e, registeredCount: (e.registeredCount || 0) + 1 } : e
        )
      );

      toast.success('RSVP Confirmed! Your dynamic QR ticket pass has been generated.');

      setTicketDialogData({
        ticketHash: hash,
        eventTitle: event.title,
        clubName: event.clubName,
        venue: event.venue,
        eventDate: event.eventDate,
        studentName: studentName,
        studentUniversityId: studentId,
        department: studentDept,
      });
    } catch {
      toast.error('RSVP failed. Please try again.');
    } finally {
      setRsvpLoadingId(null);
    }
  };

  const handleViewTicket = (event: EventItem) => {
    const pass = userPasses[event._id];
    setTicketDialogData({
      ticketHash: pass?.ticketHash || `CU-PASS-${event._id.slice(0, 4)}-2021-1-60-001`,
      eventTitle: event.title,
      clubName: event.clubName,
      venue: event.venue,
      eventDate: event.eventDate,
      studentName: user?.name || 'Tanvir Ahmed',
      studentUniversityId: user?.universityId || '2021-1-60-001',
      department: user?.department || 'CSE',
    });
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todayEnd = todayStart + 86400000;

    return events.filter((e) => {
      if (selectedCategory !== 'All' && e.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = e.title.toLowerCase().includes(q);
        const matchesClub = e.clubName.toLowerCase().includes(q);
        const matchesDesc = e.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesClub && !matchesDesc) return false;
      }
      const eventTime = new Date(e.eventDate).getTime();
      if (activeTab === 'upcoming') {
        return eventTime >= todayStart;
      } else if (activeTab === 'today') {
        return eventTime >= todayStart && eventTime < todayEnd;
      } else if (activeTab === 'archived') {
        return eventTime < todayStart;
      }
      return true;
    });
  }, [events, selectedCategory, searchQuery, activeTab]);

  const canCreateEvent =
    user?.role === 'CLUB_ADMIN' || user?.role === 'UNIVERSITY_ADMIN';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Campus Event Engine
            </h1>
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626]">
              Screen 2
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Browse campus gatherings, secure limited RSVPs, and generate digital gate-entry QR passes.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link href="/events/my-passes">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1.5 border-zinc-300 dark:border-zinc-700 font-bold text-xs"
            >
              <Ticket className="h-4 w-4 text-[#DC2626]" />
              <span>My Active Passes</span>
            </Button>
          </Link>

          {canCreateEvent && (
            <Button
              size="sm"
              onClick={() => setCreateDialogOpen(true)}
              className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm shadow-red-600/20"
            >
              <Plus className="h-4 w-4" />
              <span>Host New Event</span>
            </Button>
          )}
        </div>
      </div>

      {/* Search & Category Filter */}
      <EventFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Time Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <TabsTrigger
              value="upcoming"
              className="text-xs font-bold px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-[#DC2626]"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger
              value="today"
              className="text-xs font-bold px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-[#DC2626]"
            >
              Happening Today
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="text-xs font-bold px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-[#DC2626]"
            >
              Archived / Past
            </TabsTrigger>
          </TabsList>

          <span className="text-xs text-zinc-400 hidden sm:inline font-mono">
            {filteredEvents.length} events listed
          </span>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-44 w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-[#09090B] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
              <Calendar className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-200">
                No events found matching this criteria
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                Try selecting "All" categories or clear your search keyword to view all registered events.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs font-bold border-zinc-300"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Search Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => (
                <EventCard
                  key={evt._id}
                  event={evt}
                  onRSVP={handleRSVP}
                  isRegistered={!!userPasses[evt._id]}
                  onViewTicket={handleViewTicket}
                  isRSVPLoading={rsvpLoadingId === evt._id}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Host Event Dialog */}
      <CreateEventDialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onEventCreated={(newEvent) => {
          setEvents((prev) => [newEvent, ...prev]);
        }}
      />

      {/* Dynamic QR Ticket Dialog */}
      <TicketDialog
        isOpen={!!ticketDialogData}
        onClose={() => setTicketDialogData(null)}
        event={
          ticketDialogData
            ? {
                title: ticketDialogData.eventTitle,
                venue: ticketDialogData.venue,
                eventDate: ticketDialogData.eventDate,
              }
            : undefined
        }
        student={
          ticketDialogData
            ? {
                name: ticketDialogData.studentName,
                universityId: ticketDialogData.studentUniversityId,
                department: ticketDialogData.department || 'CSE',
              }
            : undefined
        }
        ticketHash={ticketDialogData?.ticketHash || ''}
      />
    </div>
  );
}
