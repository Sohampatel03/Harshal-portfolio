import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import StatsStrip from "./components/homepage/stats-strip";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { personalData } from "@/utils/data/personal-data";
import { publicFileExists } from "@/utils/public-file";

export default function Home() {
  const hasPhoto = publicFileExists(personalData.photo);

  return (
    <>
      <HeroSection hasPhoto={hasPhoto} />
      <StatsStrip />
      <AboutSection hasPhoto={hasPhoto} />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ContactSection />
    </>
  );
}
