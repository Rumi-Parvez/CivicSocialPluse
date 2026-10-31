"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaUserLarge, FaRightFromBracket } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp, IoCreateOutline } from "react-icons/io5";
import { MdDarkMode,  MdLightMode, MdOutlineManageAccounts } from "react-icons/md";

import { authClient } from "@/lib/auth-client";

export default function ProfileSection({ mounted }: { mounted: boolean }) {
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isDark = mounted && theme === "dark";

  const handleLogout = async () => {
    setDropdownOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
        
      {mounted && (
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <MdLightMode className="w-6 h-6 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer" />
          ) : (
            <MdDarkMode className="w-6 h-6 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer" />
          )}
        </button>
      )}

      {isPending ? (
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      ) : session?.user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus:outline-none cursor-pointer"
            title={session.user.name || session.user.email || "User Profile"}
          >
            {session.user.image ? (
              <Image
                src={`${session.user.image}`}
                alt={'Profile'}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                {session.user.name ? session.user.name.charAt(0).toUpperCase() : <FaUserLarge className="w-4 h-4" />}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {session.user.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/create-new-event"
                  onClick={() => setDropdownOpen(false)}
                  className="flex gap-3 items-center   px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                 <IoCreateOutline className="w-5 h-5 text-black dark:text-slate-300" />
 Create Event
                </Link>
                <Link
                  href="/manage-events"
                  onClick={() => setDropdownOpen(false)}
                  className="flex gap-3 items-center   px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                 <MdOutlineManageAccounts className="w-5 h-5 text-black dark:text-slate-300" />
                 Manage Events
                </Link>
                <Link
                  href="/joined-events"
                  onClick={() => setDropdownOpen(false)}
                  className="flex gap-3 items-center  px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                 <IoCheckmarkDoneCircleSharp className="w-5 h-5 text-green-600" />
 Joined Events
                </Link>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
                >
                  <FaRightFromBracket className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link href="/login">
            <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-md shadow-emerald-100 dark:shadow-none transition-all cursor-pointer">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
}