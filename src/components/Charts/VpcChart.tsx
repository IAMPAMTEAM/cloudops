import { useOpenSearchByVpc } from '../../hooks/useOpenSearchByVpc';
import ReactApexChart from 'react-apexcharts';
function VpcChart({ fromVpc, toVpc }: { fromVpc: string; toVpc: string }) {
  const { packetInfo: vpcPacketInfo, byteInfo: vpcByteInfo } = useOpenSearchByVpc({
    fromVpc,
    toVpc,
  });
  if (!vpcPacketInfo || !vpcByteInfo) {
    return;
  }
  console.log(fromVpc, toVpc);
  return (
    <>
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
