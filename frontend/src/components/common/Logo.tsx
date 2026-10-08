'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  href = '/',
  textColor = 'text-white',
}) => {
  // Dimensions mapping
  const sizeMap = {
    sm: { icon: 32, textTitle: 'text-lg', textSub: 'text-[8px]', height: 32 },
    md: { icon: 42, textTitle: 'text-2xl', textSub: 'text-[10px]', height: 42 },
    lg: { icon: 56, textTitle: 'text-3xl', textSub: 'text-xs', height: 56 },
  };

  const currentSize = sizeMap[size];

  const IconGraphic = (
    <div
      style={{ width: currentSize.icon, height: currentSize.icon }}
      className="relative flex shrink-0 items-center justify-center rounded-[22%] bg-[#DC2626] shadow-sm select-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Academic Mortarboard / Roofline */}
        <path d="M35 16L55 27L35 38L15 27L35 16Z" fill="#FFFFFF" />

        {/* Central Pulse Node */}
        <circle cx="35" cy="35" r="3.5" fill="#DC2626" />

        {/* Terminal Command Chevron */}
        <path
          d="M23 44L35 52L47 44"
          stroke="#09090B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const LogoContent = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {IconGraphic}

      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-black tracking-tight ${textColor} ${currentSize.textTitle}`}>
            CU<span className="text-[#DC2626]">Sync</span>
          </div>
          <span
            className={`font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mt-1 ${currentSize.textSub}`}
          >
            THE SINGLE SOURCE OF TRUTH
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link className="focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-lg" href={href}>
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};

export default Logo;
