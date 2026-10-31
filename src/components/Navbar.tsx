"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import LogoB from "./../app/assets/logoB.png";
import LogoW from "./../app/assets/LogoW.png";
import Profilesection from "./Profilesection";

const emptySubscribe = () => () => {};

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && theme === "dark";

  const navLinks = (
    <div className="hidden md:flex items-center gap-8">
      <Link
        href="/"
        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        Home
      </Link>
      <Link
        href="/upcoming-events"
        className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        Upcoming Events
      </Link>
    </div>
  );

  

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={isDark ? LogoW : LogoB}
                alt="Logo"
                width={120}
                height={40}
                className="w-28 h-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div>{navLinks}</div>

          <Profilesection mounted={mounted}></Profilesection>
        </div>
      </div>
    </header>
  );
};

export default Navbar;