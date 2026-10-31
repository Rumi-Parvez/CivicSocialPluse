"use client";

import React, { useState, useEffect, useCallback } from "react";

import {
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
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid events data received from server.");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingEvents = data.filter((event) => {
        if (!event.eventDate) return false;

        const eventDate = new Date(`${event.eventDate}T00:00:00`);

        return (
          !Number.isNaN(eventDate.getTime()) &&
          eventDate >= today
        );
      });

      setEvents(upcomingEvents);
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
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid events data received from server.");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingEvents = data.filter((event) => {
        if (!event.eventDate) return false;

        const eventDate = new Date(`${event.eventDate}T00:00:00`);

        return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
      });

      if (!ignore) {
        setEvents(upcomingEvents);
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

  const filteredEvents = events.filter((evt) => {
    const matchesCategory =
      selectedCategory === "All" ||
      evt.eventType?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      evt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400  px-3 py-1 rounded-full inline-block">
              COMMUNITY INITIATIVES
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Upcoming Social Events
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover local drives, join hands-on environmental projects,
              and track social welfare events happening near you.
            </p>
          </div>

    
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaTriangleExclamation className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>

            <button
              onClick={fetchEvents}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FaRotateRight className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat, ind) => (
              <button
                key={ind}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />

            <input
              type="text"
              placeholder="Search event or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl h-96 p-4 space-y-4 animate-pulse"
              >
                <div className="w-full h-44 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((evt, ind ) => (
              <EventCard
                key={ind}
                event={evt}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-lg font-bold">
              ?
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No Events Found
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              There are currently no events matching your criteria. Try
              switching categories or publish a new event.
            </p>

            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
