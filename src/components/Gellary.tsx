"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaXmark } from "react-icons/fa6";

interface PastEvent {
  _id?: string;
  id?: string;
  title: string;
  thumbnail: string;
  eventDate: string;
}

export default function PastEventsGallery() {
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<PastEvent | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchPastEvents = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

        if (!serverUrl) {
          throw new Error("Server URL is missing.");
        }

        const response = await fetch(`${serverUrl}/events/completed`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load past events.");
        }

        const data: PastEvent[] = await response.json();

        if (!ignore) {
          setEvents(
            data
              .filter(
                (event) =>
                  event.thumbnail &&
                  typeof event.thumbnail === "string"
              )
              .slice(1, 8)
          );
        }
      } catch (error) {
        console.error("Gallery loading failed:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchPastEvents();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="bg-white py-20 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Our Memories
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Moments That{" "}
              <span className="text-emerald-600">Matter.</span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Every picture tells a story of kindness, teamwork, and positive
              change in our community.
            </p>
          </div>

          <a
            href="/upcoming-events"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
          >
            Explore Events
            <FaArrowRight />
          </a>
        </div>

        {loading ? (
          <div className="grid h-[500px] grid-cols-2 gap-3 md:grid-cols-4">
            <div className="col-span-2 row-span-2 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:h-[540px] md:grid-cols-4">
            {events.map((event, index) => (
              <button
                key={event._id || event.id || index}
                type="button"
                onClick={() => setSelectedImage(event)}
                aria-label={`View ${event.title} event photo`}
                className={`group relative min-h-36 cursor-pointer overflow-hidden rounded-2xl bg-slate-100 text-left dark:bg-slate-900 ${
                  index === 0
                    ? "col-span-2 row-span-2 min-h-[300px] md:min-h-0"
                    : "min-h-[150px] md:min-h-0"
                }`}
              >
                <Image
                  src={event.thumbnail}
                  alt={event.title || "Past community event"}
                  fill
                  priority={index === 0}
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/15">
                  <span className="scale-90 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    View Photo
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Past event photos will appear here.
            </p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <FaXmark className="text-lg" />
          </button>

          <div
            className="relative h-[75vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.thumbnail}
              alt={selectedImage.title || "Past community event"}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
