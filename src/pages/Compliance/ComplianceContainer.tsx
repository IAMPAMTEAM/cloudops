import { useEffect, useState } from 'react';
import ComplianceTop from '@/assets/images/compliance.svg';

const Compliance = () => {
  const [reportHTML, setReportHTML] = useState('');
  const [convertedHTML, setConvertedHTML] = useState<HTMLElement>();
  const [headerHTML, setHeaderHTML] = useState<any>('');
  const [firstSectionHTML, setFirstSectionHTML] = useState<any>('');
  const [secondSectionHTML, setSecondSectionHTML] = useState<any>('');
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/compliance.txt')
      .then(async (response) => await response.text())
      .then((data) => setReportHTML(data));
  });

  // axios.defaults.withCredentials = true;

  useEffect(() => {
    const convertHTML = (reportHTML: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(reportHTML, 'text/html');
      return doc.documentElement;
    };

    setConvertedHTML(convertHTML(reportHTML));
  }, [reportHTML]);

  useEffect(() => {
    console.log(convertedHTML?.querySelector('style'));
  });

  useEffect(() => {
    // 1st division (overview)
    setHeaderHTML(convertedHTML?.querySelector('header')?.innerHTML);
  }, [convertedHTML]);

  useEffect(() => {
    // 2nd division (report)
    setFirstSectionHTML(convertedHTML?.querySelectorAll('section')[0]?.innerHTML);
  }, [convertedHTML]);

  useEffect(() => {
    // 3rd division (report)
    setSecondSectionHTML(convertedHTML?.querySelectorAll('section')[1]?.innerHTML);
  }, [convertedHTML]);

  useEffect(() => {
    const tabs = document.querySelectorAll('.tab');
    const reports = document.querySelectorAll('.h-report');

    tabs.forEach((tab, index: number) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('tab-active'));
        tab.classList.add('tab-active');

        reports.forEach((t) => t.classList.add('hidden'));
        reports[index]?.classList.remove('hidden');
      });
    });
  });

  return (
    <div>
      {/* <p className='text-[1.2rem] font-semibold mb-[8px] text-[#333]'>Compliance</p>
      <hr className='mb-[8px] border-[1px] border-[#333]' /> */}
      <img src={ComplianceTop} alt='Compliance' className='w-full h-full object-cover mb-4' />
      <style dangerouslySetInnerHTML={{ __html: convertedHTML?.querySelector('style')?.innerHTML ?? '' }}></style>
      <div className='flex flex-col gap-8'>
        <div className='panel'>
          <div dangerouslySetInnerHTML={{ __html: headerHTML }}></div>
        </div>
        <div className='panel'>
          <div dangerouslySetInnerHTML={{ __html: firstSectionHTML }}></div>
        </div>
        <div className='panel'>
          <div dangerouslySetInnerHTML={{ __html: secondSectionHTML }}></div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
