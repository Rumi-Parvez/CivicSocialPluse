import Link from "next/link";
import { FaArrowRight, FaHandsHolding, FaTree, FaPeopleGroup } from "react-icons/fa6";

export default function FeaturedWorks() {
  const initiatives = [
    {
      tagline: "Environmental Action",
      title: "Community Cleanups & Greening",
      description: "Mobilizing volunteers across neighborhoods to clean public spaces, plant trees, and restore local ecosystems for a sustainable future.",
      icon: FaTree,
      linkText: "Learn More",
    },
    {
      tagline: "Social Welfare",
      title: "Winter Clothing & Food Drives",
      description: "Bridging the gap by collecting and distributing essential warm clothing, meals, and relief packages to underprivileged families.",
      icon: FaHandsHolding,
      linkText: "Learn More",
    },
    {
      tagline: "Empowerment",
      title: "Youth Skill & Education Workshops",
      description: "Empowering the next generation through free mentorship sessions, digital skill training, and community leadership workshops.",
      icon: FaPeopleGroup,
      linkText: "Learn More",
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors">
        <h1 className="text-3xl font-bold flex justify-center items-center underline mb-10">WHAT WE DO</h1>
      <div className="max-w-7xl mx-auto border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm">
        
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Driven by Purpose, <br />
              <span className="text-emerald-600 dark:text-emerald-500 font-serif italic font-normal">
                United by Impact
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-md">
              We specialize in creating effortless community engagement opportunities and impactful social development events that leave a lasting positive transformation.
            </p>

            <div className="pt-2">
              <Link
                href="/upcoming-events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
              >
                <span>Explore All Initiatives</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-slate-100 dark:divide-slate-900">
            {initiatives.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="py-6 first:pt-0 last:pb-0 group">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    
                    <div className="sm:col-span-4 space-y-1">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <IconComponent className="w-3.5 h-3.5" />
                        <span>{item.tagline}</span>
                      </div>
                      <Link 
                        href="/upcoming-events" 
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pt-1"
                      >
                        <span>{item.linkText}</span>
                        <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="sm:col-span-8 space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}