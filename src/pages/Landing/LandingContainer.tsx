import { Header } from './_partials/Header';
import { Banner } from './_partials/Banner';
import { Billboard } from './_partials/Billboard';
import { LandingContents } from './_partials/LandingContents';
import { Footer } from './_partials/Footer';
import '@/styles/reset.css';
import '@/styles/variables.css';

const LandingContainer = () => {
  return (
    <div>
      <Header />
      {/* @ts-ignore */}
      <Banner />
      <Billboard />
      {/* @ts-ignore */}
      <LandingContents />
      {/* @ts-ignore */}
      <Footer />
    </div>
  );
};

export default LandingContainer;
