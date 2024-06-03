import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './NetworkTopology.css';

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

interface Subnet {
  fromVpc: string;
  fromSubnet: string;
  toVpc: string;
  toSubnet: string;
  packetsSum: number;
  bytesSum: number;
}

const VPCTopology: React.FC = ({ onFromVpcChange, onToVpcChange, filteredData }) => {
  const [data, setData] = useState<NetworkData>({ nodes: [], links: [] });
  const [fetchData, setFetchData] = useState<Subnet[]>([]);
  const [vpcCnt, setVPCCnt] = useState(0);

  // filtering from fetch Data
  const [fromVpcFilteredList, setFromVpcFilteredList] = useState([]);
  const [toVpcFilteredList, setToVpcFilteredList] = useState([]);
  const [finalData, setFinalData] = useState([]);

  // Select - option list
  const [fromVpcList, setFromVpcList] = useState([]);
  const [toVpcList, setToVpcList] = useState([]);

  const [isSelectedFromVpc, setIsSelectedFromVpc] = useState(false);

  const [selectedFromVpc, setSelectedFromVpc] = useState('');
  const [selectedToVpc, setSelectedToVpc] = useState('');

  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/flow/subnetToSubnet.json')
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

  useEffect(() => {
    const fromVpcFilter = async () => {
      const groupedData = fetchData.reduce((acc, item) => {
        const { fromVpc } = item;

        if (!acc[fromVpc]) {
          acc[fromVpc] = {
            fromVpc,
            vpcInfo: [],
          };
        }
        acc[fromVpc].vpcInfo.push(item);
        return acc;
      }, {});

      setFromVpcFilteredList(Object.values(groupedData));
    };

    fromVpcFilter();
  }, [fetchData]);

  useEffect(() => {
    const uniqueFromVpcSet = new Set<string>();
    const uniqueFromVpcList: string[] = [];

    fromVpcFilteredList.forEach((vpcItem: { fromVpc: string; vpcInfo: [] }) => {
      uniqueFromVpcSet.add(vpcItem.fromVpc);
      uniqueFromVpcList.push(vpcItem.fromVpc);
    });

    // @ts-ignore
    setFromVpcList(uniqueFromVpcList);
  }, [fromVpcFilteredList]);

  useEffect(() => {
    const toVpcFilter = async () => {
      fromVpcFilteredList.forEach(
        (vpcItem: {
          fromVpc: string;
          vpcInfo: [
            {
              fromVpc: string;
              fromSubnet: string;
              toVpc: string;
              toSubnet: string;
              packetsSum: number;
              bytesSum: number;
            }
          ];
        }) => {
          if (vpcItem.fromVpc === selectedFromVpc) {
            const data = vpcItem.vpcInfo;
            const groupedData = data.reduce((acc, item) => {
              const { toVpc } = item;

              if (selectedFromVpc !== toVpc) {
                if (!acc[toVpc]) {
                  acc[toVpc] = {
                    fromVpc: selectedFromVpc,
                    toVpc,
                    vpcInfo: [],
                  };
                }
                acc[toVpc].vpcInfo.push(item);
              }

              return acc;
            }, {});

            setToVpcFilteredList(Object.values(groupedData));
          }
        }
      );
    };

    toVpcFilter();
  }, [selectedFromVpc, fromVpcFilteredList]);

  useEffect(() => {
    const uniqueToVpcSet = new Set<string>();
    const uniqueToVpcList: string[] = [];

    toVpcFilteredList.forEach((vpcItem: { toVpc: string; vpcInfo: [] }) => {
      if (!uniqueToVpcSet.has(vpcItem.toVpc)) {
        uniqueToVpcSet.add(vpcItem.toVpc);
        uniqueToVpcList.push(vpcItem.toVpc);
      }
    });

    // @ts-ignore
    setToVpcList(uniqueToVpcList);
  }, [toVpcFilteredList]);

  useEffect(() => {
    const filteredToVpc: { fromVpc: string; toVpc: string; vpcInfo: [] }[] = toVpcFilteredList.filter((vpcItem: { fromVpc: string; toVpc: string; vpcInfo: [] }) => {
      return vpcItem.toVpc === selectedToVpc;
    });

    // TODO: Error Point (Solved But recheck needed)
    if (filteredToVpc.length && filteredToVpc[0].vpcInfo.length) {
      filteredData(filteredToVpc[0].vpcInfo);
    }
  }, [toVpcFilteredList, selectedToVpc]);

  useEffect(() => {
    const filteredData = toVpcFilteredList.find((vpcItem: { fromVpc: string; toVpc: string; vpcInfo: [] }) => {
      return vpcItem.toVpc === selectedToVpc;
    });

    if (filteredData) {
      const { vpcInfo }: { fromVpc: string; toVpc: string; vpcInfo: [] } = filteredData;

      vpcInfo.forEach((data: { fromSubnet: string; toSubnet: string }) => {
        const { fromSubnet, toSubnet } = data;

        setData((prev) => {
          const nodes = [...prev.nodes];
          const links = [...prev.links];

          if (!nodes.find((node) => node.id === fromSubnet)) {
            nodes.push({ id: fromSubnet, group: 'top', img: 'https://icons.terrastruct.com/aws%2F_Group%20Icons%2FVPC-subnet-private_light-bg.svg' });
          }

          if (!nodes.find((node) => node.id === toSubnet)) {
            nodes.push({ id: toSubnet, group: 'bottom', img: 'https://icons.terrastruct.com/aws%2F_Group%20Icons%2FVPC-subnet-private_light-bg.svg' });
          }

          links.push({ source: fromSubnet, target: toSubnet });

          return { nodes, links };
        });
      });
    }
  }, [selectedToVpc, toVpcFilteredList]);

  const handleSelectedFromVpc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromVpc(e.target.value);
    setIsSelectedFromVpc(true);
    onFromVpcChange(e.target.value);
  };

  const handleSelectedToVpc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToVpc(e.target.value);
    onToVpcChange(e.target.value);
    filteredData(finalData);
  };

  useEffect(() => {
    if (d3Container.current && data.nodes.length && data.links.length) {
      const margin = { top: 30, right: 30, bottom: 20, left: 30 };
      const width = data.nodes.length * 45 + margin.left + margin.right;
      const height = 350;

      const boxPadding = 15;
      let nodeWidth = 20;
      let nodeHeight = 20;

      const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '60%');

      svg.selectAll('*').remove();

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
      const boxHeight = nodeHeight + 3 * boxPadding;

      svg
        .append('rect')
        .attr('x', (width - topBoxWidth) / 2)
        // .attr('y', boxHeight - boxHeight / 2)
        .attr('y', (boxHeight * 1) / 2 + boxHeight)
        .attr('width', topBoxWidth)
        .attr('height', boxHeight)
        .attr('class', 'top-box')
        .style('fill', '#eee')
        .style('stroke', 'none');

      svg
        .append('text')
        .attr('x', (width - topBoxWidth) / 2 + 10)
        .attr('y', 90)
        .attr('fill', 'black')
        .text(selectedFromVpc)
        .style('font-size', '0.8rem')
        .style('font-weight', 'bold');

      svg
        .append('rect')
        .attr('x', (width - bottomBoxWidth) / 2)
        .attr('y', height - boxHeight - 100)
        .attr('width', bottomBoxWidth)
        .attr('height', boxHeight)
        .attr('class', 'bottom-box')
        .style('fill', '#eee')
        .style('stroke', 'none');

      svg
        .append('text')
        .attr('x', (width - bottomBoxWidth) / 2 + 12)
        .attr('y', height - boxHeight - 20)
        .attr('fill', 'black')
        .text(selectedToVpc)
        .style('font-size', '0.8rem')
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
            .distance(100)
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
        .attr('stroke', '#333')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

      const nodeGroup = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node-group')
        .attr('transform', (d: any) => `translate(${d.x - nodeWidth / 2}, ${d.y - nodeHeight / 2})`); // 각 노드의 위치를 데이터에 따라 설정

      // 배경 사각형을 추가합니다.
      nodeGroup.append('rect').attr('class', 'node-background').attr('width', nodeWidth).attr('height', nodeHeight).attr('fill', '#eee');

      // 이미지를 추가합니다.
      nodeGroup
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
        .attr('dy', nodeHeight)
        .attr('dx', nodeWidth / 8)
        .attr('text-anchor', 'middle')
        .style('font-size', '0.5rem')
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

        nodeGroup.attr('x', (d) => ((d as any).fx as number) - nodeWidth / 2).attr('y', (d) => ((d as any).fy as number) - nodeHeight / 2);

        label
          .attr('x', (d) => ((d as any).fx as number) - 5)
          .attr('y', (d) => {
            return d.group === 'top' ? ((d as any).fy as number) - nodeHeight * 1.6 : ((d as any).fy as number);
          });
      }
      return () => {
        setData({ nodes: [], links: [] });
      };
    }
  }, [data, selectedToVpc, toVpcFilteredList]);

  return (
    <>
      <div className='grid gap-2 justify-center lg:grid-cols-2'>
        {/* Choose fromVPC */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>Source VPC</p>
          <select className='select select-success max-w-xs' onChange={handleSelectedFromVpc} value={selectedFromVpc}>
            <option selected>Choose fromVPC</option>
            {fromVpcList.map((subnet, idx) => {
              return (
                <option key={idx} value={subnet}>
                  {subnet}
                </option>
              );
            })}
          </select>
        </div>
        {/* Choose toVPC */}
        <div className='flex flex-col'>
          <p className='text-[0.8rem] font-semibold mb-[0.5rem]'>Target VPC</p>
          <select className='select select-warning max-w-xs' onChange={handleSelectedToVpc} value={selectedToVpc} disabled={!isSelectedFromVpc}>
            <option selected>Choose toVPC</option>
            {toVpcList.map((subnet, idx) => {
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
        {!(selectedFromVpc && selectedToVpc) ? <p className='mt-8 text-lg text-center'>Please select fromVPC and toVPC</p> : null}
        <svg ref={d3Container}></svg>
      </div>
    </>
  );
};

export default VPCTopology;
