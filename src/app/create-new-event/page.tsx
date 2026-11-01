"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaCalendarDays,
  FaLocationDot,
  FaImage,
  FaTag,
  FaAlignLeft,
  FaHeading,
  FaPlus,
  FaArrowLeft,
  FaCircleCheck,
} from "react-icons/fa6";

import { authClient } from "@/lib/auth-client";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventType: "Cleanup",
    thumbnail: "",
    location: "",
    eventDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    } = eventData;

    if (
      !title.trim() ||
      !description.trim() ||
      !eventType ||
      !thumbnail.trim() ||
      !location.trim() ||
      !eventDate
    ) {
      setErrorMessage("Please fill in all required event fields.");
      return;
    }

    const selectedDate = new Date(`${eventDate}T00:00:00`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      setErrorMessage(
        "Event date must be in the future. Past dates are not allowed."
      );
      return;
    }

    if (!session?.user?.email) {
      setErrorMessage("Please login before creating an event.");
      return;
    }

    const creatorEmail = session?.user?.email;
    const creatorName = session?.user?.name || "Anonymous";
    const creatorImage = session?.user?.image || "";

    const payload = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      createdBy: creatorEmail,
      creatorName,
      creatorImage,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const serverUrl = process.env.NEXT_PUBLIC_CIVIC_SERVER_URL;

      if (!serverUrl) {
        throw new Error("Server URL is missing.");
      }

      const { data, error: tokenError } = await authClient.token();

      if (tokenError || !data?.token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const res = await fetch(`${serverUrl}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      setSuccessMessage("Event published successfully! Redirecting...");

      setTimeout(() => {
        router.push("/upcoming-events");
      }, 1500);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error occurred while creating the event."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <span>PUBLISHER PORTAL</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create Social Event
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Publish a new initiative, rally community volunteers, and create
              lasting impact.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors w-fit"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Events</span>
          </Link>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-3">
            <FaCircleCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FaHeading className="text-emerald-600 w-3.5 h-3.5" />
                <span>Event Title *</span>
              </label>

              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                placeholder="e.g. Citywide Neighborhood Tree Plantation Drive"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FaTag className="text-emerald-600 w-3.5 h-3.5" />
                <span>Event Type *</span>
              </label>

              <select
                name="eventType"
                value={eventData.eventType}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all cursor-pointer"
              >
                <option value="Cleanup">Cleanup Drive</option>
                <option value="Plantation">Tree Plantation</option>
                <option value="Donation">Charity & Donation</option>
                <option value="Workshop">Skill Development Workshop</option>
                <option value="Healthcare">Health & Medical Camp</option>
                <option value="Education">Education & Tutoring</option>
                <option value="Food Distribution">Food Distribution</option>
                <option value="Awareness">Community Awareness Campaign</option>
                <option value="Animal Welfare">Animal Welfare</option>
                <option value="Disaster Relief">Disaster Relief Support</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FaCalendarDays className="text-emerald-600 w-3.5 h-3.5" />
                <span>Event Date *</span>
              </label>

              <input
                type="date"
                name="eventDate"
                min={todayDate}
                value={eventData.eventDate}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all cursor-pointer"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FaLocationDot className="text-emerald-600 w-3.5 h-3.5" />
                <span>Location / Venue *</span>
              </label>

              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="e.g. Central Park Gate 4, Dhaka"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FaImage className="text-emerald-600 w-3.5 h-3.5" />
                <span>Thumbnail Image URL *</span>
              </label>

              <input
                type="url"
                name="thumbnail"
                value={eventData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FaAlignLeft className="text-emerald-600 w-3.5 h-3.5" />
                <span>Detailed Description *</span>
              </label>

              <textarea
                name="description"
                rows={5}
                value={eventData.description}
                onChange={handleChange}
                placeholder="Provide details about the mission, timings, what volunteers should bring, and objectives..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all resize-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Publisher Account:{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                {session?.user?.email || "Guest"}
              </strong>
            </span>

            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Verified Creator Mode
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !session}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing Event...</span>
                </>
              ) : (
                <>
                  <FaPlus className="w-4 h-4" />
                  <span>Publish Event Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
