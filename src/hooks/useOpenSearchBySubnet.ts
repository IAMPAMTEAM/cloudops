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

interface UseOpenSearchBySubnetProps {
  selectedVpc: string;
  fromSubnet: string;
  toSubnet: string;
}

const username = 'yubeom';
const password = 'Kimsm1204!';

export const useOpenSearchBySubnet = ({
  selectedVpc,
  fromSubnet,
  toSubnet,
}: UseOpenSearchBySubnetProps): {
  packetInfos?: Info[];
  byteInfos?: Info[];
} => {
  const [packetInfos, setPacketInfos] = useState<Info[]>();
  const [byteInfos, setByteInfos] = useState<Info[]>();

  useEffect(() => {
    const fetchData = async () => {
      const info = {};

      const [fromSubnetFirstIp, fromSubnetSecondIp, fromSubnetThirdIp] = fromSubnet.split('.');
      const transformedFromSubnet = `${fromSubnetFirstIp}.${fromSubnetSecondIp}.${fromSubnetThirdIp}`;

      const [toSubnetFirstIp, toSubnetSecondIp, toSubnetThirdIp] = toSubnet.split('.');
      const transformedtoSubnet = `${toSubnetFirstIp}.${toSubnetSecondIp}.${toSubnetThirdIp}`;

      const { data } = await axios({
        url: 'https://search-yubeom-vpcflow-simple-demo-sa4wteiguk3bweusfr6g7u2wgu.ap-northeast-2.es.amazonaws.com/_plugins/_sql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        },
        data: {
          query: `SELECT srcaddr, dstaddr, SUM(packets), SUM(bytes) FROM vpcflow-simple-demo WHERE srcaddr LIKE '${transformedFromSubnet}.%' AND dstaddr LIKE '${transformedtoSubnet}.%' GROUP BY srcaddr, dstaddr`,
        },
      });

      for (const [srcaddr, dstaddr, packetSum, byteSum] of data.datarows) {
        const fromEC2 = srcaddr;
        const toEC2 = dstaddr;

        if (!(toEC2 in info)) {
          info[toEC2] = {};
        }

        if (!(fromEC2 in info[toEC2])) {
          info[toEC2][fromEC2] = {
            packetSum: 0,
            byteSum: 0,
          };
        }

        info[toEC2][fromEC2].packetSum += packetSum;
        info[toEC2][fromEC2].byteSum += byteSum;
      }

      const packetChartInfos: Info[] = [];
      const byteChartInfos: Info[] = [];

      for (const toEC2 in info) {
        const subtitleText = toEC2;
        const categories = Object.keys(info[toEC2]);
        const trafficInfo: TrafficInfo[] = Object.values(info[toEC2]);
        const packets: number[] = [];
        const bytes: number[] = [];

        for (const { packetSum, byteSum } of trafficInfo) {
          packets.push(packetSum);
          bytes.push(byteSum);
        }

        packetChartInfos.push({
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
                color: '#9699a2',
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
        byteChartInfos.push({
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
                color: '#9699a2',
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

      setPacketInfos(packetChartInfos);
      setByteInfos(byteChartInfos);
    };

    if (fromSubnet && toSubnet) {
      fetchData();
    }
  }, [selectedVpc, fromSubnet, toSubnet]);

  return { packetInfos, byteInfos };
};
