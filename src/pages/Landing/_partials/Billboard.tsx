import '@/scss/billboard.scss';
import { useEffect, useState } from 'react';

export const Billboard = () => {
  const [billboardData, setBillboardData] = useState<any>({
    title: '',
    images: [],
  });
  const [billboardCnt, setBillboardCnt] = useState(0);
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/landingTemplate/template.json')
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.subBanner && billboardCnt < 1) {
          const timer = setTimeout(() => {
            setBillboardData((prev: any) => {
              return { ...prev, ...data.subBanner };
            });
            setBillboardCnt((prev) => prev + 1);
          }, 1000);

          return () => clearTimeout(timer);
        }
      });
  }, [billboardData, billboardCnt]);

  return (
    <section className='billboard-cont'>
      <p>{billboardData.title}</p>

      <div className='billboard__logos'>
        {billboardData.images.map((img: string, idx: number) => {
          return <img className='bg-contain' key={idx} src={img} alt='' />;
        })}
      </div>
    </section>
  );
};
