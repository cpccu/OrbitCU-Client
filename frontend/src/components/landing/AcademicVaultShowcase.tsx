'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Lock,
  Download,
  Search,
  ArrowUp,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Department } from '@/types';

interface AcademicVaultShowcaseProps {
  onGateTrigger: (resourceTitle: string, redirectUrl?: string) => void;
}

interface ShowcaseResource {
  id: string;
  code: string;
  title: string;
  department: Department;
  term: 'Mid-Term' | 'Final-Term' | 'Lab Manual' | 'Lecture Note';
  fileFormat: 'PDF' | 'DOCX';
  upvotes: number;
  uploadedBy: string;
}

const VAULT_ITEMS: ShowcaseResource[] = [
  {
    id: 'res-1',
    code: 'CSE-221',
    title: 'Algorithms Mid-Term Past Questions & Solutions (Fall 2025)',
    department: 'CSE',
    term: 'Mid-Term',
    fileFormat: 'PDF',
    upvotes: 42,
    uploadedBy: 'Senior Tanvir',
  },
  {
    id: 'res-2',
    code: 'CSE-311',
    title: 'Database Systems SQL & Normalization PYQ Exam Review',
    department: 'CSE',
    term: 'Final-Term',
    fileFormat: 'PDF',
    upvotes: 38,
    uploadedBy: 'Ayesha Siddiqua',
  },
  {
    id: 'res-3',
    code: 'EEE-212',
    title: 'AC Circuit Analysis & Phasor Diagram Comprehensive Guide',
    department: 'EEE',
    term: 'Lab Manual',
    fileFormat: 'PDF',
    upvotes: 27,
    uploadedBy: 'Mehedi Zaman',
  },
  {
    id: 'res-4',
    code: 'BBA-104',
    title: 'Financial Accounting Balance Sheet Quick Formula Sheet',
    department: 'BBA',
    term: 'Mid-Term',
    fileFormat: 'DOCX',
    upvotes: 35,
    uploadedBy: 'Farhana Islam',
  },
  {
    id: 'res-5',
    code: 'CSE-110',
    title: 'Object Oriented Programming Java Lab Exercises & Solutions',
    department: 'CSE',
    term: 'Lab Manual',
    fileFormat: 'PDF',
    upvotes: 49,
    uploadedBy: 'Tanvir Ahmed',
  },
  {
    id: 'res-6',
    code: 'MAT-121',
    title: 'Differential Calculus & Vector Analysis Final PYQ Archive',
    department: 'CSE',
    term: 'Final-Term',
    fileFormat: 'PDF',
    upvotes: 31,
    uploadedBy: 'Sabbir Hossain',
  },
];

export const AcademicVaultShowcase: React.FC<AcademicVaultShowcaseProps> = ({
  onGateTrigger,
}) => {
  const [activeDept, setActiveDept] = useState<string>('ALL');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredItems = VAULT_ITEMS.filter((item) => {
    const matchesDept = activeDept === 'ALL' || item.department === activeDept;
    const matchesQuery =
      filterQuery === '' ||
      item.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const getTermColor = (term: string) => {
    switch (term) {
      case 'Mid-Term':
        return 'bg-red-50 text-[#DC2626] border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900';
      case 'Final-Term':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900';
      case 'Lab Manual':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <section id="vault-showcase" className="py-16 bg-white dark:bg-[#09090B] border-t border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-[#DC2626] dark:text-red-400 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 flex items-center gap-1.5"
              >
                <Lock className="h-3 w-3" />
                <span>🔒 Enrolled Students Only</span>
              </Badge>
              <Badge variant="outline" className="text-[11px] font-mono text-zinc-400 border-zinc-200 dark:border-zinc-800">
                Peer Crowd-Sourced
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
              Academic Resource Vault
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Preview indexed midterm questions, lecture notes, and lab manuals organized by course code. Verified City University student access only.
            </p>
          </div>

          <Button
            onClick={() => onGateTrigger('Browse Complete Academic Vault', '/resources')}
            className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-10 px-4 self-start md:self-auto cursor-pointer shadow-md shadow-red-600/20"
          >
            <Lock className="h-3.5 w-3.5 mr-1.5" />
            Unlock Full Vault ({VAULT_ITEMS.length}+ Indexed)
          </Button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'CSE', 'EEE', 'BBA'].map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  activeDept === dept
                    ? 'bg-[#09090B] text-white border-zinc-900 dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter by code or title..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium outline-none focus:border-[#DC2626]"
            />
          </div>
        </div>

        {/* Resource Items Table / Grid */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onGateTrigger(`download ${item.code} (${item.title})`, '/resources')}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white dark:hover:bg-zinc-900 transition-all cursor-pointer group"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#09090B] dark:bg-zinc-800 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#DC2626] transition-colors shadow-sm">
                    {item.fileFormat}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-extrabold text-[#DC2626]">
                        {item.code}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] font-bold px-1.5 py-0 border ${getTermColor(item.term)}`}
                      >
                        {item.term}
                      </Badge>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-zinc-200 dark:border-zinc-800 text-zinc-500">
                        {item.department}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white group-hover:text-[#DC2626] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Contributed by <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.uploadedBy}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1 text-xs font-bold text-zinc-500">
                    <ArrowUp className="h-3.5 w-3.5 text-[#DC2626]" />
                    <span>{item.upvotes}</span>
                  </div>

                  <Button
                    size="sm"
                    className="h-8 text-xs font-bold bg-[#DC2626] hover:bg-red-700 text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGateTrigger(`download ${item.code} (${item.title})`, '/resources');
                    }}
                  >
                    <Lock className="h-3 w-3" />
                    <span>Download {item.fileFormat}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security / Privacy Banner */}
        <div className="mt-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              <strong className="text-zinc-900 dark:text-white">Copyright & Honor Code:</strong> All exam question papers and lecture notes are indexed for City University students only.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onGateTrigger('Contribute your course notes', '/resources')}
            className="text-xs font-bold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            + Contribute Material
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademicVaultShowcase;
