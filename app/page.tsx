import About from '@/components/sections/About';
import Approach from '@/components/sections/Approach';
import BlackBox from '@/components/sections/BlackBox';
import ContactSection from '@/components/sections/ContactSection';
import FeatureCards from '@/components/sections/FeatureCards';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Story from '@/components/sections/Story';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <BlackBox />
      <Approach />
      <Services />
      <About />
      <Story />
      <ContactSection />
    </>
  );
}
