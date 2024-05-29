import React, { useEffect, useRef, useState } from 'react';
import { SERVICES_INTRO } from '../data';
import '../../scss/label.scss';
import { useInView } from 'react-intersection-observer';

export const Label = ({ index }) => {
  const targetRef = useRef(null);
  const [observer, setObserver] = useState<any>();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    // setObserver((prev) => {
    //   return new IntersectionObserver(
    //     ([entry]) => {
    //       setTargetIsVisible(entry.isIntersecting);
    //       console.log(entry.isIntersecting);
    //       console.log(index);
    //     },
    //     { threshold: 1 }
    //   );
    // });
  }, []);

  // console.log(observer);

  useEffect(() => {
    if (observer && targetRef.current) {
      observer.observe(targetRef.current);
    }
  }, [observer]);

  return (
    <div className='label-cont'>
      <div ref={ref} className={`label__services label__services--${index} ${inView ? 'label__services--visible' : ''}`}>
        {SERVICES_INTRO.map((service, i) => (
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
