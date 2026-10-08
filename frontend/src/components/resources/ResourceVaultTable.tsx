'use client';

import React, { useState, useMemo } from 'react';
import { Download, Search, Plus, ArrowUp, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface VaultResource {
  id: string;
  code: string;
  title: string;
  uploadedBy: string;
  upvotes: number;
  term: 'Mid-Term' | 'Lab Manual' | 'Final-Term';
  fileUrl?: string;
}

const DEFAULT_RESOURCES: VaultResource[] = [
  {
    id: 'res-1',
    code: 'CSE-221',
    title: "Midterm Question (Fall '25)",
    uploadedBy: 'Senior Tanvir',
    upvotes: 38,
    term: 'Mid-Term',
    fileUrl: '#',
  },
  {
    id: 'res-2',
    code: 'CSE-311',
    title: 'Database Systems SQL & Normalization PYQ',
    uploadedBy: 'Ayesha Siddiqua',
    upvotes: 29,
    term: 'Final-Term',
    fileUrl: '#',
  },
  {
    id: 'res-3',
    code: 'EEE-212',
    title: 'AC Circuit Analysis & Phasor Diagram Guide',
    uploadedBy: 'Mehedi Zaman',
    upvotes: 18,
    term: 'Lab Manual',
    fileUrl: '#',
  },
  {
    id: 'res-4',
    code: 'BBA-104',
    title: 'Financial Accounting Balance Sheet Quick Formula Sheet',
    uploadedBy: 'Farhana Islam',
    upvotes: 35,
    term: 'Mid-Term',
    fileUrl: '#',
  },
  {
    id: 'res-5',
    code: 'CSE-110',
    title: 'Object Oriented Programming Lab Exercises & Solutions',
    uploadedBy: 'Senior Tanvir',
    upvotes: 42,
    term: 'Lab Manual',
    fileUrl: '#',
  },
  {
    id: 'res-6',
    code: 'MAT-121',
    title: 'Differential Calculus & Vector Analysis Final PYQ',
    uploadedBy: 'Sabbir Hossain',
    upvotes: 24,
    term: 'Final-Term',
    fileUrl: '#',
  },
];

interface ResourceVaultTableProps {
  onContributeClick?: () => void;
  initialResources?: VaultResource[];
}

export const ResourceVaultTable: React.FC<ResourceVaultTableProps> = ({
  onContributeClick,
  initialResources = DEFAULT_RESOURCES,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<VaultResource[]>(initialResources);

  const getTermBadge = (term: VaultResource['term']) => {
    switch (term) {
      case 'Mid-Term':
        return 'bg-red-100 text-[#DC2626]';
      case 'Lab Manual':
        return 'bg-sky-100 text-sky-700';
      case 'Final-Term':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };

  const handleDownload = (resource: VaultResource) => {
    toast.success(`Downloading "${resource.title}" (${resource.code}.pdf)...`);
  };

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
    toast.success('Resource upvoted!');
  };

  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) return resources;
    const q = searchQuery.toLowerCase().trim();
    return resources.filter(
      (r) =>
        r.code.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.uploadedBy.toLowerCase().includes(q) ||
        r.term.toLowerCase().includes(q)
    );
  }, [resources, searchQuery]);

  return (
    <div className="bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Top Header & Search Bar */}
      <div className="space-y-4 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">
              Academic Resource Vault
            </h2>
            <p className="text-xs text-zinc-500">
              Search peer archives, mid-term solutions, and official department lab manuals.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-400 self-start sm:self-auto">
            {filteredResources.length} PAPERS INDEXED
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search 'CSE-221' or 'Algorithms'..."
            className="h-11 pl-4 pr-10 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-[#DC2626] rounded-xl font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-zinc-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              <th className="py-3 px-4">CODE</th>
              <th className="py-3 px-4">RESOURCE TITLE</th>
              <th className="py-3 px-4">TERM</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredResources.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-zinc-400">
                  <FileText className="h-8 w-8 mx-auto text-zinc-300 mb-2" />
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">No resources found</p>
                  <p className="text-[11px]">Try adjusting your search keywords</p>
                </td>
              </tr>
            ) : (
              filteredResources.map((res) => (
                <tr
                  key={res.id}
                  className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors"
                >
                  {/* Column 1: Course Code Badge */}
                  <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                    <span className="bg-[#09090B] text-white font-mono text-xs px-2.5 py-1 rounded font-bold shadow-sm inline-block">
                      {res.code}
                    </span>
                  </td>

                  {/* Column 2: Title & Metadata */}
                  <td className="py-3.5 px-4 align-middle">
                    <div className="space-y-0.5">
                      <p className="font-bold text-zinc-950 dark:text-zinc-100 text-xs sm:text-sm">
                        {res.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium">
                        <span>Uploaded by {res.uploadedBy}</span>
                        <span>•</span>
                        <button
                          onClick={(e) => handleUpvote(res.id, e)}
                          className="inline-flex items-center gap-0.5 font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#DC2626] transition-colors"
                          title="Upvote resource"
                        >
                          <ArrowUp className="h-3 w-3 text-[#DC2626]" />
                          <span>{res.upvotes}</span>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Column 3: Term Badges */}
                  <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${getTermBadge(
                        res.term
                      )}`}
                    >
                      {res.term}
                    </span>
                  </td>

                  {/* Column 4: Action PDF Download Button */}
                  <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(res)}
                      className="bg-[#DC2626] text-white hover:bg-red-700 text-xs font-bold px-3 py-1.5 rounded inline-flex items-center gap-1.5 shadow-sm shadow-red-600/15 transition-all active:scale-95"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA: + Contribute Academic Material */}
      <button
        onClick={onContributeClick}
        className="bg-[#09090B] hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm w-full py-2.5 rounded-lg flex items-center justify-center gap-2 mt-4 transition-all active:scale-[0.99] shadow-sm"
      >
        <Plus className="h-4 w-4 text-[#DC2626]" />
        <span>+ Contribute Academic Material</span>
      </button>
    </div>
  );
};

export default ResourceVaultTable;
