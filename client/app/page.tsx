import { BackgroundLinesHero } from "@/components/ui/background-lines-hero";
import ServiceCardSection from "@/components/ui/services-section";
import PestHomeSection from "@/components/ui/pest-home-section";

export default function Home() {
  return (
    <div className="flex flex-col">
        <BackgroundLinesHero />
        <div>
          <ServiceCardSection />
        </div>
        <div>
          {/* <PestHomeSection /> */}
        </div>
    </div>
  );
}
