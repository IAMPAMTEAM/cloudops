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
      // if (service.length > 0) {
      //   matchesService = data.service === service;
      // }

      return matchesRegion && matchesFromDate && matchesToDate && matchesService;
    });
  }

  // Frequent Events Filter
  if (vpc.length > 0 || ec2.length > 0 || elb.length > 0 || rds.length > 0 || iam.length > 0 || s3.length > 0) {
    filteredData = filteredData.filter((data: any) => {
      if (vpc.length > 0 && !vpc.includes(data.vpc)) {
        return false;
      }

      if (ec2.length > 0 && !ec2.includes(data.ec2)) {
        return false;
      }

      if (elb.length > 0 && !elb.includes(data.elb)) {
        return false;
      }

      if (rds.length > 0 && !rds.includes(data.rds)) {
        return false;
      }

      if (iam.length > 0 && !iam.includes(data.iam)) {
        return false;
      }

      if (s3.length > 0 && !s3.includes(data.s3)) {
        return false;
      }

      return true;
    });
  }

  // if (fromDate && toDate) {
  //   filteredData = filteredData.filter((data: any) => {
  //     const logDate = new Date(data.timestamp);
  //     const startDate = new Date(fromDate);
  //     const endDate = new Date(toDate);

  //     return logDate >= startDate && logDate <= endDate;
  //   });
  // }

  // if (serviceCategory.length > 0) {
  //   filteredData = filteredData.filter((data: any) => serviceCategory.includes(data.serviceCategory));
  // }

  // if (service.length > 0) {
  //   filteredData = filteredData.filter((data: any) => service.includes(data.service));
  // }

  // if (vpc.length > 0) {
  //   filteredData = filteredData.filter((data: any) => vpc.includes(data.vpc));
  // }

  // if (ec2.length > 0) {
  //   filteredData = filteredData.filter((data: any) => ec2.includes(data.ec2));
  // }

  // if (elb.length > 0) {
  //   filteredData = filteredData.filter((data: any) => elb.includes(data.elb));
  // }

  // if (rds.length > 0) {
  //   filteredData = filteredData.filter((data: any) => rds.includes(data.rds));
  // }

  // if (iam.length > 0) {
  //   filteredData = filteredData.filter((data: any) => iam.includes(data.iam));
  // }

  // if (s3.length > 0) {
  //   filteredData = filteredData.filter((data: any) => s3.includes(data.s3));
  // }

  return filteredData;
}
