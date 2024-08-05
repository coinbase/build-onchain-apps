'use client';
import Footer from '@/components/layout/footer/Footer';
import HomeHeader from './_components/HomeHeader';
import WhyUseIt from './_components/WhyUseIt';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="container mx-auto flex flex-col px-8 py-16">
        <WhyUseIt />
      </main>
      <Footer />
    </>
  );
}
