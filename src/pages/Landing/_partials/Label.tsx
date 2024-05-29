import { useEffect, useRef, useState } from 'react';
import '@/scss/label.scss';

export const Label = ({ index, data }: { index: number; data: any[] }) => {
  const targetRef = useRef(null);
  const [targetIsVisible, setTargetIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setTargetIsVisible((prev) => {
        if (prev !== entry.isIntersecting) {
          return entry.isIntersecting;
        }
        return prev;
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div className='label-cont'>
      <div ref={targetRef} className={`label__services label__services--${index} ${targetIsVisible ? 'label__services--visible' : ''}`}>
        {data.map((service, i) => (
          <div className='label__services-labels' key={i}>
            <div className='label__services-label'>
              <p className='label__services-label__text'>{service.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
