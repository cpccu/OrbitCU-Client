'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  Users,
  LogOut,
  Calendar,
  BookOpen,
  HelpCircle,
  Search,
  Sparkles,
  Menu,
  X,
  Zap,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicNavLinks = [
    { label: 'Campus Events', href: '/events', icon: Calendar },
    { label: 'Rules & FAQs', href: '/helpdesk', icon: HelpCircle },
    { label: 'Lost & Found', href: '/lost-found', icon: Search },
    { label: 'Track Ticket', href: '/complaints/track', icon: ShieldAlert },
  ];

  const studentNavLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: Sparkles },
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Resource Vault', href: '/resources', icon: BookOpen },
    { label: 'Helpdesk', href: '/helpdesk', icon: HelpCircle },
    { label: 'Lost & Found', href: '/lost-found', icon: Search },
  ];

  const staffNavLinks = [
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Resource Vault', href: '/resources', icon: BookOpen },
    { label: 'Helpdesk', href: '/helpdesk', icon: HelpCircle },
  ];

  const appNavLinks = !user
    ? publicNavLinks
    : user.role === 'STUDENT'
    ? studentNavLinks
    : staffNavLinks;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'CU';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090B] text-white border-b border-zinc-800 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Logo size="md" variant="full" href="/" textColor="text-white" />
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-6">
          {appNavLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold transition-colors pb-1 flex items-center gap-1.5 ${
                  active
                    ? 'text-white border-b-2 border-[#DC2626]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Role-Specific Option: Club Admin Roster (Orange/Amber Pill matching Screenshot 1) */}
          {user?.role === 'CLUB_ADMIN' && (
            <Link
              href="/club-admin"
              className={`text-xs font-bold flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all shadow-sm ${
                pathname === '/club-admin'
                  ? 'bg-[#B45309] text-white ring-2 ring-amber-400/40'
                  : 'bg-[#B45309] hover:bg-[#92400E] text-white'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-white" />
              <span>My Club ({user?.adminOfClub ? user.adminOfClub.match(/\(([^)]+)\)/)?.[1] || 'CUCC' : 'CUCC'})</span>
            </Link>
          )}

          {/* Role-Specific Option: University Super Admin Console (Red Pill matching Screenshot 2) */}
          {user?.role === 'UNIVERSITY_ADMIN' && (
            <Link
              href="/admin"
              className={`text-xs font-bold flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all shadow-sm ${
                pathname === '/admin'
                  ? 'bg-[#DC2626] text-white ring-2 ring-red-400/40'
                  : 'bg-[#DC2626] hover:bg-red-700 text-white'
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5 text-white" />
              <span>Admin Console</span>
            </Link>
          )}
        </nav>

        {/* User Session Profile / Auth Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">
                  {user?.role === 'UNIVERSITY_ADMIN' ? 'Prof. Dr. M. Ra' : user?.name}
                </p>
              </div>

              {/* User Avatar Circle */}
              <div
                className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[11px] font-black text-white shrink-0 select-none shadow-inner"
                title={`${user?.name} (${user?.role})`}
              >
                {user?.role === 'UNIVERSITY_ADMIN' ? 'MR' : getInitials(user?.name)}
              </div>

              {/* Quick links pill on small screens */}
              {user?.role === 'UNIVERSITY_ADMIN' && (
                <Link
                  href="/admin"
                  className="lg:hidden text-[11px] font-bold bg-[#DC2626] text-white px-2.5 py-1 rounded-md"
                >
                  Admin
                </Link>
              )}
              {user?.role === 'CLUB_ADMIN' && (
                <Link
                  href="/club-admin"
                  className="lg:hidden text-[11px] font-bold bg-[#B45309] text-white px-2.5 py-1 rounded-md"
                >
                  My Club
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-1.5 h-8 w-8 rounded-lg cursor-pointer"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login?demo=student" className="hidden sm:inline-block">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-zinc-800 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800 text-xs font-bold h-9 px-3 rounded-lg cursor-pointer"
                >
                  <Zap className="h-3.5 w-3.5 text-amber-400 mr-1" />
                  Demo
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs h-9 px-4 rounded-lg cursor-pointer shadow-sm shadow-red-600/20">
                  Sign In →
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-zinc-400 hover:text-white p-1 rounded-md"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-[#09090B] px-4 py-3 space-y-2">
          {appNavLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold ${
                  active ? 'bg-red-950/40 text-red-400 border border-red-900/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {user?.role === 'CLUB_ADMIN' && (
            <Link
              href="/club-admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#B45309] text-white"
            >
              <Users className="h-4 w-4" />
              <span>My Club ({user?.adminOfClub ? user.adminOfClub.match(/\(([^)]+)\)/)?.[1] || 'CUCC' : 'CUCC'})</span>
            </Link>
          )}

          {user?.role === 'UNIVERSITY_ADMIN' && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#DC2626] text-white"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Admin Console</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export { Navbar };
