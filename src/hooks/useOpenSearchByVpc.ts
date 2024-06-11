import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
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
type TrafficInfo = {
  packetSum: number;
  byteSum: number;
};
interface UseOpenSearchByVpcProps {
  fromVpc: string;
  toVpc: string;
}

const username = import.meta.env.VITE_OPENSEARCH_ID;
const password = import.meta.env.VITE_OPENSEARCH_PASSWORD;

export const useOpenSearchByVpc = ({ fromVpc, toVpc }: UseOpenSearchByVpcProps): { packetInfo?: Info; byteInfo?: Info } => {
  const [packetInfo, setPacketInfo] = useState<Info>();
  const [byteInfo, setByteInfo] = useState<Info>();
  const [fromFirstIp, fromSecondIp] = fromVpc.split('.');
  const [toFirstIp, toSecondIp] = toVpc.split('.');
  useEffect(() => {
    const fetchData = async () => {
      const info = {};
      const { data } = await axios({
        url: 'https://search-yubeom-vpcflow-simple-demo-sa4wteiguk3bweusfr6g7u2wgu.ap-northeast-2.es.amazonaws.com/_plugins/_sql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        },
        data: {
          query: `SELECT srcaddr, dstaddr, SUM(packets), SUM(bytes) FROM vpcflow-simple-demo WHERE srcaddr LIKE '${fromFirstIp}.${fromSecondIp}.%' AND dstaddr LIKE '${toFirstIp}.${toSecondIp}.%' GROUP BY srcaddr, dstaddr`,
        },
      });
      for (const [srcaddr, dstaddr, packetSum, byteSum] of data.datarows) {
        const [fromFirstIp, fromSecondIp, fromThirdIp] = srcaddr.split('.');
        const fromSubnetCidr = `${fromFirstIp}.${fromSecondIp}.${fromThirdIp}.0`;
        const [toFirstIp, toSecondIp, toThirdIp] = dstaddr.split('.');
        const toSubnetCidr = `${toFirstIp}.${toSecondIp}.${toThirdIp}.0`;
        if (!(toSubnetCidr in info)) {
          info[toSubnetCidr] = {};
        }
        if (!(fromSubnetCidr in info[toSubnetCidr])) {
          info[toSubnetCidr][fromSubnetCidr] = {
            packetSum: 0,
            byteSum: 0,
          };
        }
        info[toSubnetCidr][fromSubnetCidr].packetSum += packetSum;
        info[toSubnetCidr][fromSubnetCidr].byteSum += byteSum;
      }
      if (!Object.keys(info).length) {
        setPacketInfo(undefined);
        setByteInfo(undefined);
        return;
      }
      for (const toSubnetCidr in info) {
        const subtitleText = toSubnetCidr;
        const categories = Object.keys(info[toSubnetCidr]);
        const trafficInfo: TrafficInfo[] = Object.values(info[toSubnetCidr]);
        const packets: number[] = [];
        const bytes: number[] = [];
        for (const { packetSum, byteSum } of trafficInfo) {
          packets.push(packetSum);
          bytes.push(byteSum);
        }
        setPacketInfo({
          series: [
            {
              name: 'Packet',
              data: packets,
            },
          ],
          options: {
            subtitle: {
              text: subtitleText,
              align: 'center',
              margin: 16,
              offsetX: 0,
              offsetY: 32,
              floating: false,
              style: {
                fontSize: '16px',
                fontWeight: 'normal',
                color: '#9699A2',
              },
            },
            title: {
              text: 'Total Packet',
              align: 'center',
              margin: 10,
              offsetX: 0,
              offsetY: 0,
              floating: false,
              style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#263238',
              },
            },
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: true,
            },
            xaxis: {
              categories,
              labels: {
                style: {
                  fontSize: '12px',
                },
              },
            },
          },
        });
        setByteInfo({
          series: [
            {
              name: 'Byte',
              data: bytes,
            },
          ],
          options: {
            subtitle: {
              text: subtitleText,
              align: 'center',
              margin: 16,
              offsetX: 0,
              offsetY: 32,
              floating: false,
              style: {
                fontSize: '16px',
                fontWeight: 'normal',
                color: '#9699A2',
              },
            },
            title: {
              text: 'Total Byte',
              align: 'center',
              margin: 10,
              offsetX: 0,
              offsetY: 0,
              floating: false,
              style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#263238',
              },
            },
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: true,
            },
            xaxis: {
              categories,
              labels: {
                style: {
                  fontSize: '12px',
                },
              },
            },
          },
        });
      }
    };
    if (fromVpc && toVpc) {
      fetchData();
    }
  }, [fromVpc, toVpc]);
  return { packetInfo, byteInfo };
};
