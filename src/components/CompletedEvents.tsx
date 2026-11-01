"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";

import EventCard, { EventItem } from "@/components/EventCard";

interface ApiEvent extends Omit<EventItem, "id"> {
  _id: string;
}

export default function CompletedEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

        if (!serverUrl) {
          throw new Error("Server URL is not configured.");
        }

        const response = await fetch(`${serverUrl}/events/completed`);

        if (!response.ok) {
          throw new Error("Failed to fetch completed events.");
        }

        const data: ApiEvent[] = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const completedEvents = data
          .map((event) => ({
            ...event,
            id: event._id,
          }))
          .filter((event) => {
            const date = /^\d{4}-\d{2}-\d{2}$/.test(event.eventDate)
              ? (() => {
                  const [year, month, day] = event.eventDate
                    .split("-")
                    .map(Number);

                  return new Date(year, month - 1, day);
                })()
              : new Date(event.eventDate);

            date.setHours(0, 0, 0, 0);

            return !Number.isNaN(date.getTime()) && date < today;
          })
          .sort(
            (a, b) =>
              new Date(b.eventDate).getTime() -
              new Date(a.eventDate).getTime()
          )
          .slice(0, 6);

        setEvents(completedEvents);
        setError("");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [retry]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setRetry((previous) => previous + 1);
  };

  return (
    <section className="bg-white py-20 dark:bg-slate-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              <FaCalendarCheck />
              Completed Community Events
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Together We Made
              <span className="text-emerald-600 dark:text-emerald-400">
                {" "}a Difference.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Look back at our completed community events and
              celebrate the positive changes we created together.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex shrink-0 items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-all hover:border-emerald-500 hover:bg-emerald-600 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white sm:self-auto"
          >
            Explore All Events
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-4 p-6">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white px-6 py-12 text-center dark:border-red-900 dark:bg-slate-950">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Unable to load completed events
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <button
              onClick={handleRetry}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-950">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FaCalendarCheck size={26} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No Completed Events Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
              Completed community events will appear here.
              Stay connected and be part of our community.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
