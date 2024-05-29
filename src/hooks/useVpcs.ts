import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";

const username = "yubeom";
const password = "Kimsm1204!";

export const useVpcs = () => {
  const [vpcs, setVpcs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const vpcSet = new Set() as Set<string>;

      const { data: srcVpcs } = await axios({
        url: "https://search-yubeom-vpcflow-simple-demo-sa4wteiguk3bweusfr6g7u2wgu.ap-northeast-2.es.amazonaws.com/_plugins/_sql",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${username}:${password}`).toString("base64"),
        },
        data: {
          query: `SELECT srcaddr FROM vpcflow-simple-demo GROUP BY srcaddr`,
        },
      });

      for (const [srcaddr] of srcVpcs.datarows) {
        const [srcFirstIp, srcSecondIp] = srcaddr.split(".");

        vpcSet.add(`${srcFirstIp}.${srcSecondIp}`);
      }

      const { data: dstVpcs } = await axios({
        url: "https://search-yubeom-vpcflow-simple-demo-sa4wteiguk3bweusfr6g7u2wgu.ap-northeast-2.es.amazonaws.com/_plugins/_sql",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${username}:${password}`).toString("base64"),
        },
        data: {
          query: `SELECT dstaddr FROM vpcflow-simple-demo GROUP BY dstaddr`,
        },
      });

      for (const [dstaddr] of dstVpcs.datarows) {
        const [dstFirstIp, dstSecondIp] = dstaddr.split(".");

        vpcSet.add(`${dstFirstIp}.${dstSecondIp}`);
      }

      setVpcs(Array.from(vpcSet));
    };

    fetchData();
  }, []);

  return { vpcs };
};
