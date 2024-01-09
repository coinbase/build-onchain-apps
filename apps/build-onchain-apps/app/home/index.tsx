"use client"
import Guide from '../../src/components/home/Guide';
import HomeHeader from '../../src/components/home/HomeHeader';
import WhyUseIt from '../../src/components/home/WhyUseIt';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="container mx-auto flex flex-col py-12">
        <WhyUseIt />
        <Guide />
      </main> 
    </>
  );
}
