"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LuLayoutDashboard,
  LuUserRound,
  LuCalendarDays,
  LuCalendarCheck,
  LuSettings,
  LuPlus,
  LuLogOut,
  LuCamera,
  LuMail,
  LuShieldCheck,
  LuClock,
  LuArrowUpRight,
  LuSave,
  LuTrash2,
  LuMenu,
  LuX,
  LuLoaderCircle,
} from "react-icons/lu";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const navigation = [
  {
    title: "Overview",
    href: "#overview",
    icon: LuLayoutDashboard,
  },
  {
    title: "Edit Profile",
    href: "#edit-profile",
    icon: LuUserRound,
  },
  {
    title: "My Events",
    href: "/manage-events",
    icon: LuCalendarDays,
  },
  {
    title: "Joined Events",
    href: "/joined-events",
    icon: LuCalendarCheck,
  },
  
  {
    title: "Create Event",
    href: "/create-new-event",
    icon: LuPlus,
  },
  {
    title: "Settings",
    href: "#settings",
    icon: LuSettings,
  },
];

const MyProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = session?.user;
  const [profileUser, setProfileUser] = useState(user);

  if (user && user !== profileUser) {
    setProfileUser(user);
    setName(user.name || "");
    setImage(user.image || "");
  }

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in");
    }
  }, [isPending, user, router]);

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = {
      name: name.trim(),
      image: image.trim(),
    };

    if (!formData.name) {
      toast.error("Please enter your name.");
      return;
    }

    try {
      setSaving(true);

      console.log("Profile form data:", formData);

      const { error } = await authClient.updateUser(formData);

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      toast.success("Your profile has been updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Profile update failed."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "This will permanently delete your account. This action cannot be undone. Do you want to continue?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const { error } = await authClient.deleteUser({
        password: deletePassword,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Account deletion failed.");
      }

      toast.success("Account deletion request completed.");
      await authClient.signOut();
      router.replace("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Account deletion failed."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LuLoaderCircle
          size={36}
          className="animate-spin text-emerald-600"
        />
      </main>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex max-w-[1600px]">
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            aria-label="Close sidebar"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-10 md:h-3 items-center justify-between border-b border-slate-100 px-6 dark:border-slate-800">
           

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Close sidebar"
            >
              <LuX size={21} />
            </button>
          </div>

          <div className="border-b border-slate-100 px-5 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">{user.name}</h2>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Dashboard
            </p>

            {navigation.map((item) => {
              const Icon = item.icon;
              const isAnchor = item.href.startsWith("#");

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                >
                  <Icon size={19} />
                  {item.title}
                  {isAnchor && (
                    <LuArrowUpRight
                      size={14}
                      className="ml-auto opacity-50"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4 dark:border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LuLogOut size={19} />
              Back to Website
            </Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 lg:px-10 lg:py-10">
          <header className="mb-9 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 lg:hidden"
                aria-label="Open sidebar"
              >
                <LuMenu size={21} />
              </button>

              <div>
                
                <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                  My Profile
                </h1>
              </div>
            </div>

            
          </header>

          <section
            id="overview"
            className="scroll-mt-8 overflow-hidden rounded-3xl bg-white dark:bg-slate-950 p-6 text-black dark:text-white sm:p-9"
          >
            <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white/10 bg-emerald-500/30 text-3xl font-black dark:text-emerald-300">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-green-600 dark:text-emerald-300">
                  Welcome to your dashboard
                </p>

                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  {user.name}
                </h2>

                <p className="mt-2 break-all text-sm text-gray-800 dark:text-slate-300">
                  {user.email}
                </p>

                
              </div>

              <a
                href="#edit-profile"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <LuUserRound size={17} />
                Edit Profile
              </a>
            </div>
          </section>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <LuMail size={21} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Email Address
                  </p>
                  <p className="mt-1 break-all text-sm font-bold">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                  <LuCalendarDays size={21} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Account Created
                  </p>
                  <p className="mt-1 text-sm font-bold">{memberSince}</p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="edit-profile"
            className="mt-10 scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
          >
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                Personal Information
              </p>
              <h2 className="mt-2 text-2xl font-black">Edit Your Profile</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Update your name and profile picture.
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100 text-2xl font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {image ? (
                    <Image
                      src={image}
                      alt="Profile preview"
                      width={500}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div>
                  <h3 className="font-bold">Profile Picture</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Add an image URL to update your profile picture.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-image"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                >
                  <LuCamera size={17} />
                  Profile Image URL
                </label>
                <input
                  id="profile-image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setName(user.name || "");
                    setImage(user.image || "");
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LuLoaderCircle className="animate-spin" size={17} />
                  ) : (
                    <LuSave size={17} />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>

          <section
            id="settings"
            className="mt-10 scroll-mt-8 rounded-3xl border border-red-200 bg-white p-6 dark:border-red-500/20 dark:bg-slate-900 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-600 dark:text-red-400">
              Account Settings
            </p>

            <h2 className="mt-2 text-2xl font-black">Delete Account</h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Permanently delete your CivicSocialPlus account. This action
              cannot be undone. Your authentication account and profile data
              will be deleted according to your Better Auth configuration.
            </p>

            {!showDeleteForm ? (
              <button
                onClick={() => setShowDeleteForm(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
              >
                <LuTrash2 size={17} />
                Permanently Delete Account
              </button>
            ) : (
              <form
                onSubmit={handleDeleteAccount}
                className="mt-6 max-w-xl space-y-4 rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-500/20 dark:bg-red-500/5"
              >
                <h3 className="font-bold text-red-700 dark:text-red-400">
                  Confirm Account Deletion
                </h3>

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Enter your account password to confirm this action.
                </p>

                <input
                  type="password"
                  required
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 outline-none focus:border-red-500 dark:border-red-500/20 dark:bg-slate-900"
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteForm(false);
                      setDeletePassword("");
                    }}
                    disabled={deleting}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={deleting || !deletePassword}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deleting ? (
                      <LuLoaderCircle className="animate-spin" size={17} />
                    ) : (
                      <LuTrash2 size={17} />
                    )}
                    {deleting ? "Deleting..." : "Confirm Permanent Deletion"}
                  </button>
                </div>
              </form>
            )}
          </section>

          <footer className="py-8 text-center text-xs text-slate-400">
            CivicSocialPlus Dashboard · Manage your community activities
          </footer>
        </section>
      </div>
    </main>
  );
};

export default MyProfilePage;
