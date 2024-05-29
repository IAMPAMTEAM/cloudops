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

const SubnetTopology: React.FC = ({ onVpcChange, onFromSubnetChange, onToSubnetChange }) => {
  const [data, setData] = useState<NetworkData>({ nodes: [], links: [] });
  const [fetchData, setFetchData] = useState<Subnet[]>([]);
  const [subnetCnt, setSubnetCnt] = useState(0);

  const [vpcFilteredList, setVpcFilteredList] = useState([]);
  const [fromSubnetFilteredList, setFromSubnetFilteredList] = useState([]);
  const [toSubnetFilteredList, setToSubnetFilteredList] = useState([]);
  const [vpcList, setVpcList] = useState<[]>([]);
  const [fromSubnetList, setFromSubnetList] = useState<[]>([]);
  const [toSubnetList, setToSubnetList] = useState<[]>([]);

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
        if (data.length && subnetCnt < 1) {
          setFetchData(data);
          setSubnetCnt((prev) => prev + 1);
        }
      })
      .catch((err) => console.error(err));
  }, [subnetCnt]);

  useEffect(() => {
    const vpcFilter = async () => {
      const groupedData = fetchData.reduce((acc, item) => {
        const { fromSubnet } = item;
        const vpc = fromSubnet.slice(0, fromSubnet.lastIndexOf('.') - 1) + '0.0';
        if (!acc[vpc]) {
          acc[vpc] = {
            vpc,
            subnetInfo: [],
          };
        }
        acc[vpc].subnetInfo.push(item);
        return acc;
      }, {});

      setVpcFilteredList(Object.values(groupedData));
    };

    vpcFilter();
  }, [fetchData]);

  useEffect(() => {
    const uniqueVpcSet = new Set<string>();
    const uniqueVpcList: string[] = [];

    vpcFilteredList.forEach((vpcItem: { vpc: string }) => {
      if (!uniqueVpcSet.has(vpcItem.vpc)) {
        uniqueVpcSet.add(vpcItem.vpc);
        uniqueVpcList.push(vpcItem.vpc);
      }
    });
    // @ts-ignore
    setVpcList(uniqueVpcList);
  }, [vpcFilteredList]);

  useEffect(() => {
    const subnetFilter = async () => {
      vpcFilteredList.forEach((vpcItem: { vpc: string; subnetInfo: [] }) => {
        if (vpcItem.vpc === selectedVpc) {
          const data = vpcItem.subnetInfo;
          const groupedData = data.reduce((acc, item) => {
            const { fromSubnet } = item;
            // @ts-ignore
            if (selectedVpc.slice(0, selectedVpc.lastIndexOf('.') - 1) === fromSubnet.slice(0, fromSubnet.lastIndexOf('.') - 1)) {
              if (!acc[fromSubnet]) {
                // @ts-ignore
                acc[fromSubnet] = {
                  fromSubnet,
                  subnetInfo: [],
                };
              }
              // @ts-ignore
              acc[fromSubnet].subnetInfo.push(item);
            }
            return acc;
          }, {});
          setFromSubnetFilteredList(Object.values(groupedData));
        }
      });
    };

    subnetFilter();
  }, [selectedVpc, vpcFilteredList]);

  useEffect(() => {
    const subnetFilter = async () => {
      fromSubnetFilteredList.forEach((subnetItem: { fromSubnet: string; subnetInfo: [] }) => {
        if (subnetItem.fromSubnet === selectedFromSubnet) {
          const data = subnetItem.subnetInfo;
          const groupedData = data.reduce((acc, item) => {
            const { toSubnet } = item;

            if (selectedFromSubnet.slice(0, selectedFromSubnet.lastIndexOf('.') - 1) === toSubnet.slice(0, toSubnet.lastIndexOf('.') - 1) && selectedFromSubnet !== toSubnet) {
              if (!acc[toSubnet]) {
                acc[toSubnet] = {
                  fromSubnet: selectedFromSubnet,
                  toSubnet,
                  subnetInfo: [],
                };
              }
              acc[toSubnet].subnetInfo.push(item);
            }
            return acc;
          }, {});
          setToSubnetFilteredList(Object.values(groupedData));
        }
      });
    };

    subnetFilter();
  }, [selectedFromSubnet, fromSubnetFilteredList]);

  useEffect(() => {
    const uniqueFromSubnetSet = new Set<string>();
    const uniqueFromSubnetList: string[] = [];

    fromSubnetFilteredList.forEach((subnetItem: { fromSubnet: string }) => {
      if (!uniqueFromSubnetSet.has(subnetItem.fromSubnet)) {
        uniqueFromSubnetSet.add(subnetItem.fromSubnet);
        uniqueFromSubnetList.push(subnetItem.fromSubnet);
      }
    });

    setFromSubnetList(uniqueFromSubnetList);
  }, [fromSubnetFilteredList]);

  useEffect(() => {
    const uniqueToSubnetSet = new Set<string>();
    const uniqueToSubnetList: string[] = [];

    toSubnetFilteredList.forEach((subnetItem: { toSubnet: string }) => {
      if (!uniqueToSubnetSet.has(subnetItem.toSubnet)) {
        uniqueToSubnetSet.add(subnetItem.toSubnet);
        uniqueToSubnetList.push(subnetItem.toSubnet);
      }
    });

    setToSubnetList(uniqueToSubnetList);
  }, [toSubnetFilteredList]);

  const handleSelectVpc = (event) => {
    setSelectedVpc(event.target.value);
    setIsSelectedVpc(true);
    onVpcChange(event.target.value);
  };

  const handleSelectedFromSubnet = (event) => {
    setSelectedFromSubnet(event.target.value);
    setIsSelectedFromSubnet(true);
    onFromSubnetChange(event.target.value);
  };

  const handleSelectedToSubnet = (event) => {
    setSelectedToSubnet(event.target.value);
    onToSubnetChange(event.target.value);
  };

  useEffect(() => {
    const filteredData = toSubnetFilteredList.find((subnetItem: { toSubnet: string; subnetInfo: [] }) => {
      return subnetItem.toSubnet === selectedToSubnet;
    });

    if (filteredData) {
      const { subnetInfo }: { vpc: string; subnetInfo: any[] } = filteredData;
      subnetInfo.forEach((data) => {
        const fromEc2 = data.fromEc2;
        const toEc2 = data.toEc2;

        setData((prev) => {
          const nodes = [...prev.nodes];
          const links = [...prev.links];

          if (!nodes.find((node) => node.id === fromEc2)) {
            nodes.push({ id: fromEc2, group: 'top', img: 'https://icons.terrastruct.com/aws%2FCompute%2F_Instance%2FAmazon-EC2_Instance_light-bg.svg' });
          }

          if (!nodes.find((node) => node.id === toEc2)) {
            nodes.push({ id: toEc2, group: 'bottom', img: 'https://icons.terrastruct.com/aws%2FCompute%2F_Instance%2FAmazon-EC2_Instance_light-bg.svg' });
          }

          links.push({ source: fromEc2, target: toEc2 });

          return { nodes, links };
        });
      });
    }
  }, [selectedToSubnet, toSubnetFilteredList]);

  useEffect(() => {
    if (d3Container.current && data.nodes.length && data.links.length && selectedToSubnet) {
      const margin = { top: 30, right: 30, bottom: 20, left: 30 };
      const width = data.nodes.length * 75 + margin.left + margin.right;
      const height = 1000;

      const boxPadding = 30;
      let nodeWidth = 48;
      let nodeHeight = 48;

      const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');

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
      <div className='flex gap-8 justify-center'>
        {/* Choose VPC */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>VPC</p>
          <select className='select select-accent max-w-xs' onChange={handleSelectVpc} value={selectedVpc}>
            <option selected>Choose VPC</option>
            {vpcList.map((vpc, idx) => {
              return (
                <option key={idx} value={vpc}>
                  {vpc}
                </option>
              );
            })}
          </select>
        </div>
        {/* Choose fromSubnet */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>Source Subnet</p>
          <select className='select select-success max-w-xs' onChange={handleSelectedFromSubnet} value={selectedFromSubnet} disabled={!isSelectedVpc}>
            <option selected>Choose fromSubnet</option>
            {fromSubnetList.map((subnet, idx) => {
              return (
                <option key={idx} value={subnet}>
                  {subnet}
                </option>
              );
            })}
          </select>
        </div>
        {/* Choose toSubnet */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>Target Subnet</p>
          <select className='select select-warning max-w-xs' onChange={handleSelectedToSubnet} value={selectedToSubnet} disabled={!isSelectedFromSubnet}>
            <option selected>Choose toSubnet</option>
            {toSubnetList.map((subnet, idx) => {
              return (
                <option key={idx} value={subnet}>
                  {subnet}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div style={{ overflowX: 'auto', width: '100%', height: '100%' }}>
        <svg ref={d3Container}></svg>
      </div>
    </>
  );
};

export default SubnetTopology;
