'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, AlertTriangle, Settings, Search, Crown, ChevronDown, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface StudentGovernanceRow {
  id: string;
  name: string;
  studentId: string;
  dept: string;
  affiliatedClubs: string[];
  role: 'STUDENT' | 'CLUB_ADMIN';
  clubLabel?: string;
}

const INITIAL_STUDENTS: StudentGovernanceRow[] = [
  {
    id: 's-1',
    name: 'Tanvir Ahmed',
    studentId: '2021-1-60-001',
    dept: 'CSE',
    affiliatedClubs: ['CU Computer', 'CU Debating'],
    role: 'STUDENT',
  },
  {
    id: 's-2',
    name: 'Nusrat Jahan',
    studentId: '2020-2-50-012',
    dept: 'BBA',
    affiliatedClubs: ['CU Computer'],
    role: 'CLUB_ADMIN',
    clubLabel: 'CLUB LEAD (CUCC)',
  },
  {
    id: 's-3',
    name: 'Farhana Akter',
    studentId: '2022-2-60-109',
    dept: 'CSE',
    affiliatedClubs: ['CU Computer'],
    role: 'STUDENT',
  },
];

export default function UniversityAdminGovernancePage() {
  const { user, updateUserRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'grievance' | 'audit'>('users');
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<StudentGovernanceRow[]>(INITIAL_STUDENTS);
  const [dropdownUserId, setDropdownUserId] = useState<string | null>(null);

  if (user?.role !== 'UNIVERSITY_ADMIN') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F8F9FA] dark:bg-zinc-950">
        <div className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-[#DC2626] mb-4">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">Access Denied</h2>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6 max-w-md">
          Requires University Administrator credentials to manage governance and club access controls.
        </p>
        <Link href="/login?demo=admin">
          <Button className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-9">
            Sign In as University Super Admin →
          </Button>
        </Link>
      </div>
    );
  }

  const handlePromote = (studentId: string, clubName: string = 'CU Computer Club (CUCC)') => {
    setStudents((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? {
              ...s,
              role: 'CLUB_ADMIN',
              clubLabel: `CLUB LEAD (${clubName.match(/\(([^)]+)\)/)?.[1] || 'CUCC'})`,
            }
          : s
      )
    );
    updateUserRole(studentId, 'CLUB_ADMIN', clubName);
    setDropdownUserId(null);
    toast.success(`Appointed student as Club Lead of ${clubName}`);
  };

  const handleDemote = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? {
              ...s,
              role: 'STUDENT',
              clubLabel: undefined,
            }
          : s
      )
    );
    updateUserRole(studentId, 'STUDENT');
    toast.info('Demoted back to Student role');
  };

  const handleExportCsv = () => {
    const headers = ['STUDENT NAME', 'STUDENT ID', 'DEPT', 'AFFILIATED CLUBS', 'CURRENT ROLE'];
    const rows = students.map((s) => [
      `"${s.name}"`,
      `"${s.studentId}"`,
      `"${s.dept}"`,
      `"${s.affiliatedClubs.join(', ')}"`,
      `"${s.role === 'CLUB_ADMIN' ? s.clubLabel || 'CLUB LEAD' : 'STUDENT'}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'University_Governance_Audit.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported University Governance Audit CSV!');
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        {/* Main Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            University Governance & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium">
            Appoint Club Admins, oversee student affiliations, and resolve campus grievance tickets
          </p>
        </div>

        {/* Tab Controls and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-purple-400" />
              <span>User & Role Management</span>
            </button>

            <button
              onClick={() => setActiveTab('grievance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'grievance'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
              <span>Grievance Resolution (2)</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Settings className="h-3.5 w-3.5 text-zinc-400" />
              <span>System Audit Log</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID or name..."
              className="pl-9 text-xs h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl"
            />
          </div>
        </div>

        {/* Table Container Card */}
        <div className="bg-white dark:bg-[#09090B] border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden p-6 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-900/90 text-zinc-500 dark:text-zinc-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-zinc-200/80 dark:border-zinc-800">
                  <th className="py-3.5 px-4 font-extrabold">STUDENT NAME</th>
                  <th className="py-3.5 px-4 font-extrabold">STUDENT ID</th>
                  <th className="py-3.5 px-4 font-extrabold">DEPT</th>
                  <th className="py-3.5 px-4 font-extrabold">AFFILIATED CLUBS</th>
                  <th className="py-3.5 px-4 font-extrabold">CURRENT ROLE</th>
                  <th className="py-3.5 px-4 font-extrabold text-right">GOVERNANCE ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.studentId}
                    className="hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-zinc-950 dark:text-white">
                      {student.name}
                    </td>
                    <td className="py-4 px-4 font-mono text-zinc-600 dark:text-zinc-300">
                      {student.studentId}
                    </td>
                    <td className="py-4 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                      {student.dept}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {student.affiliatedClubs.map((club) => (
                          <span
                            key={club}
                            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-zinc-200/60 dark:border-zinc-700"
                          >
                            {club}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {student.role === 'CLUB_ADMIN' ? (
                        <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] border border-amber-200">
                          {student.clubLabel || 'CLUB LEAD (CUCC)'}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          STUDENT
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {student.role === 'CLUB_ADMIN' ? (
                        <button
                          onClick={() => handleDemote(student.studentId)}
                          className="border border-[#DC2626] text-[#DC2626] hover:bg-red-50 dark:hover:bg-red-950/40 font-bold text-xs px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Demote to Student
                        </button>
                      ) : (
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setDropdownUserId(
                                dropdownUserId === student.studentId ? null : student.studentId
                              )
                            }
                            className="bg-[#09090B] hover:bg-zinc-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Crown className="h-3.5 w-3.5 text-amber-400" />
                            <span>Appoint as Club Lead</span>
                            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                          </button>

                          {dropdownUserId === student.studentId && (
                            <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg z-20 py-1 text-left">
                              <div className="px-3 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                Select Club to Assign
                              </div>
                              <button
                                onClick={() => handlePromote(student.studentId, 'CU Computer Club (CUCC)')}
                                className="w-full px-3 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left"
                              >
                                CU Computer Club (CUCC)
                              </button>
                              <button
                                onClick={() => handlePromote(student.studentId, 'CU Debating Society (CUDS)')}
                                className="w-full px-3 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left"
                              >
                                CU Debating Society (CUDS)
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              Showing 3 of 142 registered university students
            </span>
            <Button
              onClick={handleExportCsv}
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-bold text-xs h-9 px-4 rounded-xl cursor-pointer self-start sm:self-auto hover:bg-zinc-50"
            >
              Export Audit CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
