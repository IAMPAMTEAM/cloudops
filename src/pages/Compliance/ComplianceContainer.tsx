import { useEffect, useState } from 'react';
import axios from 'axios';

const Compliance = () => {
  const [reportHTML, setReportHTML] = useState('');
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/compliance.txt')
      .then(async (response) => await response.text())
      .then((data) => setReportHTML(data));
  });

  axios.defaults.withCredentials = true;
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
      <div className='grid'>
        <div className='panel'>
          <p className='font-semibold text-xl pl-4'>Compliance</p>
          <hr className='mt-4' />
          <div dangerouslySetInnerHTML={{ __html: reportHTML }}></div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
