"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LuCalendarDays,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash2,
  LuX,
  LuRefreshCw,
} from "react-icons/lu";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface EventItem {
  _id: string;
  id?: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy?: string;
}

interface EventForm {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

const API_URL = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

const emptyForm: EventForm = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

const ManageEventsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);

  const getToken = useCallback(async () => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Authentication token not found. Please sign in again.");
    }

    return data.token;
  }, []);

  const fetchMyEvents = useCallback(async () => {
    if (!API_URL) {
      throw new Error("Server URL is not configured.");
    }

    const token = await getToken();

    const response = await fetch(`${API_URL}/events/my-events`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Failed to load your events.");
    }

    const result = await response.json();

    setEvents(Array.isArray(result) ? result : result.events ?? []);
  }, [getToken]);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    let active = true;

    const loadEvents = async () => {
      try {
        setLoading(true);

        if (!API_URL) {
          throw new Error("Server URL is not configured.");
        }

        const token = await getToken();

        const response = await fetch(`${API_URL}/events/my-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to load your events.");
        }

        const result = await response.json();

        if (active) {
          setEvents(Array.isArray(result) ? result : result.events ?? []);
        }
      } catch (error) {
        if (active) {
          toast.error(
            error instanceof Error ? error.message : "Something went wrong."
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
  }, [isPending, session?.user, router, getToken]);

  const openEditModal = (event: EventItem) => {
    setSelectedEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate
        ? new Date(event.eventDate).toISOString().slice(0, 10)
        : "",
    });
  };

  const closeEditModal = () => {
    if (saving) return;

    setSelectedEvent(null);
    setForm(emptyForm);
  };

  const handleFormChange = (
    field: keyof EventForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedEvent) return;

    try {
      setSaving(true);

      const token = await getToken();
      const eventId = selectedEvent._id;

if (!eventId || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
  toast.error("Invalid event ID");
  return;
}

const response = await fetch(`${API_URL}/events/${eventId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(form),
});
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");

      setSelectedEvent(null);
      setForm(emptyForm);

      await fetchMyEvents();
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update event."
      );
    } finally {
      setSaving(false);
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

  const handleDelete = async (id: string) => {
  const { data } = await authClient.token();

  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  });

  if (response.ok) {
    setEvents((prev) => prev.filter((event) => event._id !== id));
    toast.success("Event deleted!");
  }
};

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Manage Events
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              View, update, and manage the events you have created.
            </p>
          </div>

          <Link
            href="/create-new-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            <LuPlus size={19} />
            Create New Event
          </Link>
        </div>

        <div className="mb-7 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Created Events
            </p>
            <h2 className="mt-1 text-3xl font-black">{events.length}</h2>
          </div>

          <button
            onClick={async () => {
              try {
                setLoading(true);
                await fetchMyEvents();
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Failed to refresh events."
                );
              } finally {
                setLoading(false);
              }
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <LuRefreshCw size={16} />
            Refresh
          </button>
        </div>

        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <LuCalendarDays size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold">No Events Found</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              You {`haven't`} created any events yet. Start creating events and
              bring your community together.
            </p>

            <Link
              href="/create-new-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              <LuPlus size={18} />
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const eventId = event._id || event.id || "";

              return (
                <article
  key={eventId}
  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40"
>

  <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
    {event.thumbnail ? (
      <Image
        src={event.thumbnail}
        alt={event.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    ) : (
      <div className="flex h-full items-center justify-center text-slate-400">
        <LuCalendarDays size={48} />
      </div>
    )}
  </div>


  <div className="p-5 sm:p-6">
 <div className="mb-4 flex items-center justify-between gap-3">
      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
        {event.eventType}
      </span>

      <span className="text-xs font-semibold text-slate-400">
        Your Event
      </span>
    </div>


    <h2 className="line-clamp-2 min-h-14 text-xl font-black leading-7 text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
      {event.title}
    </h2>


    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-7 text-slate-600 dark:text-slate-400">
      {event.description}
    </p>


    <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <LuCalendarDays size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Event Date
          </p>

          <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
            {new Date(event.eventDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="h-px bg-slate-200 dark:bg-slate-700" />

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
          <LuMapPin size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Location
          </p>

          <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            {event.location}
          </p>
        </div>
      </div>
    </div>


    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
      <button
        onClick={() => openEditModal(event)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-bold text-emerald-700 transition-all duration-200 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
      >
        <LuPencil size={16} />
        Edit Event
      </button>

      <button
        onClick={() => handleDelete(eventId)}
        disabled={deletingId === eventId}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-bold text-red-600 transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
      >
        <LuTrash2 size={16} />
        {deletingId === eventId ? "Deleting..." : "Delete Event"}
      </button>
    </div>
  </div>
</article>
              );
            })}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Update Event</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Update your event information.
                </p>
              </div>

              <button
                onClick={closeEditModal}
                disabled={saving}
                className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close edit form"
              >
                <LuX size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Event Type
                  </label>
                  <select
                    required
                    value={form.eventType}
                    onChange={(e) =>
                      handleFormChange("eventType", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="">Select Type</option>
                    <option value="Community">Community</option>
                    <option value="Environment">Environment</option>
                    <option value="Donation">Donation</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={form.eventDate}
                    onChange={(e) =>
                      handleFormChange("eventDate", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  required
                  value={form.thumbnail}
                  onChange={(e) =>
                    handleFormChange("thumbnail", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) =>
                    handleFormChange("location", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-bold transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageEventsPage;
