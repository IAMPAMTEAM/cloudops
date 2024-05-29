import { Fragment, useRef } from 'react';
import { useOpenSearchBySubnet } from '../../hooks/useOpenSearchBySubnet';
import ReactApexChart from 'react-apexcharts';
import { useVpcs } from '../../hooks/useVpcs';
import { useSubnets } from '../../hooks/useSubnets';

type Series = {
  name: string;
  data: number[];
};

type Options = {
  [index: string]: any;
};

type Info = {
  series: Series[];
  options: Options;
};

function SubnetChart({ selectedVpc, fromSubnet, toSubnet }: { selectedVpc: string; fromSubnet: string; toSubnet: string }) {
  // const [selectedVpc, setSelectedVpc] = useState('');
  // const [fromSubnet, setFromSubnet] = useState('');
  // const [toSubnet, setToSubnet] = useState('');
  const fromSubnetRef = useRef<HTMLSelectElement>(null);
  const toSubnetRef = useRef<HTMLSelectElement>(null);

  const { vpcs } = useVpcs();
  const { subnets } = useSubnets({ selectedVpc });
  console.log(selectedVpc, fromSubnet, toSubnet);
  const { packetInfos: ec2PacketInfos, byteInfos: ec2ByteInfos } = useOpenSearchBySubnet({
    selectedVpc,
    fromSubnet,
    toSubnet,
  });

  const mapedVpcs = vpcs.map((vpc, index) => <option key={index}>{`${vpc}.0.0`}</option>);

  const mapedSubnets = subnets.map((subnet, index) => <option key={index}>{`${subnet}.0`}</option>);

  if (!ec2PacketInfos || !ec2ByteInfos || !selectedVpc || !fromSubnet || !toSubnet) {
    return;
  }

  // if (!ec2PacketInfos || !ec2ByteInfos) {
  //   return;
  // <div className='flex gap-6 p-6'>
  //   <select
  //     className='select select-bordered w-full max-w-xs'
  //     onChange={({ target }) => {
  //       const [vpcFirstIp, vpcSecondIp] = target.value.split('.');

  //       setSelectedVpc(`${vpcFirstIp}.${vpcSecondIp}`);
  //       setFromSubnet('');
  //       setToSubnet('');
  //     }}
  //   >
  //     <option disabled selected>
  //       VPC
  //     </option>
  //     {mapedVpcs}
  //   </select>
  //   <select
  //     className='select select-bordered w-full max-w-xs'
  //     onChange={({ target }) => {
  //       const [subnetFirstIp, subnetSecondIp, subnetThirdIp] = target.value.split('.');

  //       setFromSubnet(`${subnetFirstIp}.${subnetSecondIp}.${subnetThirdIp}`);
  //     }}
  //   >
  //     <option disabled selected>
  //       From Subnet
  //     </option>
  //     {mapedSubnets}
  //   </select>
  //   <select
  //     className='select select-bordered w-full max-w-xs'
  //     onChange={({ target }) => {
  //       const [subnetFirstIp, subnetSecondIp, subnetThirdIp] = target.value.split('.');

  //       setToSubnet(`${subnetFirstIp}.${subnetSecondIp}.${subnetThirdIp}`);
  //     }}
  //   >
  //     <option disabled selected>
  //       To Subnet
  //     </option>
  //     {mapedSubnets}
  //   </select>
  // </div>
  // }

  const packetCharts = (ec2PacketInfos as Info[]).map((subnetPacketInfo: any, index) => {
    return (
      <Fragment key={index}>
        <div id='chart'>
          <ReactApexChart options={subnetPacketInfo.options} series={subnetPacketInfo.series} type='bar' height={350} />
        </div>
        <div id='html-dist'></div>
      </Fragment>
    );
  });

  const byteCharts = (ec2ByteInfos as Info[]).map((ec2ByteInfo: any, index) => {
    return (
      <Fragment key={index}>
        <div id='chart'>
          <ReactApexChart options={ec2ByteInfo.options} series={ec2ByteInfo.series} type='bar' height={350} />
        </div>
        <div id='html-dist'></div>
      </Fragment>
    );
  });

  return (
    <div className='flex' style={{ width: packetCharts.length * 2 * 300 }}>
      {packetCharts}
      {byteCharts}
    </div>
  );
}

export default SubnetChart;
