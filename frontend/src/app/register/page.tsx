'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/common/Logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Department } from '@/types';
import { CAMPUS_CLUBS } from '@/constants/enums';
import { CheckCircle2, Shield, User, Hash, Mail, Lock, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState<Department>('CSE');
  const [password, setPassword] = useState('');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isNoneSelected, setIsNoneSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleClubToggle = (club: string) => {
    if (isNoneSelected) {
      setIsNoneSelected(false);
    }
    setSelectedClubs((prev) =>
      prev.includes(club) ? prev.filter((c) => c !== club) : [...prev, club]
    );
  };

  const handleNoneToggle = () => {
    setIsNoneSelected(true);
    setSelectedClubs([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !universityId.trim() || !email.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        universityId: universityId.trim(),
        email: email.trim(),
        department,
        clubMemberships: isNoneSelected ? [] : selectedClubs,
      });
      toast.success('Registration complete! Welcome to CampusOS.');
      router.push('/dashboard');
    } catch {
      toast.error('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-zinc-950 p-4 py-12">
      <Card className="max-w-xl w-full border-zinc-200 dark:border-zinc-800 shadow-lg bg-white dark:bg-zinc-900">
        <CardHeader className="text-center pb-4 pt-6">
          <div className="flex justify-center mb-3">
            <Logo size="md" textColor="text-[#09090B] dark:text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Create Your CampusOS Account
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Join the official City University digital hub & member directory
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                  <User className="h-3.5 w-3.5 text-zinc-400" />
                  Full Name
                </label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tanvir Ahmed"
                  className="h-10 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                  <Hash className="h-3.5 w-3.5 text-zinc-400" />
                  Student ID
                </label>
                <Input
                  required
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  placeholder="2021-1-60-001"
                  className="h-10 text-xs sm:text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                  <Mail className="h-3.5 w-3.5 text-zinc-400" />
                  Campus Email
                </label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@city.edu"
                  className="h-10 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                  <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#DC2626] outline-none"
                >
                  <option value="CSE">CSE (Computer Science & Engineering)</option>
                  <option value="EEE">EEE (Electrical & Electronic Engineering)</option>
                  <option value="BBA">BBA (Business Administration)</option>
                  <option value="English">English</option>
                  <option value="Law">Law</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Pharmacy">Pharmacy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Lock className="h-3.5 w-3.5 text-zinc-400" />
                Password
              </label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="h-10 text-xs sm:text-sm"
              />
            </div>

            {/* Club Affiliations Section */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#DC2626]" />
                  Campus Club Affiliations (Select all that apply)
                </label>
                <span className="text-[10px] font-mono text-zinc-400">
                  {isNoneSelected ? '0 selected' : `${selectedClubs.length} selected`}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Your profile will appear on the verified roster of your selected clubs.
              </p>

              {/* "None" option */}
              <label
                className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isNoneSelected
                    ? 'border-zinc-400 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isNoneSelected}
                  onChange={handleNoneToggle}
                  className="rounded text-[#DC2626] focus:ring-red-500 h-4 w-4 accent-[#DC2626] cursor-pointer"
                />
                <span className="text-xs font-semibold">
                  None / Not a member of any club yet
                </span>
              </label>

              {/* Multi-Club Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {CAMPUS_CLUBS.map((club) => {
                  const isChecked = selectedClubs.includes(club);
                  return (
                    <label
                      key={club}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer text-xs font-medium ${
                        isChecked
                          ? 'border-[#DC2626] bg-red-50/70 dark:bg-red-950/30 text-zinc-950 dark:text-white font-bold shadow-sm'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleClubToggle(club)}
                        className="rounded text-[#DC2626] focus:ring-red-500 h-4 w-4 accent-[#DC2626] cursor-pointer"
                      />
                      <span className="truncate">{club}</span>
                      {isChecked && <CheckCircle2 className="h-3 w-3 text-[#DC2626] ml-auto shrink-0" />}
                    </label>
                  );
                })}
              </div>
            </div>

            <Button
              className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold h-11 text-xs sm:text-sm mt-3 shadow-md shadow-red-600/20 active:scale-[0.99] transition-all cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Account →'}
            </Button>

            <p className="text-center text-xs text-zinc-500 pt-1">
              Already have an account?{' '}
              <Link className="font-bold text-[#DC2626] hover:underline" href="/login">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
