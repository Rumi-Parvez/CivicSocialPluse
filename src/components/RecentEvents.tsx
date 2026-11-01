"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaCalendarDays } from "react-icons/fa6";

import EventCard, { EventItem } from "@/components/EventCard";

interface ApiEvent extends Omit<EventItem, "id"> {
  _id: string;
}

export default function RecentUpcomingEvents() {
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

        const response = await fetch(
          `${serverUrl}/events/recent-upcoming`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events.");
        }

        const data: ApiEvent[] = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = data
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

            return !Number.isNaN(date.getTime()) && date >= today;
          })
          .sort(
            (a, b) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
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
    <section className="bg-slate-50 py-20 dark:bg-slate-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <FaCalendarDays />
              Recent Events Coming Soon
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Make a Difference,
              <span className="text-emerald-600 dark:text-emerald-400">
                {" "}One Event at a Time.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Discover upcoming community events, connect with
              people, and take part in creating positive change.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex shrink-0 items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-all hover:border-emerald-500 hover:bg-emerald-600 hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white sm:self-auto"
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
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
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
          <div className="rounded-3xl border border-red-200 bg-white px-6 py-12 text-center dark:border-red-900 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Unable to load events
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
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <FaCalendarDays size={26} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No Upcoming Events Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
              There are no upcoming events right now.
              Check back soon to discover new opportunities.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
              Browse Events
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}