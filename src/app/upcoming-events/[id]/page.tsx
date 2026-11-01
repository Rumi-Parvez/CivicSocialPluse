"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaCalendarDays,
  FaLocationDot,
  FaTag,
  FaUser,
  FaUsers,
  FaClock,
  FaCheck,
  FaArrowRight,
  FaCircleExclamation,
} from "react-icons/fa6";

import { authClient } from "@/lib/auth-client";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy:
    | string
    | {
        userId?: string;
        name?: string;
        email?: string;
      };
  createdAt: string;
  attendeesCount?: number;
}

interface EventResponse {
  event?: EventItem;
  attendeesCount?: number;
  isJoined?: boolean;
}

function getEventDate(date: string) {
  const match = date?.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (match) {
    return new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3])
    );
  }

  return new Date(date);
}

function formatDate(date: string) {
  const parsedDate = getEventDate(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCreatedDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCreatorName(createdBy: EventItem["createdBy"]) {
  if (typeof createdBy === "string") {
    return createdBy;
  }

  return createdBy?.name || createdBy?.email || "Community Member";
}

function getCreatorEmail(createdBy: EventItem["createdBy"]) {
  if (typeof createdBy === "string") {
    return createdBy;
  }

  return createdBy?.email || "Community Organizer";
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [attendeesCount, setAttendeesCount] = useState(0);
  const [isJoined, setIsJoined] = useState(false);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchEvent = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

        if (!serverUrl) {
          throw new Error("Server URL is missing.");
        }

        const response = await fetch(`${serverUrl}/events/${id}`, {
          cache: "no-store",
        });

        if (response.status === 404) {
          throw new Error("This event could not be found.");
        }

        if (!response.ok) {
          throw new Error("Failed to load event details.");
        }

        const result: EventItem | EventResponse = await response.json();

        const eventData =
          "event" in result && result.event ? result.event : result;

        const responseData = result as EventResponse;

        if (!ignore) {
          setEvent(eventData as EventItem);
          setAttendeesCount(
            responseData.attendeesCount ??
              (eventData as EventItem).attendeesCount ??
              0
          );
          setIsJoined(responseData.isJoined ?? false);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchEvent();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleJoinEvent = async () => {
    if (!session) {
      router.push(`/sign-in?callbackURL=/upcoming-events/${id}`);
      return;
    }

    if (!event || isJoined || joining) {
      return;
    }

    try {
      setJoining(true);
      setError("");
      setSuccess("");

      const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

      if (!serverUrl) {
        throw new Error("Server URL is missing.");
      }

      const tokenResponse = await authClient.token();
      const token = tokenResponse.data?.token;

      if (!token) {
        throw new Error("Authentication token not found. Please sign in again.");
      }

      const response = await fetch(
        `${serverUrl}/events/${id}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to join this event.");
      }

      setIsJoined(true);
      setAttendeesCount((prev) => prev + 1);
      setSuccess("You have successfully joined this event.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while joining."
      );
    } finally {
      setJoining(false);
    }
  };

  if (loading || sessionLoading) {
    return (
      <main className="min-h-screen bg-slate-50 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-4">
          <div className="h-8 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-[350px] rounded-3xl bg-slate-200 dark:bg-slate-800 md:h-[480px]" />
          <div className="h-10 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <FaCircleExclamation className="mx-auto mb-4 text-3xl text-rose-500" />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Event Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <Link
            href="/upcoming-events"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <FaArrowLeft />
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  if (!event) {
    return null;
  }

  const eventDate = getEventDate(event.eventDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  const isPastEvent = eventDate < today;

  const creatorName = getCreatorName(event.createdBy);
  const creatorEmail = getCreatorEmail(event.createdBy);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <FaArrowLeft />
          Back to Upcoming Events
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-[280px] w-full bg-slate-200 sm:h-[400px] lg:h-[500px] dark:bg-slate-800">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white">
                <FaTag />
                {event.eventType}
              </span>

              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-white/90">
                <span className="flex items-center gap-2">
                  <FaLocationDot />
                  {event.location}
                </span>

                <span className="flex items-center gap-2">
                  <FaCalendarDays />
                  {formatDate(event.eventDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_340px] lg:p-10">
            <div className="space-y-10">
              <section>
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    About This Event
                  </span>

                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                    Event Overview
                  </h2>
                </div>

                <p className="whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-400">
                  {event.description}
                </p>
              </section>

              <section>
                <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
                  Event Information
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <FaCalendarDays />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Event Date
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {formatDate(event.eventDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <FaLocationDot />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                      <FaTag />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Activity Type
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {event.eventType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                      <FaUsers />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Community Members
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {attendeesCount} Joined
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <FaUser />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Organized By
                    </p>

                    <h3 className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
                      {creatorName}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                      {creatorEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <FaClock />
                  Published on {formatCreatedDate(event.createdAt)}
                </div>
              </section>
            </div>

            <aside>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Be Part of the Change
                </span>

                <h2 className="mt-3 text-xl font-extrabold text-slate-900 dark:text-white">
                  Make a Difference Together
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Join your community, participate in this initiative, and
                  contribute to something meaningful.
                </p>

                <div className="my-6 space-y-4 border-y border-slate-100 py-5 dark:border-slate-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <FaCalendarDays />
                      Event Date
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatDate(event.eventDate).split(",").slice(1).join(",").trim()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <FaUsers />
                      Participants
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {attendeesCount} Joined
                    </span>
                  </div>
                </div>

                {error && (
                  <p className="mb-4 rounded-xl bg-rose-50 p-3 text-xs leading-5 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <FaCheck />
                    {success}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleJoinEvent}
                  disabled={joining || isJoined || isPastEvent}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-bold transition-colors ${
                    isJoined
                      ? "cursor-not-allowed bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : isPastEvent
                        ? "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                  } disabled:opacity-90`}
                >
                  {joining ? (
                    "Joining..."
                  ) : isJoined ? (
                    <>
                      <FaCheck />
                      Already Joined
                    </>
                  ) : isPastEvent ? (
                    "Event Completed"
                  ) : (
                    <>
                      Join This Event
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {isJoined
                    ? "You are already part of this event."
                    : isPastEvent
                      ? "Registration for this event is closed."
                      : "Sign in to join this community event."}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
