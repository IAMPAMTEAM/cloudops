import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';

const username = import.meta.env.VITE_OPENSEARCH_ID;
const password = import.meta.env.VITE_OPENSEARCH_PASSWORD;

interface UseSubnetsProps {
  selectedVpc: string;
}

export const useSubnets = ({ selectedVpc }: UseSubnetsProps) => {
  const [subnets, setSubnets] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const subnetSet = new Set() as Set<string>;

      const { data: srcSubnets } = await axios({
        url: 'https://search-yubeom-vpcflow-simple-demo-sa4wteiguk3bweusfr6g7u2wgu.ap-northeast-2.es.amazonaws.com/_plugins/_sql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        },
        data: {
          query: `SELECT srcaddr FROM vpcflow-simple-demo WHERE srcaddr LIKE '${selectedVpc}.%' AND dstaddr LIKE '${selectedVpc}.%'GROUP BY srcaddr`,
        },
      });

      for (const [ec2Cidr] of srcSubnets.datarows) {
        const [ec2FirstIp, ec2SecondIp, ec2ThirdIp] = ec2Cidr.split('.');

        subnetSet.add(`${ec2FirstIp}.${ec2SecondIp}.${ec2ThirdIp}`);
      }

      const { data: dstSubnets } = await axios({
        url: 'https://search-yubeom-vpcflow-simple-demo-sa4wteiguk3bweusfr6g7u2wgu.ap-northeast-2.es.amazonaws.com/_plugins/_sql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        },
        data: {
          query: `SELECT dstaddr FROM vpcflow-simple-demo WHERE srcaddr LIKE '${selectedVpc}.%' AND dstaddr LIKE '${selectedVpc}.%'GROUP BY dstaddr`,
        },
      });

      for (const [ec2Cidr] of dstSubnets.datarows) {
        const [ec2FirstIp, ec2SecondIp, ec2ThirdIp] = ec2Cidr.split('.');

        subnetSet.add(`${ec2FirstIp}.${ec2SecondIp}.${ec2ThirdIp}`);
      }

      const subnets = Array.from(subnetSet);

      setSubnets(subnets);
    };

    if (selectedVpc) {
      fetchData();
    }
  }, [selectedVpc]);

  return { subnets };
};
