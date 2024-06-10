import { MultipleLineChart } from '@/components/Charts/_partials/MultipleLineChart';
import { useEffect, useState } from 'react';

interface Compute {
  RunningEC2: number;
  StoppedEC2: number;
  ActiveLambda: number;
  RunningFargateTasks: number;
  RunningECSTasks: number;
}

interface Storage {
  Buckets: number;
  EBS: number;
  Glacier: number;
}

interface Network {
  VPCs: number;
  Subnets: number;
  EIPs: number;
  Routes: number;
  NATGateways: number;
  InternetGateways: number;
  VPCPeerings: number;
  DirectConnects: number;
}

interface Security {
  IAMUsers: number;
  IAMGroups: number;
  IAMRoles: number;
  IAMPolicies: number;
  AccessKeys: number;
}

interface ResourceData {
  date: string;
  compute: Compute;
  storage: Storage;
  network: Network;
  security: Security;
}

export const ResourcesComponent = () => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [xAxisCategories, setXAxisCategories] = useState<string[]>([]);
  const [resourceCnt, setResourceCnt] = useState<number>(0);

  // Compute
  const [computeData, setComputeData] = useState<Compute[]>([]);
  const [computeLineData, setComputeLineData] = useState<{ name: string; data: number[] }[]>([]);

  // Storage
  const [storageData, setStorageData] = useState<Storage[]>([]);
  const [storageLineData, setStorageLineData] = useState<{ name: string; data: number[] }[]>([]);

  // Network
  const [networkData, setNetworkData] = useState<Network[]>([]);
  const [networkLineData, setNetworkLineData] = useState<{ name: string; data: number[] }[]>([]);

  // Security
  const [securityData, setSecurityData] = useState<Security[]>([]);
  const [securityLineData, setSecurityLineData] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/dashboard/resources.json')
      .then((result) => result.json())
      .then((data: ResourceData[]) => {
        setResourceData(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    resourceData.forEach((d: ResourceData) => {
      if (resourceCnt < 2) {
        setXAxisCategories((prev) => [...prev, d.date]);
        setComputeData((prev) => [...prev, d.compute]);
        setStorageData((prev) => [...prev, d.storage]);
        setNetworkData((prev) => [...prev, d.network]);
        setSecurityData((prev) => [...prev, d.security]);
        setResourceCnt((prev) => prev + 1);
      }
    });
  }, [xAxisCategories, computeData, resourceData, resourceCnt, storageData]);

  useEffect(() => {
    setComputeLineData([
      {
        name: 'Running EC2',
        data: computeData.map((data) => data.RunningEC2),
      },
      {
        name: 'Stopped EC2',
        data: computeData.map((data) => data.StoppedEC2),
      },
      {
        name: 'Active Lambda',
        data: computeData.map((data) => data.ActiveLambda),
      },
      {
        name: 'Running Fargate Tasks',
        data: computeData.map((data) => data.RunningFargateTasks),
      },
      {
        name: 'Running ECS Tasks',
        data: computeData.map((data) => data.RunningECSTasks),
      },
    ]);
  }, [computeData]);

  useEffect(() => {
    setStorageLineData([
      {
        name: 'Buckets',
        data: storageData.map((data) => data.Buckets),
      },
      {
        name: 'EBS',
        data: storageData.map((data) => data.EBS),
      },
      {
        name: 'Glacier',
        data: storageData.map((data) => data.Glacier),
      },
    ]);
  }, [storageData]);

  useEffect(() => {
    setNetworkLineData([
      {
        name: 'VPC',
        data: networkData.map((data) => data.VPCs),
      },
      {
        name: 'Subnets',
        data: networkData.map((data) => data.Subnets),
      },
      {
        name: 'EIPs',
        data: networkData.map((data) => data.EIPs),
      },
      {
        name: 'Routes',
        data: networkData.map((data) => data.Routes),
      },
      {
        name: 'NAT Gateways',
        data: networkData.map((data) => data.NATGateways),
      },
      {
        name: 'Internet Gateways',
        data: networkData.map((data) => data.InternetGateways),
      },
      {
        name: 'VPC Peerings',
        data: networkData.map((data) => data.VPCPeerings),
      },
      {
        name: 'Direct Connects',
        data: networkData.map((data) => data.DirectConnects),
      },
    ]);
  }, [networkData]);

  useEffect(() => {
    setSecurityLineData([
      {
        name: 'IAM Users',
        data: securityData.map((data) => data.IAMUsers),
      },
      {
        name: 'IAM Groups',
        data: securityData.map((data) => data.IAMGroups),
      },
      {
        name: 'IAM Roles',
        data: securityData.map((data) => data.IAMRoles),
      },
      {
        name: 'IAM Policies',
        data: securityData.map((data) => data.IAMPolicies),
      },
      {
        name: 'Access Keys',
        data: securityData.map((data) => data.AccessKeys),
      },
    ]);
  }, [securityData]);

  // TODO: color
  return (
    <div>
      <div className='grid lg:grid-cols-2 gap-[1.2rem]'>
        <div className='panel lg:col-span-1'>
          <MultipleLineChart data={computeLineData} colors={[]} title={'Daily Trend [Compute]'} categories={xAxisCategories} strokeWidth={[3, 3, 3, 3, 3]} />
        </div>
        <div className='panel lg:col-span-1'>
          <MultipleLineChart data={storageLineData} colors={[]} title={'Daily Trend [Storage]'} categories={xAxisCategories} strokeWidth={[3, 3, 3]} />
        </div>
        <div className='panel lg:col-span-1'>
          <MultipleLineChart data={networkLineData} colors={[]} title={'Daily Trend [Network]'} categories={xAxisCategories} strokeWidth={[3, 3, 3, 3, 3, 3, 3, 3]} />
        </div>
        <div className='panel lg:col-span-1'>
          <MultipleLineChart data={securityLineData} colors={[]} title={'Daily Trend [Security]'} categories={xAxisCategories} strokeWidth={[3, 3, 3, 3, 3]} />
        </div>
      </div>
    </div>
  );
};
