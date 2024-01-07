import Guide from '../../src/components/home/Guide';
import HomeHeader from '../../src/components/home/HomeHeader';
import WhyUseIt from '../../src/components/home/WhyUseIt';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps Toolkit"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />
      <HomeHeader />
      <main className="container mx-auto flex flex-col py-12">
        <WhyUseIt />
        <Guide />
      </main>
    </>
  );
}
