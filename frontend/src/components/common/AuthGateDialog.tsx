'use client';

import React from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Zap, LogIn } from 'lucide-react';

interface AuthGateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionTitle?: string;
  resourceTitle?: string;
  redirectUrl?: string;
}

export const AuthGateDialog: React.FC<AuthGateDialogProps> = ({
  isOpen,
  onClose,
  actionTitle,
  resourceTitle,
  redirectUrl = '/resources',
}) => {
  const targetLabel = actionTitle || resourceTitle || 'access this feature';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <DialogHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-[#DC2626] dark:bg-red-950/40 mb-2">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl font-bold text-zinc-950 dark:text-white">
            Student Authentication Required
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            You need a verified City University account to <span className="font-semibold text-zinc-900 dark:text-zinc-200">{targetLabel}</span>. Sign in with your Student ID or use Judge Demo mode.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          <Button
            asChild
            className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In with University ID
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-zinc-900 bg-zinc-950 text-white hover:bg-zinc-800 font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Link
              href={`/login?demo=student&redirect=${encodeURIComponent(redirectUrl)}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4 text-yellow-400" />
              1-Click Judge Demo Login
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthGateDialog;
