'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/radio', icon: '📻', label: 'Radio' },
  { href: '/search', icon: '🔍', label: 'Search' },
  { href: '/library', icon: '📚', label: 'Library' },
  { href: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[999] md:hidden"
      aria-label="Mobile navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Thin progress bar placeholder at top (will be the mini player bar) */}
      <div
        className="border-t border-[rgba(212,168,67,0.2)] bg-[rgba(13,8,8,0.97)] backdrop-blur-xl"
      >
        <div className="flex items-stretch">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`bottom-nav-${item.label.toLowerCase()}`}
                className={`flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-all ${
                  isActive
                    ? 'text-[#d4a843]'
                    : 'text-[#5a4a3a] hover:text-[#a0896a]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`text-xl leading-none transition-transform ${ isActive ? 'scale-110' : '' }`} aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-[9px] font-semibold tracking-wide uppercase">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-[#d4a843]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
