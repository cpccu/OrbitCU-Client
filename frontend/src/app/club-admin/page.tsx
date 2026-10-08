'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, Calendar, QrCode, Download, Mail, Plus, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ClubMember {
  name: string;
  studentId: string;
  department: string;
  universityEmail: string;
  joinedVia: 'Registration' | 'Club Portal';
}

const DEFAULT_MEMBERS: ClubMember[] = [
  {
    name: 'Tanvir Ahmed',
    studentId: '2021-1-60-001',
    department: 'CSE',
    universityEmail: 'student@city.edu',
    joinedVia: 'Registration',
  },
  {
    name: 'Farhana Akter',
    studentId: '2022-2-60-109',
    department: 'CSE',
    universityEmail: 'farhana@city.edu',
    joinedVia: 'Registration',
  },
  {
    name: 'Sadman Sakib',
    studentId: '2024-1-50-044',
    department: 'EEE',
    universityEmail: 'sadman@city.edu',
    joinedVia: 'Club Portal',
  },
];

export default function ClubAdminCommandCenterPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'roster' | 'events' | 'passes'>('roster');

  if (user?.role !== 'CLUB_ADMIN' && user?.role !== 'UNIVERSITY_ADMIN') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F8F9FA] dark:bg-zinc-950">
        <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 mb-4">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">Access Restricted</h2>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6 max-w-md">
          You must be logged in as an appointed Club Admin or University Admin to access the Club Command Center.
        </p>
        <Link href="/login?demo=club">
          <Button className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-9">
            Sign In as Club Lead (CUCC) →
          </Button>
        </Link>
      </div>
    );
  }

  const handleDownloadCsv = () => {
    const headers = ['MEMBER NAME', 'STUDENT ID', 'DEPARTMENT', 'UNIVERSITY EMAIL', 'JOINED VIA'];
    const rows = DEFAULT_MEMBERS.map((m) => [
      `"${m.name}"`,
      `"${m.studentId}"`,
      `"${m.department}"`,
      `"${m.universityEmail}"`,
      `"${m.joinedVia}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CUCC_Member_Roster.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded CU Computer Club Member Roster CSV!');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Card Container */}
        <div className="bg-white dark:bg-[#09090B] border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          {/* Top Command Center Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              {/* Black Square with Red CUCC text */}
              <div className="h-16 w-16 bg-[#09090B] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-zinc-900">
                <span className="font-black text-lg tracking-tight text-[#DC2626]">CUCC</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                  CU Computer Club — Command Center
                </h1>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  Official Technology & Competitive Programming Chapter
                </p>
              </div>
            </div>

            {/* Metrics & Host Event Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Box 1: Enrolled Members */}
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 rounded-xl px-5 py-2.5 text-center min-w-[120px]">
                <div className="text-xl font-black text-zinc-950 dark:text-white leading-tight">84</div>
                <div className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  ENROLLED MEMBERS
                </div>
              </div>

              {/* Box 2: Contest RSVPs */}
              <div className="bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 rounded-xl px-5 py-2.5 text-center min-w-[120px]">
                <div className="text-xl font-black text-[#DC2626] leading-tight">42 / 120</div>
                <div className="text-[10px] font-bold tracking-wider text-red-500/90 uppercase">
                  CONTEST RSVPS
                </div>
              </div>

              {/* + Host New Event Button */}
              <Link href="/events">
                <Button className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-12 px-5 rounded-xl shadow-sm shadow-red-600/20 flex items-center gap-1.5 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  <span>+ Host New Event</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 pt-1 pb-2">
            <button
              onClick={() => setActiveTab('roster')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-amber-400" />
              <span>Member Roster (84)</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>Managed Events (2)</span>
            </button>

            <button
              onClick={() => setActiveTab('passes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'passes'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <QrCode className="h-3.5 w-3.5 text-rose-500" />
              <span>Scan Gate Passes</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-50/80 dark:bg-zinc-900/90 text-zinc-500 dark:text-zinc-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-zinc-200/80 dark:border-zinc-800">
                    <th className="py-3.5 px-4 font-extrabold">MEMBER NAME</th>
                    <th className="py-3.5 px-4 font-extrabold">STUDENT ID</th>
                    <th className="py-3.5 px-4 font-extrabold">DEPARTMENT</th>
                    <th className="py-3.5 px-4 font-extrabold">UNIVERSITY EMAIL</th>
                    <th className="py-3.5 px-4 font-extrabold">JOINED VIA</th>
                    <th className="py-3.5 px-4 font-extrabold">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                  {DEFAULT_MEMBERS.map((member) => (
                    <tr
                      key={member.studentId}
                      className="hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-zinc-950 dark:text-white">
                        {member.name}
                      </td>
                      <td className="py-4 px-4 font-mono text-zinc-600 dark:text-zinc-300 text-xs">
                        {member.studentId}
                      </td>
                      <td className="py-4 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                        {member.department}
                      </td>
                      <td className="py-4 px-4 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                        {member.universityEmail}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold ${
                            member.joinedVia === 'Registration'
                              ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-blue-100/80 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          }`}
                        >
                          {member.joinedVia}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a
                          href={`mailto:${member.universityEmail}`}
                          className="inline-flex items-center gap-1 text-[#DC2626] font-bold hover:underline text-xs"
                        >
                          <span>Contact</span>
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              Showing active registered members affiliated with CU Computer Club
            </span>
            <Button
              onClick={handleDownloadCsv}
              className="bg-[#09090B] hover:bg-zinc-800 text-white font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Download CSV</span>
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
