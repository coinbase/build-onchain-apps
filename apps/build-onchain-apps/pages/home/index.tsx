import { Container, Section } from '@radix-ui/themes';
import Header from '../../src/components/header/Header';
import Home from '../../src/components/home/Home';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />
      <div className={styles.HomeHeader}>
        <div className={styles.HomeHeaderGradient} />
        <Header />
        <div className={styles.HomeHeaderWaves}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="boat-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={styles.HomeHeaderWavesParallax}>
              <use xlinkHref="#boat-wave" x="48" y="0" fill="rgba(82, 156, 248, 0.9)" />
              <use xlinkHref="#boat-wave" x="48" y="3" fill="rgba(82, 156, 248, 0.7)" />
              <use xlinkHref="#boat-wave" x="48" y="5" fill="rgba(82, 156, 248, 0.5)" />
              <use xlinkHref="#boat-wave" x="48" y="7" fill="rgba(82, 174, 255, 0.3)" />
            </g>
          </svg>
        </div>
      </div>
      <Container mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
        <Section>
          <Home />
        </Section>
      </Container>
    </>
  );
}
