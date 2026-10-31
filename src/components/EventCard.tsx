"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  FaCalendarDays,
  FaLocationDot,
  FaTag,
  FaArrowRight,
  FaUserGroup,
} from "react-icons/fa6";
import Image from "next/image";

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

export default function EventCard({ event }: { event: EventItem }) {
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop";

  const eventDate = new Date(event.eventDate);

  const formattedDate = Number.isNaN(eventDate.getTime())
    ? "Date TBA"
    : eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40  dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40">
      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image
          src={imgError || !event.thumbnail ? fallbackImage : event.thumbnail}
          alt={event.title}
          onError={() => setImgError(true)}
          width={400}
          height={400}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-lg backdrop-blur-md dark:bg-slate-950/85 dark:text-emerald-400">
          <FaTag className="text-[10px]" />
          <span>{event.eventType}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/20 backdrop-blur-md">
              <FaCalendarDays className="text-sm" />
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                Event Date
              </p>
              <p className="text-sm font-bold">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
            <FaUserGroup className="text-emerald-300" />
            <span>{event.attendeesCount ?? 0} Joined</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <FaLocationDot className="shrink-0 text-rose-500" />
          <span className="truncate">{event.location}</span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-xl font-extrabold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
          {event.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {event.description}
        </p>

        <div className="mt-auto border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            href={`/upcoming-events/${event.id}`}
            className="flex w-full items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800 transition-all duration-300 hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-600 dark:hover:text-white"
          >
            <span>Explore Event</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/20 dark:bg-slate-700 dark:group-hover:bg-white/20">
              <FaArrowRight className="text-xs" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
