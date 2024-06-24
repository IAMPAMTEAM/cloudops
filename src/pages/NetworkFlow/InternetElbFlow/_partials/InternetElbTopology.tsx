import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: string;
  img: string;
}

interface Link {
  source: string | number | any;
  target: string | number | any;
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

interface Flow {
  geoName: string;
  flag: string;
  flowWeight: number;
  flowStatus: string;
}

interface ELBSubnet {
  subnetAz: string;
  subnetCidr: string;
  subnetName: string;
}

interface InternetELB {
  elbName: string;
  flows: Flow[];
  subnets: ELBSubnet[];
}

const InterenetElbTopology = () => {
  const [fetchData, setFetchData] = useState<InternetELB[]>([]);
  const [data, setData] = useState<NetworkData>({ nodes: [], links: [] });
  const [internetElbCnt, setInternetElbCnt] = useState<number>(0);
  const [nationList, setNationList] = useState<any[]>([]);

  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/flow/internetToElb.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.length && internetElbCnt < 1) {
          setFetchData(data);
          setInternetElbCnt((prev) => prev + 1);
        }
      })
      .catch((err) => console.error(err));
  }, [internetElbCnt]);

  // top group & bottom group
  // top group - 나라별 국기 그룹

  // 1-1. nationList에 국가 리스트 저장 (set) [top group]
  useEffect(() => {
    const uniqueNationSet = new Set<string>();

    fetchData.forEach((data: InternetELB) => {
      data.flows.forEach((flow: Flow) => {
        uniqueNationSet.add(JSON.stringify({ geoName: flow.geoName, flag: flow.flag }));
      });
    });

    const uniqueNationList = Array.from(uniqueNationSet).map((item) => JSON.parse(item));

    setNationList(uniqueNationList);
  }, [fetchData]);

  //

  // setData (d3에 연결되는 직접적인 데이터 구성)
  // 1-2. nationList에 있는 국가들에 해당하는 국기들을 top group으로 표현.
  useEffect(() => {}, [nationList]);

  // bottom group - elb 그룹
  // +) bottom group 내부에서도 top group과 bottom group으로 나누어서 표현
  // bottom - top group: elb 이름
  // bottom - bottom group: az에 따른 subnet 정보

  // link (flows 정보)
  // 1. top group & bottom - top group (flows.map(a => a.geoName) - elbName)
  // 2. bottom - top gruop & bottom - bottom group (flows.map(a => a.flowStatus) - az)

  // TODO: Data 가공

  // TODO: d3 topology 구현
  // useEffect(() => {
  //   const margin = { top: 30, right: 30, bottom: 20, left: 30 };
  //   const width = data.nodes.length * 75 + margin.left + margin.right;
  //   const height = 1000;

  //   const boxPadding = 30;
  //   let nodeWidth = 48;
  //   let nodeHeight = 48;

  //   const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', '60%');

  //   svg.selectAll('*').remove()

  //   // top group

  // })

  return (
    <div>
      <h1>InternetElbTopology</h1>
    </div>
  );
};

export default InterenetElbTopology;
