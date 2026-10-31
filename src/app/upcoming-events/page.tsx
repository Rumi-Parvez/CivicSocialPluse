"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import {
  FaPlus,
  FaTriangleExclamation,
  FaRotateRight,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import EventCard, { EventItem } from "../../components/EventCard";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Cleanup",
    "Plantation",
    "Donation",
    "Workshop",
    "Healthcare",
  ];

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

      if (!serverUrl) {
        throw new Error("Server URL is missing.");
      }

      const response = await fetch(`${serverUrl}/events`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid events data received from server.");
      }

      const formattedEvents = data.map((event) => ({
        ...event,
        id: event._id?.toString() || event.id,
      }));

      setEvents(formattedEvents);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while fetching events."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadEvents = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

        if (!serverUrl) {
          throw new Error("Server URL is missing.");
        }

        const response = await fetch(`${serverUrl}/events`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid events data received from server.");
        }

        const formattedEvents = data.map((event) => ({
          ...event,
          id: event._id?.toString() || event.id,
        }));

        if (!ignore) {
          setEvents(formattedEvents);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while fetching events."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      ignore = true;
    };
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events
    .filter((evt) => {
      const matchesCategory =
        selectedCategory === "All" ||
        evt.eventType?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        evt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      return (
        new Date(`${a.eventDate}T00:00:00`).getTime() -
        new Date(`${b.eventDate}T00:00:00`).getTime()
      );
    });

  const upcomingEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(`${event.eventDate}T00:00:00`);
    return eventDate >= today;
  });

  const completedEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(`${event.eventDate}T00:00:00`);
    return eventDate < today;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-10 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6  pb-8 md:flex-row md:items-end dark:border-slate-800">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block rounded-full  px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600  dark:text-emerald-400">
              Community Initiatives
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Upcoming Social Events
            </h1>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Discover upcoming community activities, join meaningful
              initiatives, and look back at completed events.
            </p>
          </div>

          
        </div>

        {error && (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400">
            <div className="flex items-center gap-3">
              <FaTriangleExclamation className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>

            <button
              onClick={fetchEvents}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <FaRotateRight className="h-3 w-3" />
              Retry
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                    : "border border-slate-200/60 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search event or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200/60 bg-white py-2 pl-9 pr-4 text-xs text-slate-900 transition-all  focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 animate-pulse space-y-4 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-44 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {upcomingEvents.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Coming Soon
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Events arranged from the nearest date to the latest.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    {upcomingEvents.length} Events
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {upcomingEvents.map((evt) => (
                    <EventCard key={evt.id} event={evt} />
                  ))}
                </div>
              </section>
            )}

            {completedEvents.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
                      Completed Events
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Take a look at our past community initiatives.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {completedEvents.length} Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {completedEvents.map((evt) => (
                    <EventCard
                      key={evt.id}
                      event={evt}
                      isCompleted
                    />
                  ))}
                </div>
              </section>
            )}

            {filteredEvents.length === 0 && (
              <div className="mx-auto max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  ?
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Events Found
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No events match your search or selected category.
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
