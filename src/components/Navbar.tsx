"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdMenu, MdClose } from "react-icons/md";

import LogoB from "./../app/assets/logoB.png";
import LogoW from "./../app/assets/LogoW.png";
import Profilesection from "./Profilesection";

const emptySubscribe = () => () => {};

const Navbar = () => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && theme === "dark";

  const navLinkClass =
    "text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  const mobileLinkClass =
    "block w-full rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800 dark:hover:text-emerald-400 transition-colors";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">


          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMenu}>
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


          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLinkClass}>
              Home
            </Link>

            <Link
              href="/upcoming-events"
              className={navLinkClass}
            >
              Upcoming Events
            </Link>
          </nav>


          <div className="flex items-center gap-2 sm:gap-3">

            <div className="shrink-0">
              <Profilesection mounted={mounted} />
            </div>


            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {menuOpen ? (
                <MdClose size={25} />
              ) : (
                <MdMenu size={25} />
              )}
            </button>

          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-40 opacity-100 pb-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">

            <Link
              href="/"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              Home
            </Link>

            <Link
              href="/upcoming-events"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              Upcoming Events
            </Link>

          </nav>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
