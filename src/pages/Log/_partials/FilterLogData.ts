import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

interface Props {
  region: string[];
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  service: string[];
  vpc: string[];
  ec2: string[];
  elb: string[];
  rds: string[];
  iam: string[];
  s3: string[];
  logData: any;
}

export default function FilterLogData(props: Props) {
  const { region, fromDate, toDate, service, vpc, ec2, elb, rds, iam, s3, logData } = props;
  let filteredData = logData;

  const normalizeString = (str: string) => str.toLowerCase().replace(/\s+/g, '');

  // Event Filter
  if (region.length > 0 || fromDate || toDate || service.length > 0) {
    filteredData = filteredData.filter((data: any) => {
      let matchesRegion = true;
      let matchesFromDate = true;
      let matchesToDate = true;
      let matchesService = true;

      // Filter by region
      if (region.length > 0) {
        // matchesRegion = data.awsRegion.includes(region);
        matchesRegion = region.some((selectedRegion) => data.awsRegion.includes(selectedRegion));
      }

      // Filter by Date
      if (fromDate !== null && toDate !== null) {
        dayjs.extend(isBetween);
        const eventTime = dayjs(data.eventTime);
        matchesFromDate = eventTime.isBetween(fromDate, toDate, 'day', '[]');
      }

      // Filter by service
      if (service.length > 0) {
        matchesService =
          Array.isArray(data.resourceType) &&
          data.resourceType.some((resource: string) => {
            if (resource && typeof resource === 'string') {
              const resourceParts = resource.split('::');
              const resourceService = normalizeString(resourceParts[1]);

              return service.some((selectedService) => normalizeString(selectedService) === resourceService);
            }
            return false;
          });
      }

      return matchesRegion && matchesFromDate && matchesToDate && matchesService;
    });
  }

  // Frequent Events Filter
  if (vpc.length > 0 || ec2.length > 0 || elb.length > 0 || rds.length > 0 || iam.length > 0 || s3.length > 0) {
    filteredData = filteredData.filter((data: any) => {
      const allFrequentEvents = [...vpc, ...ec2, ...elb, ...rds, ...iam, ...s3];
      return allFrequentEvents.some((event) => data.eventName === event);
    });
  }

  return filteredData;
}
