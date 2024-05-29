import { useEffect, useRef, useState } from 'react';
import { Label } from './Label';
import '@/scss/checkups.scss';

export const Checkups = ({ data }: { data: any[] }) => {
  const contRefs = useRef<HTMLDivElement[]>([]);
  const [isVisibles, setIsVisibles] = useState<boolean[]>([]);

  useEffect(() => {
    const initialVisibility = Array(data.length).fill(false);
    setIsVisibles(initialVisibility);

    contRefs.current.forEach((target, idx) => {
      if (!target) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisibles((prevVisibles) => {
            const newVisibles = [...prevVisibles];
            newVisibles[idx] = entry.isIntersecting;
            return newVisibles;
          });
        },
        { threshold: 1 }
      );

      observer.observe(target);

      return () => {
        if (target) observer.unobserve(target);
      };
    });
  }, [data.length]);

  return (
    <section className='checkups-wrap'>
      {data.map((service, idx) => {
        return (
          <div className='checkups-cont' key={idx}>
            <div className='checkups-cont__labels'>
              <Label index={idx} data={data} />
            </div>

            <div className='checkups-cont__sub'>
              <div ref={(el) => (contRefs.current[idx] = el)} id='checkups-mixin' className={`checkups-cont__sub-each ${isVisibles[idx] ? 'checkups-cont__sub-each--visible' : ''}`}>
                <div className='checkups-cont__sub-title'>
                  <span>{service.title}</span>
                  <span className='checkups-cont__sub-line'></span>
                  &nbsp; Compliance Checkups
                  <p className='checkups-cont__sub-explain'>{service.explanation}</p>
                  <div className='checkups-cont__sub-list'>
                    {service.list.map((el: any, i: number) => {
                      return (
                        <p className='checkups-cont__sub-list__each' key={i}>
                          {el}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
