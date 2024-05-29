import '@/scss/footer.scss';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [footerData, setFooterData] = useState<any>({
    title: '',
    subTitle: '',
    button: { text: '', nextPath: '' },
    image: '',
  });
  const [footerCnt, setfooterCnt] = useState(0);
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/landingTemplate/template.json')
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.footer && footerCnt < 1) {
          const timer = setTimeout(() => {
            setFooterData((prev: any) => {
              return { ...prev, ...data.footer };
            });
            setfooterCnt((prev) => prev + 1);
          }, 1000);

          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.error(err));
  }, [footerData, footerCnt]);

  const goTo = () => {
    // TODO: Route Add
    // footer.
  };

  if (footerData.image && footerData.title && footerData.subTitle && footerData.button) {
    return (
      <div>
        <section className='footer-wrap'>
          <div className='footer-cont'>
            <img className='footer-cont__astronaut' src={footerData.image} alt='' />
            <div className='footer-cont__sub text-left'>
              <p>{footerData.title}</p>
              <p>{footerData.subTitle}</p>
              <button className='btn bg-[var(--color-white)] text-[var(--color-purple-deep)] border-none w-50 text-[1.4rem] mt-12' onClick={goTo}>
                {footerData.button.text}
              </button>
            </div>
          </div>
          <div>
            <svg className='waves' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 24 150 28' preserveAspectRatio='none' shape-rendering='auto'>
              <defs>
                <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'></path>
              </defs>
              <g className='parallax'>
                <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(0,0,0,0.7'></use>
                <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(0,0,0,0.5)'></use>
                <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(0,0,0,0.3)'></use>
                <use xlinkHref='#gentle-wave' x='48' y='7' fill='#212121'></use>
              </g>
            </svg>
          </div>
        </section>
      </div>
    );
  }
};
