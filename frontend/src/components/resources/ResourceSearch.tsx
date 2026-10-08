"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, Filter } from "lucide-react";
import { Department } from "@/types";

interface ResourceSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDept: string;
  onDeptChange: (value: string) => void;
  selectedTerm: string;
  onTermChange: (value: string) => void;
  selectedSession: string;
  onSessionChange: (value: string) => void;
  onReset: () => void;
}

const DEPARTMENTS: (Department | "ALL")[] = [
  "ALL",
  "CSE",
  "EEE",
  "BBA",
  "English",
  "Law",
  "Civil",
  "Pharmacy",
];

const TERMS = [
  "ALL",
  "Mid-Term",
  "Final-Term",
  "Quiz",
  "Lab Manual",
  "Lecture Note",
];

const SESSIONS = ["ALL", "2025-2026", "2024-2025", "2023-2024", "2022-2023"];

export const ResourceSearch: React.FC<ResourceSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedDept,
  onDeptChange,
  selectedTerm,
  onTermChange,
  selectedSession,
  onSessionChange,
  onReset,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
        <Input
          placeholder="Search by course code (e.g. CSE-221), title, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 h-11 text-base bg-slate-50 dark:bg-slate-800/60 rounded-xl"
        />
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Department */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Department
          </label>
          <Select value={selectedDept} onValueChange={onDeptChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept === "ALL" ? "All Departments" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Term / Exam Type */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Category / Term
          </label>
          <Select value={selectedTerm} onValueChange={onTermChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {TERMS.map((term) => (
                <SelectItem key={term} value={term}>
                  {term === "ALL" ? "All Categories" : term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Academic Session */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Academic Session
          </label>
          <Select value={selectedSession} onValueChange={onSessionChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Sessions" />
            </SelectTrigger>
            <SelectContent>
              {SESSIONS.map((session) => (
                <SelectItem key={session} value={session}>
                  {session === "ALL" ? "All Sessions" : session}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Filters Button */}
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full h-9 text-xs flex items-center justify-center space-x-1.5 text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Clear Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
