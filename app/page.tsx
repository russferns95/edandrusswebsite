import BlackBox from '@/components/sections/BlackBox';
import CtaBand from '@/components/sections/CtaBand';
import FeatureCards from '@/components/sections/FeatureCards';
import Hero from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <BlackBox />
      <CtaBand />
    </>
  );
}
