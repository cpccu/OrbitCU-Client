import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Github } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090B] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Logo size="sm" variant="full" href="/" textColor="text-[#09090B] dark:text-white" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Autonomous Student Life & Academic Infrastructure Hub for City University.
              Powering events, open courseware, helpdesk support, and grievance governance.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/events" className="hover:text-red-600 transition-colors">
                  Events & RSVP Engine
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-red-600 transition-colors">
                  Academic Vault (Notes & PYQs)
                </Link>
              </li>
              <li>
                <Link href="/helpdesk" className="hover:text-red-600 transition-colors">
                  Smart Helpdesk & FAQs
                </Link>
              </li>
              <li>
                <Link href="/lost-found" className="hover:text-red-600 transition-colors">
                  Lost & Found Repository
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="hover:text-red-600 transition-colors">
                  Grievance Redressal Box
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Judge & Demo Tools
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/login" className="hover:text-red-600 transition-colors font-medium text-red-600 dark:text-red-400">
                  ⚡ 1-Click Judge Demo Login
                </Link>
              </li>
              <li>
                <Link href="/events/my-passes" className="hover:text-red-600 transition-colors">
                  QR Ticket Scanner / Passes
                </Link>
              </li>
              <li>
                <Link href="/complaints/track" className="hover:text-red-600 transition-colors">
                  Public Ticket Status Lookup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Security & Compliance
            </h4>
            <div className="flex items-center space-x-2 text-xs text-zinc-500 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>JWT Authenticated Sessions</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Designed according to City University SRS specifications. Built with Next.js 14,
              TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} CampusOS — City University Hub. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
            <span>for Hackathon Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
