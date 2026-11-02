"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaCalendarDays,
  FaLocationDot,
  FaTag,
  FaArrowRight,
  FaUserGroup,
  FaCheck,
} from "react-icons/fa6";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy: string;
  attendeesCount?: number;
}

interface EventCardProps {
  event: EventItem;
  isCompleted?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

export default function EventCard({
  event,
  isCompleted: completedProp = false,
}: EventCardProps) {
  const [imgError, setImgError] = useState(false);
  const [attendeesCount, setAttendeesCount] = useState(
    event.attendeesCount ?? 0
  );

  useEffect(() => {
    if (!event.id || !API_URL) return;

    const controller = new AbortController();

    
const fetchJoinedEvents = async () => {
  try {
    const response = await fetch(
      `${API_URL}/join/event/${encodeURIComponent(event.id)}`,
      {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      }
    );

    const responseText = await response.text();

    if (!response.ok) {


      throw new Error(
        `Failed to fetch joined events: ${response.status}`
      );
    }

    const result: unknown = JSON.parse(responseText);

    if (!Array.isArray(result)) {
      throw new Error("Invalid joined events response.");
    }

    setAttendeesCount(result.length);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return;


  }
};


    fetchJoinedEvents();

    return () => {
      controller.abort();
    };
  }, [event.id]);

  const fallbackImage =
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop";

  const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(event.eventDate)
    ? (() => {
        const [year, month, day] = event.eventDate.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : new Date(event.eventDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const comparisonDate = new Date(eventDate);
  comparisonDate.setHours(0, 0, 0, 0);

  const isCompleted =
    completedProp ||
    (!Number.isNaN(comparisonDate.getTime()) &&
      comparisonDate < today);

  const formattedDate = Number.isNaN(eventDate.getTime())
    ? "Date TBA"
    : eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <Link href={`/upcoming-events/${event.id}`}>
      <article
        className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors dark:bg-slate-900 ${
          isCompleted
            ? "border-slate-200 dark:border-slate-800"
            : "border-slate-200 hover:border-emerald-500 dark:border-slate-800 dark:hover:border-emerald-500"
        }`}
      >
        <div className="h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={imgError || !event.thumbnail ? fallbackImage : event.thumbnail}
            alt={event.title}
            width={600}
            height={400}
            quality={75}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover ${
              isCompleted ? "grayscale" : ""
            }`}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${
                isCompleted
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-emerald-700 dark:text-emerald-400"
              }`}
            >
              <FaTag />
              {event.eventType}
            </span>

            <div
              className={`flex items-center gap-2 text-xs font-medium ${
                isCompleted
                  ? "text-slate-400 dark:text-slate-500"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <FaCalendarDays
                className={
                  isCompleted
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-emerald-600"
                }
              />
              <span>{formattedDate}</span>
            </div>

            {isCompleted && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-green-500 dark:text-green-400">
                <FaCheck />
                Completed
              </span>
            )}
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 dark:text-white">
            {event.title}
          </h3>

          <p className="mb-2 line-clamp-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
            {event.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
            <span className="flex min-w-0 items-center gap-2">
              <FaLocationDot className="shrink-0 text-rose-500" />
              <span className="truncate">{event.location}</span>
            </span>

            <span className="flex items-center gap-2">
              <FaUserGroup
                className={`shrink-0 ${
                  isCompleted ? "text-slate-400" : "text-emerald-600"
                }`}
              />
              {attendeesCount} joined
            </span>
          </div>

          <div
            className={`mt-5 flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
              isCompleted
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <span>
              {isCompleted ? "View Past Event" : "View Event"}
            </span>
            <FaArrowRight />
          </div>
        </div>
      </article>
    </Link>
  );
}
