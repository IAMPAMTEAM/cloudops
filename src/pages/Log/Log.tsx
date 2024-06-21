import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import regionData from '@/pages/Log/filterData/region.json';
import serviceData from '@/pages/Log/filterData/service.json';

const Log = () => {
  const [fromDateValue, setFromDataValue] = useState<Dayjs | null>(null);
  const [toDateValue, setToDataValue] = useState<Dayjs | null>(null);

  const [regionValue, setRegionValue] = useState<string[]>([]);
  const [serviceCategoryValue, setServiceCategoryValue] = useState<string[]>([]);
  const [serviceValue, setServiceValue] = useState<string[]>([]);

  const onChangeSelect = (selectOption, selectBoxId: string) => {
    const options = selectOption ? selectOption.map((option) => option.value) : [];

    switch (selectBoxId) {
      case 'region':
        setRegionValue(options);
        console.log(regionValue);
        break;
      case 'serviceCategory':
        setServiceCategoryValue(options);
        console.log(serviceCategoryValue);
        break;
      case 'service':
        setServiceValue(options);
        console.log(serviceValue);
        break;
    }
  };

  const regionOptions = regionData.Region.map((region: string) => ({ value: region, label: region }));

  const serviceCategoryOption = Object.values(serviceData)
    .flat()
    .map((serviceCategory: string) => ({ value: serviceCategory, label: serviceCategory }));

  const serviceOption = Object.keys(serviceData).map((category) => ({
    label: category,
    options: serviceData[category].map((service: string) => ({ value: service, label: service })),
  }));

  return (
    <>
      <div className='panel'>
        <p className='text-lg pb-4'>Event Filter</p>
        <div className='flex flex-row'>
          <div className='basis-1/2 pr-1'>
            <p>Region</p>
            <Select isMulti options={regionOptions} onChange={(e) => onChangeSelect(e, 'region')} closeMenuOnSelect={false} hideSelectedOptions={false} />
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
            {/* <p>Time to</p>
            <Select options={options} hideSelectedOptions={false} /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker']}
                sx={{
                  paddingTop: 2.2,
                }}
              >
                <DatePicker
                  label='To'
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
            <Select isMulti options={serviceCategoryOption} onChange={(e) => onChangeSelect(e, 'serviceCategory')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
          <div className='basis-1/2 pl-1'>
            <p>Service</p>
            <Select isMulti options={serviceOption} onChange={(e) => onChangeSelect(e, 'service')} closeMenuOnSelect={false} hideSelectedOptions={false} />
          </div>
        </div>
      </div>
      <div className='panel mt-2'>
        <p className='text-lg pb-4'>Frequent Events</p>
      </div>
    </>
  );
};

export default Log;
