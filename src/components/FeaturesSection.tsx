"use client";

import Link from "next/link";

import {
  CalendarDays,
  Users,
  CalendarPlus,
  HeartHandshake,
  ArrowUpRight,
  LogIn,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    id: 1,
    number: "01",
    title: "Discover Events",
    description:
      "Explore exciting upcoming events and discover opportunities to make a difference in your community.",
    icon: CalendarDays,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    id: 2,
    number: "02",
    title: "Join Community",
    description:
      "Connect with like-minded people, participate in activities, and build meaningful relationships.",
    icon: Users,
    color:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    id: 3,
    number: "03",
    title: "Create Events",
    description:
      "Turn your ideas into reality by creating events and inviting others to be part of something meaningful.",
    icon: CalendarPlus,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  },
  {
    id: 4,
    number: "04",
    title: "Make an Impact",
    description:
      "Take action, support positive initiatives, and help create a better and stronger community.",
    icon: HeartHandshake,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
];

const quickLinks = [
  {
    id: 1,
    title: "Create Event",
    href: "/create-new-event",
    icon: CalendarPlus,
  },
  {
    id: 2,
    title: "Login",
    href: "/login",
    icon: LogIn,
  },
  {
    id: 3,
    title: "All Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
  {
    id: 4,
    title: "Privacy Policy",
    href: "/privacy-policy",
    icon: ShieldCheck,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-5 md:py-15 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-5">
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
            Small Actions.
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}Big Impact.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            Strong communities start with people like you. Discover,
            connect, participate, and make a positive difference together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-9">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${feature.color}`}
                  >
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-bold text-slate-300 dark:text-slate-700">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-6 flex justify-end">
                  
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="text-center mb-7">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Explore CivicSocialPlus
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Everything you need to get started with your community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {quickLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className="group flex items-center justify-between gap-3 p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Icon size={20} />
                    </div>

                    <span className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {link.title}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        
      </div>
    </section>
  );
}
