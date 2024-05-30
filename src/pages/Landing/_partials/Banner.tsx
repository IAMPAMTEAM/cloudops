import '@/scss/banner.scss';
import { useEffect, useState } from 'react';

export const Banner = () => {
  const [bannerData, setBannerData] = useState<any>({
    title: [],
    subTitle: '',
    thumbnail: '',
    animatedImage: '',
    backgroundImage: 'https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/landingTemplate/images/bg-wave.png',
    button: { text: '', nextPath: '' },
  });
  const [bannerCnt, setBannerCnt] = useState(0);
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/landingTemplate/landing-cloudops.json')
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.mainBanner && bannerCnt < 1) {
          const timer = setTimeout(() => {
            setBannerData((prev: any) => {
              return { ...prev, ...data.mainBanner };
            });
            setBannerCnt((prev) => prev + 1);
          }, 1000);

          return () => clearTimeout(timer);
        }
      });
  }, [bannerData, bannerCnt]);

  if (bannerData.thumbnail && bannerData.title && bannerData.subTitle && bannerData.button && bannerData.animatedImage && bannerData.backgroundImage) {
    return (
      <div
        className='header'
        id='header'
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundImage: `url(${bannerData.backgroundImage})`,
        }}
      >
        <div className='header-cont'>
          <div className='inner-header flex'>
            <div className='header-content'>
              <div className='text'>
                <p className='title'>
                  <span className='title-free'>{bannerData.title[0]}</span>
                  <span className='title-line'></span>
                  &nbsp; {bannerData.title[1]}
                </p>
                <p className='title'>{bannerData.title[2]}</p>
                <p className='title-sub'>{bannerData.subTitle}</p>
              </div>

              <div className='button'>
                <button className='btn bg-[var(--color-purple-deep)] text-[var(--color-white)] border-none w-50 text-[1.4rem]'>{bannerData.button.text}</button>

                {/* <button className='btn btn-secondary'>Request a Demo</button> */}
              </div>
            </div>

            <div className='header-img'>
              <img className='pre-web' src={bannerData.thumbnail} alt='' />
              <img className='astronaut' src={bannerData.animatedImage} alt='' />
            </div>
          </div>
        </div>

        <div>
          <svg className='waves' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 24 150 28' preserveAspectRatio='none' shape-rendering='auto'>
            <defs>
              <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' />
            </defs>
            <g className='parallax'>
              <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(255,255,255,0.7)'></use>
              <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(255,255,255,0.5)'></use>
              <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(255,255,255,0.3)'></use>
              <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff'></use>
            </g>
          </svg>
        </div>
      </div>
    );
  }
};
