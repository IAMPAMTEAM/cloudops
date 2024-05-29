import { Header } from './_partials/Header';
// import { Banner } from './_partials/Banner';
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
      <Banner />
      <Billboard />
      <LandingContents />
      <Footer />
    </div>
  );
};

export default LandingContainer;
