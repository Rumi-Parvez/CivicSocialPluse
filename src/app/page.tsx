import CompletedEvents from "@/components/CompletedEvents";
import FeaturedWorks from "@/components/FeaturedWorks";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import RecentUpcomingEvents from "@/components/RecentEvents";


export default function Home() {
  return (
    <>
    <div>
      
      <Hero></Hero>
      <RecentUpcomingEvents></RecentUpcomingEvents>
      <FeaturedWorks></FeaturedWorks>
      <CompletedEvents></CompletedEvents>

      <Newsletter></Newsletter>
    </div>
    </>
  );
}
