import { MultipleLineChart } from '@/components/Charts/_partials/MultipleLineChart';
import { useEffect, useState } from 'react';

interface Compute {
  RunningEC2: number;
  StoppedEC2: number;
  ActiveLambda: number;
  RunningFargateTasks: number;
  RunningECSTasks: number;
}

interface ResourceData {
  date: string;
  compute: Compute;
  storage: {
    Buckets: number;
    EBS: number;
    Glacier: number;
  };
  network: {
    VPC: number;
    Subnets: number;
    EIPs: number;
    Routes: number;
    NATGateways: number;
    InternetGateways: number;
    VPCPeerings: number;
    DirectConnects: number;
  };
  security: {
    IAMUsers: number;
    IAMGroups: number;
    IAMRoles: number;
    IAMPolicies: number;
    AccessKeys: number;
  };
}

export const ResourcesComponent = () => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [xAxisCategories, setXAxisCategories] = useState<string[]>([]);
  /**
   * TODO:
   * 1. compute
   * 2. storage
   * 3. network
   * 4. security
   */
  const [computeData, setComputeData] = useState<Compute[]>([
    {
      RunningEC2: 0,
      StoppedEC2: 0,
      ActiveLambda: 0,
      RunningFargateTasks: 0,
      RunningECSTasks: 0,
    },
  ]);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/dashboard/resources.json')
      .then((result) => result.json())
      .then((data: ResourceData[]) => {
        setResourceData(data);
      });
  }, []);

  useEffect(() => {
    resourceData.forEach((d: ResourceData) => {
      setXAxisCategories((prev) => [...prev, d.date]);
    });
  });

  return (
    <div>
      <div className='grid lg:grid-cols-2 gap-[1.2rem]'>
        <div className='panel lg:col-span-1'>
          <MultipleLineChart data={[]} colors={[]} title={''} categories={xAxisCategories} strokeWidth={[]} />
        </div>
        <div className='panel lg:col-span-1'>
          <p className='text-[0.9rem] font-semibold'>Storage</p>
        </div>
        <div className='panel lg:col-span-1'>
          <p className='text-[0.9rem] font-semibold'>Network</p>
        </div>
        <div className='panel lg:col-span-1'>
          <p className='text-[0.9rem] font-semibold'>Security</p>
        </div>
      </div>
    </div>
  );
};
