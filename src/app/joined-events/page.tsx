"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LuCalendarDays,
  LuMapPin,
  LuArrowUpRight,
  LuCalendarCheck,
  LuLogOut,
} from "react-icons/lu";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface JoinedEvent {
  _id: string;
  id?: string;
  joinRecordId: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

interface JoinedEventRecord {
  _id: string;
  eventData: Omit<JoinedEvent, "joinRecordId">;
  userData: {
    name: string;
    email: string;
    image: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

const JoinedEventsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;

    const email = session?.user?.email;

    if (!email) {
      router.replace("/sign-in");
      return;
    }

    let active = true;

    const loadEvents = async () => {
      try {
        if (!API_URL) {
          throw new Error("Server URL is not configured.");
        }

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${API_URL}/join/${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to load joined events.");
        }

        const result: unknown = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid joined events response.");
        }

        const joinedEvents: JoinedEvent[] = (
          result as JoinedEventRecord[]
        )
          .map((item) => ({
            ...item.eventData,
            joinRecordId: item._id,
          }))
          .filter(
            (event): event is JoinedEvent =>
              Boolean(event?._id && event?.eventDate && event?.joinRecordId)
          );

        const sortedEvents = [...joinedEvents].sort(
          (a, b) =>
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime()
        );

        if (active) {
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Joined Events Error:", error);

        if (active) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Something went wrong."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      active = false;
    };
  }, [isPending, session?.user?.email, router]);

  const handleLeaveEvent = async (event: JoinedEvent) => {
    if (deletingId || !event.joinRecordId) return;

    try {
      if (!API_URL) {
        throw new Error("Server URL is not configured.");
      }

      setDeletingId(event.joinRecordId);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        `${API_URL}/join/${encodeURIComponent(event._id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to leave this event."
        );
      }

      setEvents((previousEvents) =>
        previousEvents.filter(
          (item) => item.joinRecordId !== event.joinRecordId
        )
      );

      toast.success("You have left the event.");
    } catch (error) {
      console.error("Leave Event Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-500" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:300ms]" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Your Activities
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Joined Events
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Keep track of the events you have joined. Discover your upcoming
            activities and stay connected with your community.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Joined Events
            </p>
            <h2 className="mt-1 text-3xl font-black">{events.length}</h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <LuCalendarCheck size={25} />
          </div>
        </div>

        {events.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-5 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <LuCalendarDays size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-black">
              Your Journey Starts Here
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
              You {`haven't`} joined any events yet. Discover exciting community
              activities and become part of something meaningful.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-700"
            >
              Discover Events
              <LuArrowUpRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const eventId = event._id || event.id || "";
              const eventDate = new Date(event.eventDate);
              const validDate = !Number.isNaN(eventDate.getTime());
              const isPast =
                validDate && eventDate.getTime() < new Date().getTime();
              const isDeleting = deletingId === event.joinRecordId;

              return (
                <article
                  key={event.joinRecordId}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    {event.thumbnail ? (
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <LuCalendarDays size={48} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                        {event.eventType || "Community Event"}
                      </span>
                    </div>

                    <div className="absolute right-5 top-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg">
                        <LuCalendarCheck size={14} />
                        Joined
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
                        {isPast ? "Completed Event" : "Upcoming Event"}
                      </p>

                      <h3 className="line-clamp-2 text-2xl font-black leading-tight text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {event.description}
                    </p>

                    <div className="my-5 space-y-4 border-y border-slate-100 py-5 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <LuCalendarDays size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            Event Date
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {validDate
                              ? eventDate.toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "Date unavailable"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <LuMapPin size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            Location
                          </p>

                          <p className="mt-1 line-clamp-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {event.location || "Location unavailable"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href={`/upcoming-events/${eventId}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
                      >
                        View Event Details
                        <LuArrowUpRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleLeaveEvent(event)}
                        disabled={Boolean(deletingId)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                      >
                        <LuLogOut size={18} />
                        {isDeleting ? "Leaving..." : "Leave Event"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;
