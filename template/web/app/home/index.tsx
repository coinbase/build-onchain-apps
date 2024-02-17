'use client';
import Guide from '@/pageComponents/home/Guide';
import HomeHeader from '@/pageComponents/home/HomeHeader';
import WhyUseIt from '@/pageComponents/home/WhyUseIt';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="container mx-auto flex flex-col px-8 py-28">
        <WhyUseIt />
        <Guide />
      </main>
    </>
  );
}
