"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  FaArrowRight,
  FaEnvelope,
  FaCheck,
  FaRegPaperPlane,
  FaUsers,
} from "react-icons/fa6";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setStatus("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setStatus("success");
      toast.success("Thanks for subscribing! Stay connected with our community.");
      setMessage("Thanks for subscribing! Stay connected with our community.");
      setEmail("");
      setLoading(false);
    }, 700);
  };

  return (
    <section className="bg-white dark:bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 transition-colors">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 px-6 py-14  sm:px-12 lg:px-16 lg:py-20 transition-colors">
        
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Small Updates.
                <span className="block text-emerald-600 dark:text-emerald-400">
                  Bigger Impact.
                </span>
              </h2>

              <p className="max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Be part of something meaningful. Get the latest community
                events, volunteering opportunities, and inspiring stories
                delivered straight to your inbox.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                  <FaUsers />
                </span>
                <span>Community first</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                  <FaCheck />
                </span>
                <span>Meaningful updates</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-6 shadow-sm dark:shadow-xl sm:p-8">
            <div className="mb-6 space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-xl text-emerald-600 dark:text-emerald-400">
                <FaEnvelope />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Join Our Newsletter
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Subscribe to discover new ways to make a difference.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <label
                htmlFor="newsletter-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Your Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-11 py-4 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:focus:ring-emerald-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-emerald-600 dark:bg-emerald-500 px-5 py-4 text-sm font-extrabold text-white dark:text-slate-950 transition-all duration-300 hover:bg-emerald-700 dark:hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe Now"}

                {!loading && (
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>

              {message && (
                <p
                  role="status"
                  className={`rounded-xl px-4 py-3 text-xs font-medium leading-5 ${
                    status === "success"
                      ? "border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                      : "border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>

            
          </div>
        </div>
      </div>
    </section>
  );
}