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
        <div className='panel lg:col-span-3'>
          <MultipleLineChart data={lineData} colors={['#FFAF45', '#C40C0C', '#40A578']} title={'Daily Trend [Waring & Critical & Normal]'} categories={xAxisCategories} strokeWidth={[3, 3, 3]} />
        </div>
      </div>
    </div>
  );
};
