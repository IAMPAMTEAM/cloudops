import { useEffect, useState } from 'react';
import { MultipleLineChart } from '@/components/Charts/_partials/MultipleLineChart';

interface ComplianceData {
  date: string;
  numChecked: number;
  numNormal: number;
  numWarning: number;
  numCritical: number;
}

export const ComplianceComponent = () => {
  const [complianceData, setComplianceData] = useState<ComplianceData[]>([]);
  const [xAxisCategories, setXAxisCategories] = useState<string[]>([]);
  const [numCheckedData, setNumCheckedData] = useState<string[]>([]);
  const [numNormalData, setNumNormalData] = useState<string[]>([]);
  const [numWarningData, setNumWarningData] = useState<string[]>([]);
  const [numCriticalData, setNumCriticalData] = useState<string[]>([]);
  const [cnt, setCnt] = useState<number>(0);

  const [normalLineData, setNormalLineData] = useState<{ name: string; data: number[] }[]>([]);
  const [lineData, setLineData] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/dashboard/compliances.json')
      .then((result) => result.json())
      .then((data: ComplianceData[]) => {
        setComplianceData(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    complianceData.forEach((d: ComplianceData) => {
      if (cnt < 2) {
        setXAxisCategories((prev) => [...prev, d.date]);
        setNumCheckedData((prev) => [...prev, d.numChecked.toString()]);
        setNumNormalData((prev) => [...prev, d.numNormal.toString()]);
        setNumWarningData((prev) => [...prev, d.numWarning.toString()]);
        setNumCriticalData((prev) => [...prev, d.numCritical.toString()]);

        setCnt((prev) => prev + 1);
      }
    });
  }, [xAxisCategories, numCheckedData, numNormalData, numWarningData, numCriticalData, complianceData, cnt]);

  useEffect(() => {
    setLineData((prev: { name: string; data: number[] }[]) => {
      return [
        {
          name: 'warning',
          data: numWarningData.map((num) => parseInt(num)),
        },
        {
          name: 'criticial',
          data: numCriticalData.map((num) => parseInt(num)),
        },
        {
          name: 'normal',
          data: numNormalData.map((num) => parseInt(num)),
        },
      ];
    });
  }, [numWarningData, numCriticalData]);

  useEffect(() => {
    setNormalLineData((prev: { name: string; data: number[] }[]) => {
      return [
        {
          name: 'normal',
          data: numNormalData.map((num) => parseInt(num)),
        },
      ];
    });
  }, [numNormalData]);

  return (
    <div>
      <div className='grid lg:grid-cols-3 gap-[1.2rem]'>
        <div className='panel lg:col-span-2'>
          <MultipleLineChart data={lineData} colors={['#FFAF45', '#C40C0C', '#40A578']} title={'Daily Trend [Waring & Critical]'} categories={xAxisCategories} strokeWidth={[3, 3, 3]} />
        </div>
        <div className=' lg:col-span-1 grid grid-cols-2 gap-[1.2rem]'>
          <div className='stats shadow'>
            <div className='stat'>
              <div className='stat-title text-[#6667ab]'>Checked</div>
              <div className='stat-value'>{numCheckedData[212]}</div>
              <div className='stat-desc'>same with yesterday</div>
            </div>
          </div>
          <div className='stats shadow'>
            <div className='stat'>
              <div className='stat-title text-[#6667ab]'>Normal</div>
              <div className='stat-value text-[#47996b]'>{numNormalData[212]}</div>
              <div className='stat-desc'>1% more than yesterday</div>
            </div>
          </div>
          <div className='stats shadow'>
            <div className='stat'>
              <div className='stat-title text-[#6667ab]'>Warning</div>
              <div className='stat-value text-[#ed8c00]'>{numWarningData[212]}</div>
              <div className='stat-desc'>same with yesterday</div>
            </div>
          </div>
          <div className='stats shadow'>
            <div className='stat'>
              <div className='stat-title text-[#6667ab]'>Critical</div>
              <div className='stat-value text-[#c22626]'>{numCriticalData[212]}</div>
              <div className='stat-desc'>same with yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
