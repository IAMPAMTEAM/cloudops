import { useEffect, useState } from 'react';
import { MultipleLineChart } from '@/components/Charts/_partials/MultipleLineChart';
import { CostStats } from './CostStats';

interface ServiceCost {
  date: string;
  totalCost: number;
  awsConfig: number;
  awsKeyManagementService: number;
  'ec2-Other': number;
  'amazonElasticComputeCloud-Compute': number;
  amazonSimpleNotificationService: number;
  amazonSimpleQueueService: number;
  amazonSimpleStorageService: number;
  amazonVirtualPrivateCloud: number;
  amazonCloudwatch: number;
  tax: number;
  awsGlue: number;
  awsMigrationHubRefactorSpaces: number;
  awsCostExplorer: number;
  awsLambda: number;
  awsSecretsManager: number;
  'awsX-Ray': number;
  amazonAPIGateway: number;
  amazonAthena: number;
  awsDataTransfer: number;
  awsCloudTrail: number;
  amazonLocationService: number;
  amazonDocumentDB: number;
  awsServiceCatalog: number;
  awsStepFunctions: number;
  amazonDynamoDB: number;
  amazonComprehend: number;
  amazonElasticContainerService: number;
  amazonSimpleEmailService: number;
  awsCloudShell: number;
  amazonElasticLoadBalancing: number;
}

interface RegionCost {
  date: string;
  Unknown: number;
  Seoul: number;
  Richmond: number;
  Tokyo: number;
  Osaka: number;
  Mumbai: number;
  Singapore: number;
  Sydney: number;
  Toronto: number;
  Frankfurt: number;
  Stockholm: number;
  Ireland: number;
  London: number;
  Paris: number;
  'Sao Paulo': number;
  Columbus: number;
  Portland: number;
  Oakland: number;
}

interface AccountCost {
  date: string;
  totalCost: number;
  account: any;
}

export const CostComponent = () => {
  // service cost
  const [serviceCostData, setServiceCostData] = useState<ServiceCost[]>([]);
  const [serviceCostCnt, setServiceCostCnt] = useState<number>(0);
  const [serviceCostLineData, setServiceCostLineData] = useState<{ name: string; data: number[] }[]>([]);
  const [serviceXAxisCategories, setServiceXAxisCategories] = useState<string[]>([]);

  // region cost
  const [regionCostData, setRegionCostData] = useState<RegionCost[]>([]);
  const [regionCostLineData, setRegionCostLineData] = useState<{ name: string; data: number[] }[]>([]);

  // account Cost
  const [accountCostData, setAccountCostData] = useState<AccountCost[]>([]);
  const [accountCostLineData, setAccountCostLineData] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/dashboard/service-cost.json')
      .then((result) => result.json())
      .then((data: ServiceCost[]) => {
        setServiceCostData(data);
      })
      .catch((err) => {
        throw new Error(err);
      });

    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/dashboard/region-cost.json')
      .then((result) => result.json())
      .then((data: RegionCost[]) => {
        setRegionCostData(data);
      })
      .catch((err) => {
        throw new Error(err);
      });

    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/dashboard/account-cost.json')
      .then((result) => result.json())
      .then((data: AccountCost[]) => {
        setAccountCostData(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    serviceCostData.forEach((d: ServiceCost) => {
      if (serviceCostCnt < 2) {
        setServiceXAxisCategories((prev) => [...prev, d.date]);
        setServiceCostCnt((prev) => prev + 1);
      }
    });
  }, [serviceXAxisCategories, serviceCostData, serviceCostCnt]);

  useEffect(() => {
    setServiceCostLineData([
      {
        name: 'awsConfig',
        data: serviceCostData.map((data) => data.awsConfig),
      },
      {
        name: 'awsKeyManagementService',
        data: serviceCostData.map((data) => data.awsKeyManagementService),
      },
      {
        name: 'ec2-Other',
        data: serviceCostData.map((data) => data['ec2-Other']),
      },
      {
        name: 'amazonElasticComputeCloud-Compute',
        data: serviceCostData.map((data) => data['amazonElasticComputeCloud-Compute']),
      },
      {
        name: 'amazonSimpleNotificationService',
        data: serviceCostData.map((data) => data.amazonSimpleNotificationService),
      },
      {
        name: 'amazonSimpleQueueService',
        data: serviceCostData.map((data) => data.amazonSimpleQueueService),
      },
      {
        name: 'amazonSimpleStorageService',
        data: serviceCostData.map((data) => data.amazonSimpleStorageService),
      },
      {
        name: 'amazonVirtualPrivateCloud',
        data: serviceCostData.map((data) => data.amazonVirtualPrivateCloud),
      },
      {
        name: 'amazonCloudwatch',
        data: serviceCostData.map((data) => data.amazonCloudwatch),
      },
      {
        name: 'tax',
        data: serviceCostData.map((data) => data.tax),
      },
      {
        name: 'awsGlue',
        data: serviceCostData.map((data) => data.awsGlue),
      },
      {
        name: 'awsMigrationHubRefactorSpaces',
        data: serviceCostData.map((data) => data.awsMigrationHubRefactorSpaces),
      },
      {
        name: 'awsCostExplorer',
        data: serviceCostData.map((data) => data.awsCostExplorer),
      },
      {
        name: 'awsLambda',
        data: serviceCostData.map((data) => data.awsLambda),
      },
      {
        name: 'awsSecretsManager',
        data: serviceCostData.map((data) => data.awsSecretsManager),
      },
      {
        name: 'awsXRay',
        data: serviceCostData.map((data) => data['awsX-Ray']),
      },
      {
        name: 'amazonAPIGateway',
        data: serviceCostData.map((data) => data.amazonAPIGateway),
      },
      {
        name: 'amazonAthena',
        data: serviceCostData.map((data) => data.amazonAthena),
      },
      {
        name: 'awsDataTransfer',
        data: serviceCostData.map((data) => data.awsDataTransfer),
      },
      {
        name: 'awsCloudTrail',
        data: serviceCostData.map((data) => data.awsCloudTrail),
      },
      {
        name: 'amazonLocationService',
        data: serviceCostData.map((data) => data.amazonLocationService),
      },
      {
        name: 'amazonDocumentDB',
        data: serviceCostData.map((data) => data.amazonDocumentDB),
      },
      {
        name: 'awsServiceCatalog',
        data: serviceCostData.map((data) => data.awsServiceCatalog),
      },
      {
        name: 'awsStepFunctions',
        data: serviceCostData.map((data) => data.awsStepFunctions),
      },
      {
        name: 'amazonDynamoDB',
        data: serviceCostData.map((data) => data.amazonDynamoDB),
      },
      {
        name: 'amazonComprehend',
        data: serviceCostData.map((data) => data.amazonComprehend),
      },
      {
        name: 'amazonElasticContainerService',
        data: serviceCostData.map((data) => data.amazonElasticContainerService),
      },
      {
        name: 'amazonSimpleEmailService',
        data: serviceCostData.map((data) => data.amazonSimpleEmailService),
      },
      {
        name: 'awsCloudShell',
        data: serviceCostData.map((data) => data.awsCloudShell),
      },
      {
        name: 'amazonElasticLoadBalancing',
        data: serviceCostData.map((data) => data.amazonElasticLoadBalancing),
      },
    ]);
  }, [serviceCostData]);

  useEffect(() => {
    setRegionCostLineData([
      {
        name: 'Seoul',
        data: regionCostData.map((data) => data.Seoul),
      },
      {
        name: 'Richmond',
        data: regionCostData.map((data) => data.Richmond),
      },
      {
        name: 'Tokyo',
        data: regionCostData.map((data) => data.Tokyo),
      },
      {
        name: 'Osaka',
        data: regionCostData.map((data) => data.Osaka),
      },
      {
        name: 'Mumbai',
        data: regionCostData.map((data) => data.Mumbai),
      },
      {
        name: 'Singapore',
        data: regionCostData.map((data) => data.Singapore),
      },
      {
        name: 'Sydney',
        data: regionCostData.map((data) => data.Sydney),
      },
      {
        name: 'Toronto',
        data: regionCostData.map((data) => data.Toronto),
      },
      {
        name: 'Frankfurt',
        data: regionCostData.map((data) => data.Frankfurt),
      },
      {
        name: 'Stockholm',
        data: regionCostData.map((data) => data.Stockholm),
      },
      {
        name: 'Ireland',
        data: regionCostData.map((data) => data.Ireland),
      },
      {
        name: 'London',
        data: regionCostData.map((data) => data.London),
      },
      {
        name: 'Paris',
        data: regionCostData.map((data) => data.Paris),
      },
      {
        name: 'Sao Paulo',
        data: regionCostData.map((data) => data['Sao Paulo']),
      },
      {
        name: 'Columbus',
        data: regionCostData.map((data) => data.Columbus),
      },
      {
        name: 'Portland',
        data: regionCostData.map((data) => data.Portland),
      },
      {
        name: 'Oakland',
        data: regionCostData.map((data) => data.Oakland),
      },
    ]);
  }, [regionCostData]);

  useEffect(() => {
    accountCostData.map((data: AccountCost) => {
      // Object.keys(data.account): name
      // Object.values(data.account): value
      const key = Object.keys(data.account);
      setAccountCostLineData([
        // {
        // name: Object.keys(data.account).map(d => d),
        // data: Object.values(data.account),
        // }
      ]);
    });
    // setAccountCostLineData([
    //   {
    //     name: accountCostData.map(data => data.account)
    //   }
    // ])
  }, [accountCostData]);

  return (
    <div className='grid lg:grid-cols-3 gap-[1.2rem]'>
      <div className='panel lg:col-span-3'>
        <p className='text-[1rem] font-bold mb-[1.2rem]'>Service</p>
        <div className='grid lg:grid-cols-3 gap-[1.2rem] '>
          <CostStats costData={serviceCostData} category='service' />
          <div className='lg:col-span-3'>
            <MultipleLineChart data={serviceCostLineData} colors={[]} title={'Daily Trend [Cost per Service]'} categories={serviceXAxisCategories} strokeWidth={[]} />
          </div>
        </div>
      </div>

      <div className='panel lg:col-span-3'>
        <p className='text-[1rem] font-bold mb-[1.2rem]'>Region</p>
        <div className='grid lg:grid-cols-3 gap-[1.2rem]'>
          <CostStats costData={regionCostData} category='region' />
          <div className='lg:col-span-3'>
            <MultipleLineChart data={regionCostLineData} colors={[]} title={'Daily Trend [Cost per Region]'} categories={serviceXAxisCategories} strokeWidth={[]} />
          </div>
        </div>
      </div>

      <div className='panel lg:col-span-3'>
        <p className='text-[1rem] font-bold mb-[1.2rem]'>Account</p>
        <div className=' grid lg:grid-cols-3 gap-[1.2rem]'>
          <CostStats costData={[]} category={''} />
          <div className='lg:col-span-3'>
            <MultipleLineChart data={[]} colors={[]} title={'Daily Trend [Cost per Account]'} categories={[]} strokeWidth={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};
