import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center bg-slate-600 overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat  md:bg-[position:center_20%] z-0 opacity-60 mix-blend-overlay"
        style={{
          backgroundImage: `url('/images/socialwork.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/20 to-transparent z-0" />

 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">


          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Seamless Social Event Management for <br className="hidden sm:inline" />
             <span className="text-emerald-400 text-4xl md:text-8xl font-bold">Every Occasion</span>
          </h1>


          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
            Professional event solutions for community gatherings, social development initiatives, workshops, and celebrations.
          </p>


          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
            <Link
              href="/upcoming-events"
              className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 group"
            >
              Upcoming Events
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/core-initiatives"
              className="px-8 py-3.5 rounded-full border-2 border-white/40 hover:border-white text-white font-semibold text-sm transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}