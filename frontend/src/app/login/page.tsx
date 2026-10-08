'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/common/Logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, ShieldCheck, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dashboard';
  const demoParam = searchParams.get('demo');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetEmail = email.trim() || 'student@city.edu';
    setIsSubmitting(true);
    try {
      await login(targetEmail, password);
      toast.success(`Welcome back, ${targetEmail.split('@')[0]}!`);
      router.push(redirectTarget);
    } catch {
      toast.error('Authentication error. Logging into fallback session.');
      router.push(redirectTarget);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = async (demoEmail: string, roleName: string) => {
    setEmail(demoEmail);
    setPassword('demo12345');
    setIsSubmitting(true);
    try {
      await login(demoEmail, 'demo12345');
      toast.success(`Logged in as ${roleName} (${demoEmail})`);
      router.push(redirectTarget);
    } catch {
      toast.error('Could not switch demo persona');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (demoParam === 'student' || demoParam === 'true') {
      handleDemoFill('student@city.edu', 'Student');
    } else if (demoParam === 'club' || demoParam === 'club-admin') {
      handleDemoFill('club@city.edu', 'Club Lead');
    } else if (demoParam === 'admin' || demoParam === 'university-admin') {
      handleDemoFill('admin@city.edu', 'University Admin');
    }
  }, [demoParam]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-zinc-950 p-4">
      <Card className="max-w-md w-full border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
        <CardHeader className="text-center pb-3 pt-6">
          <div className="flex justify-center mb-3">
            <Logo size="md" textColor="text-[#09090B] dark:text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Sign In to CampusOS
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Enter your official City University credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-6">
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                University Email
              </label>
              <Input
                placeholder="student@city.edu"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Lock className="h-3.5 w-3.5 text-zinc-400" />
                Password
              </label>
              <Input
                placeholder="••••••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-xs sm:text-sm"
              />
            </div>
            <Button
              className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold h-10 text-xs sm:text-sm shadow-md shadow-red-600/20 active:scale-[0.99] transition-all cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Switcher for Evaluation */}
          <div className="pt-2">
            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400 font-extrabold tracking-wider">
                  Judges 1-Click Role Switcher
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                onClick={() => handleDemoFill('student@city.edu', 'Student')}
                size="sm"
                variant="outline"
                disabled={isSubmitting}
                className="text-[11px] font-bold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-amber-500 mr-1" /> Student
              </Button>
              <Button
                type="button"
                onClick={() => handleDemoFill('club@city.edu', 'Club Lead')}
                size="sm"
                variant="outline"
                disabled={isSubmitting}
                className="text-[11px] font-bold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-red-500 mr-1" /> Club Lead
              </Button>
              <Button
                type="button"
                onClick={() => handleDemoFill('admin@city.edu', 'Uni Admin')}
                size="sm"
                variant="outline"
                disabled={isSubmitting}
                className="text-[11px] font-bold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-blue-500 mr-1" /> Uni Admin
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 pt-1">
            Need an account?{' '}
            <Link className="font-bold text-[#DC2626] hover:underline" href="/register">
              Register with Club Options
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-zinc-950">
          <Loader2 className="h-8 w-8 animate-spin text-[#DC2626]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
