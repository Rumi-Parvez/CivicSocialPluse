import Link from "next/link";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Shirt,
  Sprout,
  Utensils,
} from "lucide-react";

const initiatives = [
  {
    id: "community-cleanups",
    number: "01",
    title: "Community Cleanups",
    subtitle: "A cleaner community starts with us.",
    description:
      "Bring people together to clean public spaces, remove waste, and create healthier neighborhoods. Small actions from a community can make a lasting difference.",
    icon: Leaf,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    points: [
      "Organize neighborhood cleanup events",
      "Promote responsible waste disposal",
      "Encourage cleaner public spaces",
    ],
  },
  {
    id: "tree-plantation-drives",
    number: "02",
    title: "Tree Plantation Drives",
    subtitle: "Plant today for a greener tomorrow.",
    description:
      "Support environmental sustainability through community tree plantation activities. Together, we can help create greener spaces and inspire people to protect nature.",
    icon: Sprout,
    color: "bg-lime-100 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400",
    points: [
      "Arrange local tree plantation drives",
      "Encourage environmental awareness",
      "Build greener community spaces",
    ],
  },
  {
    id: "winter-clothing-donation",
    number: "03",
    title: "Winter Clothing Donation",
    subtitle: "Share warmth. Spread kindness.",
    description:
      "Help people facing cold weather by collecting and distributing winter clothing. Every contribution can bring comfort to someone in need.",
    icon: Shirt,
    color: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    points: [
      "Collect usable winter clothes",
      "Organize clothing donation campaigns",
      "Support vulnerable communities",
    ],
  },
  {
    id: "youth-skill-workshops",
    number: "04",
    title: "Youth Skill Workshops",
    subtitle: "Empower young minds with new skills.",
    description:
      "Create opportunities for young people to learn, grow, and develop practical skills through community workshops, knowledge sharing, and collaborative learning.",
    icon: GraduationCap,
    color: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    points: [
      "Arrange practical learning workshops",
      "Encourage knowledge sharing",
      "Support youth development",
    ],
  },
  {
    id: "food-distribution",
    number: "05",
    title: "Food Distribution",
    subtitle: "Together, we can fight hunger.",
    description:
      "Bring volunteers together to collect and distribute food to people and families who need support. Build a caring community where everyone matters.",
    icon: Utensils,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    points: [
      "Organize food distribution events",
      "Support families in need",
      "Promote community volunteering",
    ],
  },
];

const CoreInitiativesPage = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      

      <section
        id="all-initiatives"
        className="scroll-mt-24 px-5 py-10 sm:px-8 lg:py-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              What We Do
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Our Core Initiatives
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
              From environmental activities to social support and youth
              development, every initiative is an opportunity to make a
              difference.
            </p>
          </div>

          <div className="space-y-7">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;

              return (
                <article
                  key={initiative.id}
                  id={initiative.id}
                  className="scroll-mt-24 grid gap-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-emerald-500/40 sm:p-9 lg:grid-cols-[100px_1fr_auto] lg:items-center"
                >
                  <div className="flex items-center justify-between lg:block">
                    <span className="text-3xl font-black text-slate-300 dark:text-slate-700">
                      {initiative.number}
                    </span>
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${initiative.color}`}
                    >
                      <Icon size={30} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black sm:text-3xl">
                      {initiative.title}
                    </h3>
                    <p className="mt-2 font-semibold text-emerald-700 dark:text-emerald-400">
                      {initiative.subtitle}
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                      {initiative.description}
                    </p>

                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {initiative.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <span className="mt-1 text-emerald-500">✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center lg:justify-end">
                    <Link
                      href="/upcoming-events"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 sm:w-auto"
                    >
                      Explore Events
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600 px-7 py-14 text-center text-white sm:px-12 sm:py-20">
          <h2 className="text-3xl font-black sm:text-5xl">
            Be Part of the Change
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-emerald-50">
            Every volunteer, every idea, and every small contribution can
            create a meaningful impact. Find an upcoming event and take your
            first step toward making a difference.
          </p>
          <Link
            href="/upcoming-events"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-emerald-700 transition hover:bg-emerald-50"
          >
            Find an Event
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CoreInitiativesPage;
