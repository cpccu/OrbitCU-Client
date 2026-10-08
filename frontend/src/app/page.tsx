'use client';

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import LivePulseWidget from '@/components/landing/LivePulseWidget';
import ModuleShowcaseGrid from '@/components/landing/ModuleShowcaseGrid';
import AcademicVaultShowcase from '@/components/landing/AcademicVaultShowcase';
import ProblemSolutionBanner from '@/components/landing/ProblemSolutionBanner';
import Footer from '@/components/common/Footer';
import AuthGateDialog from '@/components/common/AuthGateDialog';

export default function LandingPage() {
  const [gateOpen, setGateOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('access this campus hub');
  const [redirectPath, setRedirectPath] = useState('/dashboard');

  const handleOpenGate = (title: string, path: string = '/dashboard') => {
    setModalTitle(title);
    setRedirectPath(path);
    setGateOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-zinc-950">
      <Navbar />

      <main className="flex-1">
        {/* Top Hero & Live Stream Strip */}
        <section className="py-12 lg:py-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <HeroSection onGateTrigger={handleOpenGate} />
            </div>
            <div className="lg:col-span-5">
              <LivePulseWidget onActionBlocked={handleOpenGate} />
            </div>
          </div>
        </section>

        {/* 4 Core Campus Modules */}
        <section id="modules" className="py-16 container mx-auto px-4 lg:px-8">
          <ModuleShowcaseGrid onGateTrigger={handleOpenGate} />
        </section>

        {/* Gated Academic Resource Vault Showcase */}
        <AcademicVaultShowcase onGateTrigger={handleOpenGate} />

        {/* The Campus Paradigm Shift Banner */}
        <ProblemSolutionBanner />
      </main>

      <Footer />

      <AuthGateDialog
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        resourceTitle={modalTitle}
        redirectUrl={redirectPath}
      />
    </div>
  );
}
