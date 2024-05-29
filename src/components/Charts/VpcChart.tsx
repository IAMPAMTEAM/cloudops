import { useState } from 'react';
import { useOpenSearchByVpc } from '../../hooks/useOpenSearchByVpc';
import ReactApexChart from 'react-apexcharts';
import { useVpcs } from '../../hooks/useVpcs';

function VpcChart() {
  const [fromVpc, setFromVpc] = useState('');
  const [toVpc, setToVpc] = useState('');

  const { vpcs } = useVpcs();

  const { packetInfo: vpcPacketInfo, byteInfo: vpcByteInfo } = useOpenSearchByVpc({
    fromVpc,
    toVpc,
  });

  const mapedVpcs = vpcs.map((vpc, index) => {
    return <option key={index}>{`${vpc}.0.0`}</option>;
  });

  if (!vpcPacketInfo || !vpcByteInfo) {
    return (
      <div className='flex gap-6 p-6'>
        <div>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={({ target }) => {
              const [vpcFirstIp, vpcSecondIp] = target.value.split('.');

              setFromVpc(`${vpcFirstIp}.${vpcSecondIp}`);
            }}
          >
            <option disabled selected>
              From VPC
            </option>
            {mapedVpcs}
          </select>
        </div>
        <div>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={({ target }) => {
              const [vpcFirstIp, vpcSecondIp] = target.value.split('.');

              setToVpc(`${vpcFirstIp}.${vpcSecondIp}`);
            }}
          >
            <option disabled selected>
              To VPC
            </option>
            {mapedVpcs}
          </select>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex gap-6 p-6'>
        <div>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={({ target }) => {
              const [vpcFirstIp, vpcSecondIp] = target.value.split('.');

              setFromVpc(`${vpcFirstIp}.${vpcSecondIp}`);
            }}
          >
            <option disabled selected>
              From VPC
            </option>
            {mapedVpcs}
          </select>
        </div>
        <div>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={({ target }) => {
              const [vpcFirstIp, vpcSecondIp] = target.value.split('.');

              setToVpc(`${vpcFirstIp}.${vpcSecondIp}`);
            }}
          >
            <option disabled selected>
              To VPC
            </option>
            {mapedVpcs}
          </select>
        </div>
      </div>
      <div id='chart'>
        <ReactApexChart options={vpcPacketInfo.options} series={vpcPacketInfo.series} type='bar' height={350} />
      </div>
      <div id='html-dist'></div>
      <div id='chart'>
        <ReactApexChart options={vpcByteInfo.options} series={vpcByteInfo.series} type='bar' height={350} />
      </div>
      <div id='html-dist'></div>
    </>
  );
}

export default VpcChart;
