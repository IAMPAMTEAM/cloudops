import { Checkups } from './Checkups';
import '@/scss/content.scss';
import { useEffect, useState } from 'react';

export const LandingContents = () => {
  const [scrolldownBannerTopData, setScrolldownBannerTopData] = useState<any>({});
  const [scrolldownBannerTopCnt, setScrolldownBannerTopCnt] = useState(0);
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/landingTemplate/landing-cloudops.json')
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.scrolldownBanners && scrolldownBannerTopCnt < 1) {
          const timer = setTimeout(() => {
            setScrolldownBannerTopData((prev: any) => {
              return { ...prev, ...data.scrolldownBanners[0] };
            });
            setScrolldownBannerTopCnt((prev) => prev + 1);
          }, 1000);

          return () => clearTimeout(timer);
        }
      });
  }, [scrolldownBannerTopData, scrolldownBannerTopCnt]);

  if (scrolldownBannerTopData.title && scrolldownBannerTopData.subTitle && scrolldownBannerTopData.animatedImages) {
    return (
      <section className='content-wrap'>
        <div className='content-cont'>
          <div className='content__title'>
            <div>
              <p>{scrolldownBannerTopData.title}</p>
              <p>{scrolldownBannerTopData.subTitle}</p>
              <img className='content__astronaut' src={scrolldownBannerTopData.animatedImages[0]} alt='' />
            </div>
          </div>

          <img className='content__sat' src={scrolldownBannerTopData.animatedImages[1]} alt='' />
          <img className='content__rocket' src={scrolldownBannerTopData.animatedImages[2]} alt='' />

          <Checkups data={scrolldownBannerTopData.descriptions} />
        </div>
      </section>
    );
  }
};
