import CompletedEvents from "@/components/CompletedEvents";
import FeaturedWorks from "@/components/FeaturedWorks";
import FeaturesSection from "@/components/FeaturesSection";
import PastEventsGallery from "@/components/Gellary";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import RecentUpcomingEvents from "@/components/RecentEvents";


export default function Home() {
  return (
    <>
    <div>
      
      <Hero></Hero>
      <RecentUpcomingEvents></RecentUpcomingEvents>
      <FeaturesSection></FeaturesSection>
     
      <CompletedEvents></CompletedEvents>
       <FeaturedWorks></FeaturedWorks>
      <PastEventsGallery></PastEventsGallery>

      <Newsletter></Newsletter>
    </div>
    </>
  );
}
