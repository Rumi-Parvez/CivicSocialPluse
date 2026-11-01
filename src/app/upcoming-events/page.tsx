"use client";

import { useEffect, useState } from "react";

import {
  FaTriangleExclamation,
  FaRotateRight,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

import EventCard, { EventItem } from "../../components/EventCard";

const ITEMS_PER_PAGE = 20;

const categories = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Workshop",
  "Healthcare",
];

function getDateKey(date: string) {
  if (!date) return null;

  const dateOnlyMatch = date.match(/^(\d{4}-\d{2}-\d{2})/);

  if (dateOnlyMatch) {
    return dateOnlyMatch[1];
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

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

        const formattedEvents: EventItem[] = data.map(
          (event: EventItem & { _id?: string }) => ({
            ...event,
            id: event._id?.toString() || event.id,
          })
        );

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
  }, [retryCount]);

  const todayKey = getTodayKey();

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" ||
      event.eventType?.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      event.title?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const upcomingEvents = filteredEvents
    .filter((event) => {
      const dateKey = getDateKey(event.eventDate);
      return dateKey !== null && dateKey >= todayKey;
    })
    .sort((a, b) => {
      return getDateKey(a.eventDate)!.localeCompare(getDateKey(b.eventDate)!);
    });

  const completedEvents = filteredEvents
    .filter((event) => {
      const dateKey = getDateKey(event.eventDate);
      return dateKey !== null && dateKey < todayKey;
    })
    .sort((a, b) => {
      return getDateKey(b.eventDate)!.localeCompare(getDateKey(a.eventDate)!);
    });

  const orderedEvents = [...upcomingEvents, ...completedEvents];

  const totalPages = Math.ceil(orderedEvents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentEvents = orderedEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const currentUpcomingEvents = currentEvents.filter(
    (event) => getDateKey(event.eventDate)! >= todayKey
  );

  const currentCompletedEvents = currentEvents.filter(
    (event) => getDateKey(event.eventDate)! < todayKey
  );

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setRetryCount((prev) => prev + 1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-10 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
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
              onClick={handleRetry}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <FaRotateRight className="h-3 w-3" />
              Retry
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                    : "border border-slate-200/60 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search event or city..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200/60 bg-white py-2 pl-9 pr-4 text-xs text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
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
            {currentUpcomingEvents.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Coming Soon
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Events arranged from the nearest date.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    {upcomingEvents.length} Events
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentUpcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {currentCompletedEvents.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
                      Completed Events
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Recently completed events appear first.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {completedEvents.length} Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentCompletedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                    />
                  ))}
                </div>
              </section>
            )}

            {orderedEvents.length === 0 && (
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
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + ITEMS_PER_PAGE, orderedEvents.length)}{" "}
                  of {orderedEvents.length} events
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <FaChevronLeft />
                    Previous
                  </button>

                  <span className="px-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Next
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
