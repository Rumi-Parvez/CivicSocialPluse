"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FaCalendarDays,
  FaLocationDot,
  FaUsers,
  FaArrowLeft,
  FaTriangleExclamation,
  FaRotateRight,
  FaUser,
  FaLeaf,
} from "react-icons/fa6";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";

interface EventData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy: string;
  creatorName: string;
  creatorImage: string;
  createdAt: string;
  attendeesCount?: number;
}

interface JoinStatus {
  isJoined: boolean;
  attendeesCount: number;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const eventId = params.id as string;

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinStatus, setJoinStatus] = useState<JoinStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const currentJoinStatus = session?.user?.email ? joinStatus : null;

  const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

  const fetchEvent = useCallback(async () => {
    if (!serverUrl || !eventId) {
      throw new Error("Server URL or event ID is missing.");
    }

    const response = await fetch(`${serverUrl}/events/${eventId}`, {
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid API response.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load event.");
    }

    setEvent(data);
  }, [serverUrl, eventId]);

  const fetchJoinStatus = useCallback(async () => {
    if (!serverUrl || !eventId || !session?.user?.email) {
      setJoinStatus(null);
      return;
    }

    try {
      setStatusLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        `${serverUrl}/join/${eventId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to check join status."
        );
      }

      setJoinStatus({
        isJoined: result.isJoined,
        attendeesCount: result.attendeesCount,
      });
    } catch (error) {

      setJoinStatus(null);
    } finally {
      setStatusLoading(false);
    }
  }, [serverUrl, eventId, session?.user?.email]);

  useEffect(() => {
    let ignore = false;

    const loadEvent = async () => {
      try {
        setLoading(true);

        if (!serverUrl || !eventId) {
          throw new Error("Server URL or event ID is missing.");
        }

        const response = await fetch(`${serverUrl}/events/${eventId}`, {
          cache: "no-store",
        });

        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid API response.");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load event.");
        }

        if (!ignore) {
          setEvent(data);
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

    loadEvent();

    return () => {
      ignore = true;
    };
  }, [eventId, serverUrl]);

  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.user?.email) return;

    queueMicrotask(() => {
      void fetchJoinStatus();
    });
  }, [sessionLoading, session?.user?.email, fetchJoinStatus]);

  const handleJoinEvent = async () => {
    if (joinLoading || !event) return;

    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    if (!serverUrl) {
      toast.error("Server URL is missing.");
      return;
    }

    if (joinStatus?.isJoined) return;

    try {
      setJoinLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Please sign in again.");
      }

      const response = await fetch(`${serverUrl}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          eventData: event,
          userData: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || "",
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to join event."
        );
      }

      toast.success("You have joined the event!");

      await fetchJoinStatus();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setJoinLoading(false);
    }
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");

      await fetchEvent();

      if (session?.user?.email) {
        await fetchJoinStatus();
      }
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

  const formatDate = (date: string) => {
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? (() => {
          const [year, month, day] = date.split("-").map(Number);
          return new Date(year, month - 1, day);
        })()
      : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Date TBA";

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isCompleted = event
    ? new Date(`${event.eventDate}T00:00:00`).getTime() <
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).getTime()
    : false;

  const isOrganizer = session?.user?.email === event?.createdBy;

  if (loading || sessionLoading || statusLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl animate-pulse space-y-8">
          <div className="h-8 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="h-[350px] rounded-3xl bg-slate-200 dark:bg-slate-800" />

          <div className="grid gap-8 md:grid-cols-3">
            <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 md:col-span-2" />
            <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <FaTriangleExclamation className="mx-auto h-12 w-12 text-rose-500" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Event Not Available
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {error || "We could not find this event."}
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <FaRotateRight />
              Retry
            </button>

            <Link
              href="/upcoming-events"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-white"
            >
              Go Back
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const organizerName = event.creatorName;
  const organizerImage = event.creatorImage;

  return (
    <main className="min-h-screen bg-slate-50 py-10 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400"
        >
          <FaArrowLeft />
          Back to Events
        </Link>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-[260px] w-full sm:h-[600px]">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full space-y-3 p-6 sm:p-10">
              <span className="inline-flex rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white">
                {event.eventType}
              </span>

              <h1 className="max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-sm text-white/90">
                <span className="flex items-center gap-2">
                  <FaCalendarDays />
                  {formatDate(event.eventDate)}
                </span>

                <span className="flex items-center gap-2">
                  <FaLocationDot />
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-3 md:p-10">
            <div className="space-y-8 md:col-span-2">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  About This Event
                </h2>

                <p className="whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-400">
                  {event.description}
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Event Information
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <FaCalendarDays />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Event Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {formatDate(event.eventDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <FaLocationDot />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                      <FaUsers />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Participants
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {currentJoinStatus?.attendeesCount} Joined
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                      <FaLeaf />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Activity Type
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {event.eventType}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6 ">
              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">
                  Event Organizer
                </h2>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-emerald-500 bg-slate-100 dark:bg-slate-800">
                    {organizerImage ? (
                      <Image
                        src={organizerImage}
                        alt={organizerName}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <FaUser className="h-7 w-7" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 truncate font-bold text-slate-900 dark:text-white">
                      {organizerName}
                      <MdVerified className="shrink-0 text-green-600" />
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Community Organizer
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Join This Initiative
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Be part of a positive change in your community.
                </p>

                {isOrganizer ? (
                  <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    You organized this event.
                  </p>
                ) : isCompleted ? (
                  <p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    This event has been completed.
                  </p>
                ) : (
                  <button
                    onClick={handleJoinEvent}
                    disabled={
                      joinLoading ||
                      !currentJoinStatus ||
                      currentJoinStatus.isJoined
                    }
                    className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 dark:disabled:bg-slate-800 dark:disabled:text-slate-400"
                  >
                    {joinLoading
                      ? "Joining..."
                      : currentJoinStatus?.isJoined
                        ? "✓ Joined"
                        : "Join Event"}
                  </button>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}