"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LuCalendarDays,
  LuMapPin,
  LuArrowUpRight,
  LuCalendarCheck,
} from "react-icons/lu";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface JoinedEvent {
  _id: string;
  id?: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

const API_URL = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

const JoinedEventsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJoinedEvents = useCallback(async () => {
    if (!API_URL) {
      throw new Error("Server URL is not configured.");
    }

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Authentication token not found.");
    }

    const response = await fetch(`${API_URL}/events/joined`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Failed to load joined events.");
    }

    const result = await response.json();

    const joinedEvents: JoinedEvent[] = Array.isArray(result)
      ? result
      : result.events ?? [];

    const sortedEvents = [...joinedEvents].sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    );

    setEvents(sortedEvents);
  }, []);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    let active = true;

    const loadEvents = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Authentication token not found.");
        }

        if (!API_URL) {
          throw new Error("Server URL is not configured.");
        }

        const response = await fetch(`${API_URL}/events/joined`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to load joined events.");
        }

        const result = await response.json();

        const joinedEvents: JoinedEvent[] = Array.isArray(result)
          ? result
          : result.events ?? [];

        const sortedEvents = [...joinedEvents].sort(
          (a, b) =>
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime()
        );

        if (active) {
          setEvents(sortedEvents);
        }
      } catch (error) {
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
  }, [isPending, session?.user, router]);

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
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <LuCalendarDays size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              You {`haven't`} joined any events yet. Explore upcoming events and
              become part of your community.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              Explore Events
              <LuArrowUpRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const eventId = event._id || event.id || "";

              return (
                <article
                  key={eventId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative h-52 w-full bg-slate-200 dark:bg-slate-800">
                    {event.thumbnail ? (
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <LuCalendarDays size={40} />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                      {event.eventType}
                    </span>

                    <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      Joined
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-1 text-xl font-bold">
                      {event.title}
                    </h2>

                    <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <p className="flex items-center gap-2">
                        <LuMapPin
                          size={17}
                          className="shrink-0 text-emerald-600"
                        />
                        <span className="line-clamp-1">{event.location}</span>
                      </p>

                      <p className="flex items-center gap-2">
                        <LuCalendarDays
                          size={17}
                          className="shrink-0 text-emerald-600"
                        />
                        {new Date(event.eventDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <Link
                      href={`/upcoming-events/${eventId}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                      View Event Details
                      <LuArrowUpRight size={17} />
                    </Link>
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
