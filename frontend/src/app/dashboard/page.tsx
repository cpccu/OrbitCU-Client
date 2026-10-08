'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { MorningHero } from '@/components/dashboard/MorningHero';
import { ModuleStatGrid } from '@/components/dashboard/ModuleStatGrid';
import { LiveCampusFeed } from '@/components/dashboard/LiveCampusFeed';
import { ActivePassWidget } from '@/components/dashboard/ActivePassWidget';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B]/50 py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Morning Greeting Hero Section */}
        <MorningHero
          name={user?.name || 'Tanvir Ahmed'}
          department={user?.department ? `Department of ${user.department}` : 'Department of Computer Science & Engineering'}
          universityId={user?.universityId || '2021-1-60-001'}
        />

        {/* 4 Quick-Action Stat Cards */}
        <ModuleStatGrid />

        {/* Split View Section (60% Left Live Activity Feed, 40% Right Active Pass Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
            <LiveCampusFeed />
          </div>
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <ActivePassWidget
              passHolder={user?.name || 'Tanvir Ahmed'}
              universityId={user?.universityId || '2021-1-60-001'}
              department={user?.department || 'CSE'}
              eventTitle="Programming Contest 2026"
              venue="Lab 4 & 5, Academic Bldg"
              ticketHash="CU-PASS-8849-2021-1-60-001-A9F4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
