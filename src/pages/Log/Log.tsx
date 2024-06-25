import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import DateFormatter from '@/pages/Log/_partials/DateFormatter';
import FilterLogData from '@/pages/Log/_partials/FilterLogData';

import SetFrequentOptions from '@/pages/Log/_partials/SetFrequentOptions';
import SetLogData from '@/pages/Log/_partials/SetLogData';

import regionData from '@/pages/Log/filterData/region.json';
import serviceData from '@/pages/Log/filterData/service.json';

import vpcFrequntData from '@/pages/Log/filterData/vpcFrequentEventsList.json';
import ec2FrequntData from '@/pages/Log/filterData/ec2FrequentEventsList.json';
import elbFrequntData from '@/pages/Log/filterData/elbFrequentEventsList.json';
import rdsFrequntData from '@/pages/Log/filterData/rdsFrequentEventsList.json';
import iamFrequntData from '@/pages/Log/filterData/iamFrequentEventsList.json';
import s3FrequntData from '@/pages/Log/filterData/s3FrequentEventsList.json';

import LogData from '@/pages/Log/data/data.json';
import tableOption from '@/pages/Log/data/schema.json';
import userTag from '@/pages/Log/data/taguser.json';
import awsTag from '@/pages/Log/data/tagaws.json';

const Log = () => {
  const [fromDateValue, setFromDataValue] = useState<Dayjs | null>(null);
  const [toDateValue, setToDataValue] = useState<Dayjs | null>(null);

  const [regionValue, setRegionValue] = useState<string[]>([]);
  const [serviceCategoryValue, setServiceCategoryValue] = useState<string | undefined>(undefined);
  const [serviceValue, setServiceValue] = useState<string[]>([]);

  const [vpcFrequentEventsValue, setVpcFrequentEventsValue] = useState<string[]>([]);
  const [ec2FrequentEventsValue, setEc2FrequentEventsValue] = useState<string[]>([]);
  const [elbFrequentEventsValue, setElbFrequentEventsValue] = useState<string[]>([]);
  const [rdsFrequentEventsValue, setRdsFrequentEventsValue] = useState<string[]>([]);
  const [iamFrequentEventsValue, setIamFrequentEventsValue] = useState<string[]>([]);
  const [s3FrequentEventsValue, setS3FrequentEventsValue] = useState<string[]>([]);

  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);

  const regionOptions = regionData.Region.map((region: string) => ({ value: region, label: region }));

  const serviceCategoryOption = Object.keys(serviceData).map((serviceCategory: string) => ({ value: serviceCategory, label: serviceCategory }));

  // const serviceOption = Object.keys(serviceData).map((category) => ({
  //   label: category,
  //   options: serviceData[category].map((service: string) => ({ value: service, label: service })),
  // }));

  const serviceOption = serviceCategoryValue !== undefined ? serviceData[serviceCategoryValue]?.map((service: string) => ({ value: service, label: service })) : [];

  const isFrequentEvents = regionValue.length > 0 || (serviceCategoryValue !== undefined && serviceCategoryValue !== '') || serviceValue.length > 0;
  const isEventFilter =
    vpcFrequentEventsValue.length > 0 ||
    ec2FrequentEventsValue.length > 0 ||
    elbFrequentEventsValue.length > 0 ||
    rdsFrequentEventsValue.length > 0 ||
    iamFrequentEventsValue.length > 0 ||
    s3FrequentEventsValue.length > 0;

  const vpcFrequentEventsOption = SetFrequentOptions(vpcFrequntData);
  const ec2FrequentEventsOption = SetFrequentOptions(ec2FrequntData);
  const elbFrequentEventsOption = SetFrequentOptions(elbFrequntData);
  const rdsFrequentEventsOption = SetFrequentOptions(rdsFrequntData);
  const iamFrequentEventsOption = SetFrequentOptions(iamFrequntData);
  const s3FrequentEventsOption = SetFrequentOptions(s3FrequntData);

  const logData = SetLogData(LogData);
  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    mergedColumnDefs.forEach((columnDef) => {
      if (columnDef.valueFormatter === 'DateFormatter') {
        columnDef.valueFormatter = DateFormatter;
      }
    });
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(logData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, []);

  const onChangeSelect = (selectOption, selectBoxId: string) => {
    if (selectBoxId === 'serviceCategory') {
      setServiceCategoryValue(selectOption.value);
    } else {
      let options = selectOption ? selectOption.map((option) => option.value) : [];

      switch (selectBoxId) {
        case 'region':
          setRegionValue(options);
          break;
        case 'service':
          setServiceValue(options);
          break;
        case 'vpnFrequent':
          setVpcFrequentEventsValue(options);
          break;
        case 'ec2Frequent':
          setEc2FrequentEventsValue(options);
          break;
        case 'elbFrequent':
          setElbFrequentEventsValue(options);
          break;
        case 'rdsFrequent':
          setRdsFrequentEventsValue(options);
          break;
        case 'iamFrequent':
          setIamFrequentEventsValue(options);
          break;
        case 's3Frequent':
          setS3FrequentEventsValue(options);
          break;
      }
    }
  };

  const filteredData = FilterLogData({
    region: regionValue,
    fromDate: fromDateValue,
    toDate: toDateValue,
    serviceCategory: serviceCategoryValue,
    service: serviceValue,
    vpc: vpcFrequentEventsValue,
    ec2: ec2FrequentEventsValue,
    elb: elbFrequentEventsValue,
    rds: rdsFrequentEventsValue,
    iam: iamFrequentEventsValue,
    s3: s3FrequentEventsValue,
    logData: mergedTableData,
  });

  return (
    <>
      <div className='panel'>
        <p className='text-lg pb-4'>Event Filter</p>
        <div className='flex flex-row'>
          <div className='basis-1/2 pr-1'>
            <p>Region</p>
            <Select isDisabled={isEventFilter} isMulti options={regionOptions} onChange={(e) => onChangeSelect(e, 'region')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/4 px-1'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker']}
                sx={{
                  paddingTop: 2.2,
                }}
              >
                <DatePicker
                  label='From'
                  disabled={isEventFilter}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      size: 'small',
                    },
                  }}
                  showDaysOutsideCurrentMonth
                  format='YYYY-MM-DD'
                  value={fromDateValue}
                  onChange={(newValue) => setFromDataValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className='basis-1/4 pl-1'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker']}
                sx={{
                  paddingTop: 2.2,
                }}
              >
                <DatePicker
                  label='To'
                  disabled={isEventFilter}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      size: 'small',
                    },
                  }}
                  showDaysOutsideCurrentMonth
                  format='YYYY-MM-DD'
                  value={toDateValue}
                  onChange={(newValue) => setToDataValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className='flex flex-row mt-3'>
          <div className='basis-1/2 pr-1'>
            <p>Service Category</p>
            <Select isDisabled={isEventFilter} options={serviceCategoryOption} onChange={(e) => onChangeSelect(e, 'serviceCategory')} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/2 pl-1'>
            <p>Service</p>
            <Select isMulti isDisabled={isEventFilter} options={serviceOption} onChange={(e) => onChangeSelect(e, 'service')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
        </div>
      </div>
      <div className='panel mt-2'>
        <p className='text-lg pb-4'>Frequent Events</p>
        <div className='flex flex-row'>
          <div className='basis-1/3 pr-1'>
            <p>VPC</p>
            <Select isMulti isDisabled={isFrequentEvents} options={vpcFrequentEventsOption} onChange={(e) => onChangeSelect(e, 'vpnFrequent')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/3 px-1'>
            <p>EC2</p>
            <Select isMulti isDisabled={isFrequentEvents} options={ec2FrequentEventsOption} onChange={(e) => onChangeSelect(e, 'ec2Frequent')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/3 pl-1'>
            <p>ELB</p>
            <Select isMulti isDisabled={isFrequentEvents} options={elbFrequentEventsOption} onChange={(e) => onChangeSelect(e, 'elbFrequent')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
        </div>
        <div className='flex flex-row mt-3'>
          <div className='basis-1/3 pr-1'>
            <p>RDS</p>
            <Select isMulti isDisabled={isFrequentEvents} options={rdsFrequentEventsOption} onChange={(e) => onChangeSelect(e, 'rdsFrequent')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/3 px-1'>
            <p>IAM</p>
            <Select isMulti isDisabled={isFrequentEvents} options={iamFrequentEventsOption} onChange={(e) => onChangeSelect(e, 'iamFrequent')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/3 pl-1'>
            <p>S3</p>
            <Select isMulti isDisabled={isFrequentEvents} options={s3FrequentEventsOption} onChange={(e) => onChangeSelect(e, 's3Frequent')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
        </div>
      </div>
      <div className='panel mt-2'>
        <DataTable
          showSaveButton={false}
          datas={filteredData}
          columnDefs={columnDefs}
          defaultTableSetting={setDefaultTableSetting}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
          // saveCallback={saveEditedRow}
        >
          <p className='text-lg'>Log Viewer</p>
        </DataTable>
      </div>
    </>
  );
};

export default Log;
