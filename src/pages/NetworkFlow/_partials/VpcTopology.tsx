import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './NetworkTopology.css';

interface Node {
  id: string;
  group: string; // "top" or "bottom"
  img: string; // Image path
}

interface Link {
  source: string | number | any;
  target: string | number | any;
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

interface Subnet {
  fromSubnet: string;
  fromEc2: string;
  toSubnet: string;
  toEc2: string;
  packets: number;
  bytes: number;
}

const VPCTopology: React.FC = () => {
  const [data, setData] = useState<NetworkData>({ nodes: [], links: [] });
  const [fetchData, setFetchData] = useState<Subnet[]>([]);
  const [vpcCnt, setVPCCnt] = useState(0);

  const [selectedFromVPC, setSelectedFromVPC] = useState('');
  const [selectedToVPC, setSelectedToVPC] = useState('');

  const [vpcFilteredList, setVpcFilteredList] = useState([]);
  const [fromSubnetFilteredList, setFromSubnetFilteredList] = useState([]);
  const [toSubnetFilteredList, setToSubnetFilteredList] = useState([]);

  const [isSelectedVpc, setIsSelectedVpc] = useState(false);
  const [isSelectedFromSubnet, setIsSelectedFromSubnet] = useState(false);

  const [selectedVpc, setSelectedVpc] = useState('');
  const [selectedFromSubnet, setSelectedFromSubnet] = useState('');
  const [selectedToSubnet, setSelectedToSubnet] = useState('');

  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/flow/ec2ToEc2BeforeUpdate.json')
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.length && vpcCnt < 1) {
          setFetchData(data);
          setVPCCnt((prev) => prev + 1);
        }
      })
      .catch((err) => console.error(err));
  }, [vpcCnt]);

  // TODO: Logic
  /**
   * 1. fromVPC 목록들 가져와서 x.x.0.0으로 fromVPC 기준 목록 만들기
   * 2. 위에서 filter한 데이터를 기반으로 같은방식의 toVPC 목록 만들기
   * 3. 여기서부터는 subnet에서 했던 방식대로 subnet 목록 만들기
   */

  // filtering from fetch Data
  const [fromVpcFilteredList, setFromVpcFilteredList] = useState([]);
  const [toVpcFilteredList, setToVpcFilteredList] = useState([]);

  // Select - option list
  const [fromVpcList, setFromVpcList] = useState([]);
  const [toVpcList, setToVpcList] = useState([]);

  const [isSelectedFromVpc, setIsSelectedFromVpc] = useState(false);

  const [selectedFromVpc, setSelectedFromVpc] = useState('');
  const [selectedToVpc, setSelectedToVpc] = useState('');

  const demoData = [
    {
      fromVPC: '10.1.0.0',
      fromSubnet: '10.1.1.2',
      toVPC: '10.2.0.0',
      toSubnet: '10.2.2.0',
      packets: 1000,
      bytes: 1000,
    },
  ];

  useEffect(() => {
    const fromVpcFilter = async () => {
      const groupedData = demoData.reduce((acc, item) => {
        const { fromVPC } = item;
        if (!acc[fromVPC]) {
          acc[fromVPC] = {
            ...item,
          };
        }
        acc[fromVPC] = { ...item };
        return acc;
      }, {});

      // setFromVpcFilteredList(Object.values(groupedData));
    };

    fromVpcFilter();
  }, [demoData, fromVpcFilteredList]);

  useEffect(() => {
    const toVpcFilter = async () => {
      const groupedData = fromVpcFilteredList.reduce((acc, item) => {
        // TODO: 여기서 무한루프가 도는 이유를 찾아야함
        return acc;
      }, {});
    };
  });

  // console.log(fromVpcFilteredList);

  useEffect(() => {
    if (d3Container.current && data.nodes.length && data.links.length && selectedToSubnet) {
      const margin = { top: 30, right: 30, bottom: 20, left: 30 };
      const width = data.nodes.length * 75 + margin.left + margin.right;
      const height = 900;

      const boxPadding = 30;
      let nodeWidth = 48;
      let nodeHeight = 48;

      const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '80%');

      svg.selectAll('*').remove();

      // 화살표
      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 27)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 7)
        .attr('markerHeight', 7)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#000')
        .style('stroke', 'none');

      // 배경 클릭 시 이벤트
      svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'none').attr('pointer-events', 'all').on('click', handleBackgroundClick);

      const topNodes = data.nodes.filter((node) => node.group === 'top');
      const bottomNodes = data.nodes.filter((node) => node.group === 'bottom');

      const maxNodes = Math.max(topNodes.length, bottomNodes.length);

      if (maxNodes > 10) {
        nodeWidth = nodeHeight = 48 * (10 / maxNodes);
      }

      const topBoxWidth = topNodes.length * (nodeWidth + boxPadding) + boxPadding;
      const bottomBoxWidth = bottomNodes.length * (nodeWidth + boxPadding) + boxPadding;
      const boxHeight = nodeHeight + 2 * boxPadding;

      svg
        .append('rect')
        .attr('x', (width - topBoxWidth) / 2)
        .attr('y', 100)
        .attr('width', topBoxWidth)
        .attr('height', boxHeight)
        .attr('class', 'top-box');

      svg
        .append('text')
        .attr('x', (width - topBoxWidth) / 2 + 10)
        .attr('y', 90)
        .attr('fill', 'black')
        .text(selectedFromSubnet)
        .style('font-size', '1.4rem')
        .style('font-weight', 'bold');

      svg
        .selectAll('.top-box')
        .append('text')
        .attr('dy', nodeHeight / 2 + 5)
        .attr('dx', nodeWidth / 2)
        .attr('text-anchor', 'middle')
        .text(selectedFromSubnet);

      svg
        .append('rect')
        .attr('x', (width - bottomBoxWidth) / 2)
        .attr('y', height - boxHeight - 100)
        .attr('width', bottomBoxWidth)
        .attr('height', boxHeight)
        .attr('class', 'bottom-box');

      svg
        .append('text')
        .attr('x', (width - bottomBoxWidth) / 2 + 10)
        .attr('y', height - boxHeight + 30)
        .attr('fill', 'black')
        .text(selectedToSubnet)
        .style('font-size', '1.4rem')
        .style('font-weight', 'bold');

      topNodes.forEach((node, index) => {
        const isEven = index % 2 === 0;
        (node as any).fx = (width - topBoxWidth) / 2 + boxPadding + index * (nodeWidth + boxPadding) + nodeWidth / 2;
        (node as any).fy = 100 + boxHeight / 2 + (isEven ? -10 : 10); // 지그재그 패턴
      });

      bottomNodes.forEach((node, index) => {
        const isEven = index % 2 === 0;
        (node as any).fx = (width - bottomBoxWidth) / 2 + boxPadding + index * (nodeWidth + boxPadding) + nodeWidth / 2;
        (node as any).fy = height - boxHeight - 100 + boxHeight / 2 + (isEven ? -10 : 10); // 지그재그 패턴
      });

      d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
        .force(
          'link',
          d3
            .forceLink(data.links)
            .id((d: any) => d.id)
            .distance(200)
        )
        .force('charge', d3.forceManyBody().strength(-300))
        .on('tick', ticked);

      const link = svg
        .append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .attr('class', 'link animated-link')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

      const node = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('image')
        .data(data.nodes)
        .enter()
        .append('image')
        .attr('class', 'node')
        .attr('xlink:href', (d) => d.img)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight)
        .on('click', handleNodeClick);

      const label = svg
        .append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(data.nodes)
        .enter()
        .append('text')
        .attr('dy', nodeHeight / 1.5)
        .attr('dx', nodeWidth / 8)
        .attr('text-anchor', 'middle')
        .style('font-size', '1rem')
        .style('font-weight', 'bold')
        .text((d) => d.id);

      function handleNodeClick(event: any, clickedNode: any) {
        const connectedNodes = new Set<string>();
        const connectedLinks = new Set<any>();

        data.links.forEach((link) => {
          if (link.source.id === clickedNode.id || link.target.id === clickedNode.id) {
            connectedNodes.add(link.source.id.toString());
            connectedNodes.add(link.target.id.toString());
            connectedLinks.add(link);
          }
        });

        connectedNodes.add(clickedNode.id);

        connectedLinks.forEach((link) => {
          connectedNodes.add(link.source.toString());
          connectedNodes.add(link.target.toString());
        });

        svg.selectAll('.node').classed('blur', (d: any) => {
          return !connectedNodes.has(d.id);
        });
        svg.selectAll('.link').style('visibility', (d: any) => {
          return !(connectedNodes.has(d.source.id) && connectedNodes.has(d.target.id)) ? 'hidden' : 'visible';
        });
      }

      function handleBackgroundClick() {
        svg.selectAll('.node').classed('blur', false);
        svg.selectAll('.link').style('visibility', 'visible');
      }

      function ticked() {
        link
          .attr('x1', (d) => (d.source as any).fx as number)
          .attr('y1', (d) => (d.source as any).fy as number)
          .attr('x2', (d) => (d.target as any).fx as number)
          .attr('y2', (d) => (d.target as any).fy as number);

        node.attr('x', (d) => ((d as any).fx as number) - nodeWidth / 2).attr('y', (d) => ((d as any).fy as number) - nodeHeight / 2);

        label.attr('x', (d) => (d as any).fx as number).attr('y', (d) => (d as any).fy as number);
      }
      return () => {
        setData({ nodes: [], links: [] });
      };
    }
  }, [data, selectedToSubnet, toSubnetFilteredList]);

  return (
    <>
      <div className='grid gap-2 justify-center lg:grid-cols-2'>
        {/* Choose fromVPC */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>Source VPC</p>
          <select className='select select-success max-w-xs' value={selectedFromVPC}>
            <option selected>Choose fromVPC</option>
            {/* {fromSubnetList.map((subnet, idx) => {
              return (
                <option key={idx} value={subnet}>
                  {subnet}
                </option>
              );
            })} */}
          </select>
        </div>
        {/* Choose toVPC */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>Target VPC</p>
          <select className='select select-warning max-w-xs' value={selectedToVPC}>
            <option selected>Choose toVPC</option>
            {/* {toSubnetList.map((subnet, idx) => {
              return (
                <option key={idx} value={subnet}>
                  {subnet}
                </option>
              );
            })} */}
          </select>
        </div>
      </div>
      <div style={{ overflowX: 'auto', width: '100%', height: '100%' }}>
        <svg ref={d3Container}></svg>
      </div>
    </>
  );
};

export default VPCTopology;
