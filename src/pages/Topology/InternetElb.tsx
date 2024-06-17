import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: string;
  img?: string;
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
  elbId: string;
  flows: Flow[];
  subnets: ELBSubnet[];
}

/**
 * TODO: use icons
 * internet icon: https://icons.terrastruct.com/essentials%2F140-internet.svg
 * elb icon: https://icons.terrastruct.com/aws%2FNetworking%20&%20Content%20Delivery%2FElastic-Load-Balancing-ELB_Application-load-balancer_light-bg.svg
 */

const InternetElb = () => {
  const [fetchData, setFetchData] = useState<InternetELB[]>([]);
  const [data, setData] = useState<NetworkData>({ nodes: [], links: [] });
  const [internetElbCnt, setInternetElbCnt] = useState<number>(0);
  const [groupedSubnets, setGroupedSubnets] = useState<any[]>([]);

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

  // top group - internet icon
  // bottom - top group - elb list
  // top groupdml elb들은 각각 Internet Icon과 link돼있어야 함
  // bottom - bottom group - az에 따라 그룹화된 subnet list
  // subnets 정보에 따라 일치하는 topgroup의 elb와 연결되어야 함

  useEffect(() => {
    fetchData.forEach((data: InternetELB) => {
      const elbNode: Node = {
        id: data.elbName,
        group: 'top',
        img: 'https://icons.terrastruct.com/aws%2FNetworking%20&%20Content%20Delivery%2FElastic-Load-Balancing-ELB_Application-load-balancer_light-bg.svg',
      };
    });
  }, [fetchData]);

  // az group생성 과정
  // 1. subnetAz로 group화
  useEffect(() => {
    const uniqueGroupedSubnets = new Map<string, { subnetAz: string; subnetsInfo: { subnetName: string; subnetCidr: string; elbId: string }[] }>();

    fetchData.forEach((data: InternetELB) => {
      const groupedSubnets = data.subnets.reduce((acc: any[], subnet) => {
        const existingGroup = acc.find((group) => group.subnetAz === subnet.subnetAz);

        if (existingGroup) {
          const isDuplicate = existingGroup.subnetsInfo.some((info) => info.subnetName === subnet.subnetName && info.subnetCidr === subnet.subnetCidr);
          if (!isDuplicate) {
            existingGroup.subnetsInfo.push({
              subnetName: subnet.subnetName,
              subnetCidr: subnet.subnetCidr,
              elbId: data.elbId, // elbId 추가
            });
          }
        } else {
          acc.push({
            subnetAz: subnet.subnetAz,
            subnetsInfo: [
              {
                subnetName: subnet.subnetName,
                subnetCidr: subnet.subnetCidr,
                elbId: data.elbId, // elbId 추가
                elbName: data.elbName,
              },
            ],
          });
        }
        return acc;
      }, []);

      groupedSubnets.forEach((group) => {
        if (uniqueGroupedSubnets.has(group.subnetAz)) {
          const existingGroup = uniqueGroupedSubnets.get(group.subnetAz);
          if (existingGroup) {
            group.subnetsInfo.forEach((info: any) => {
              const isDuplicate = existingGroup.subnetsInfo.some((existingInfo) => existingInfo.subnetName === info.subnetName && existingInfo.subnetCidr === info.subnetCidr);
              if (!isDuplicate) {
                existingGroup.subnetsInfo.push(info);
              }
            });
          }
        } else {
          uniqueGroupedSubnets.set(group.subnetAz, group);
        }
      });
    });

    setGroupedSubnets(Array.from(uniqueGroupedSubnets.values()));
  }, [fetchData]);

  useEffect(() => {
    const addedNodes = new Set<string>();
    const addedLinks = new Set<string>();

    const newNodes: any[] = [];
    const newLinks: any[] = [];

    groupedSubnets.forEach((group) => {
      group.subnetsInfo.forEach((subnet: { elbId: string; subnetCidr: string; subnetName: string; elbName: string }) => {
        if (!addedNodes.has(subnet.elbName)) {
          newNodes.push({
            id: subnet.elbName,
            group: 'top',
            img: 'https://icons.terrastruct.com/aws%2FNetworking%20&%20Content%20Delivery%2FElastic-Load-Balancing-ELB_Application-load-balancer_light-bg.svg',
          });
          addedNodes.add(subnet.elbName);
        }

        if (!addedNodes.has(subnet.subnetCidr)) {
          newNodes.push({
            id: subnet.subnetCidr,
            group: 'bottom',
          });
          addedNodes.add(subnet.subnetCidr);
        }

        const linkId = `${subnet.elbName}-${subnet.subnetCidr}`;
        if (!addedLinks.has(linkId)) {
          newLinks.push({
            source: subnet.elbName,
            target: subnet.subnetCidr,
          });
          addedLinks.add(linkId);
        }
      });
    });

    setData({ nodes: newNodes, links: newLinks });
  }, [groupedSubnets]);

  useEffect(() => {
    if (d3Container.current && data.nodes.length && data.links.length) {
      const margin = { top: 30, right: 30, bottom: 20, left: 30 };
      const width = 1200;
      const height = 600;

      const boxPadding = 30;
      let nodeWidth = 48;
      let nodeHeight = 48;
      const groupSpacing = 200; // 그룹 간 간격

      const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');

      svg.selectAll('*').remove();

      const topNodes = data.nodes.filter((node) => node.group === 'top');
      const bottomNodes = data.nodes.filter((node) => node.group === 'bottom');

      const maxNodes = Math.max(topNodes.length, bottomNodes.length);

      if (maxNodes > 10) {
        nodeWidth = nodeHeight = 48 * (10 / maxNodes);
      }

      const topBoxWidth = topNodes.length * (nodeWidth + boxPadding) + boxPadding;
      const boxHeight = nodeHeight + 3 * boxPadding;

      // Top group box
      const topBox = svg.append('g').attr('class', 'top-box-group');

      topBox
        .append('rect')
        .attr('x', (width - topBoxWidth) / 2)
        .attr('y', 50)
        .attr('width', topBoxWidth)
        .attr('height', boxHeight)
        .style('fill', '#eee')
        .style('stroke', 'none');

      topBox
        .append('text')
        .attr('x', (width - topBoxWidth) / 2 + 10)
        .attr('y', 40)
        .attr('fill', 'black')
        .text('Top Group')
        .style('font-size', '1.4rem')
        .style('font-weight', 'bold');

      topNodes.forEach((node, index) => {
        const isEven = index % 2 === 0;
        node.fx = (width - topBoxWidth) / 2 + boxPadding + index * (nodeWidth + boxPadding) + nodeWidth / 2;
        node.fy = 50 + boxHeight / 2;
      });

      const bottomBoxGroup = svg.append('g').attr('class', 'bottom-box-group');

      // Bottom group boxes for each subnetAz
      groupedSubnets.forEach((group, groupIndex) => {
        const subnetGroupWidth = group.subnetsInfo.length * (nodeWidth + boxPadding) + boxPadding;
        const xPosition = margin.left + groupIndex * groupSpacing;

        const bottomBox = bottomBoxGroup.append('g').attr('class', 'bottom-box');

        bottomBox
          .append('rect')
          .attr('x', xPosition)
          .attr('y', height - boxHeight - 80)
          .attr('width', subnetGroupWidth)
          .attr('height', boxHeight)
          .style('fill', '#eee')
          .style('stroke', 'none');

        bottomBox
          .append('text')
          .attr('x', xPosition + 10)
          .attr('y', height - boxHeight / 2.5)
          .attr('fill', 'black')
          .text(group.subnetAz)
          .style('font-size', '12px')
          .style('font-weight', 'bold');

        group.subnetsInfo.forEach((subnet, subnetIndex) => {
          const fx = xPosition + boxPadding + subnetIndex * (nodeWidth + boxPadding) + nodeWidth / 2;
          const fy = height - boxHeight - 100 + boxHeight / 2;

          const node = data.nodes.find((n) => n.id === subnet.subnetCidr);
          if (node) {
            node.fx = fx;
            node.fy = fy;
          }

          const subnetGroup = bottomBox.append('g').attr('class', 'subnet-group');

          subnetGroup
            .append('rect')
            .attr('x', fx - nodeWidth / 2)
            .attr('y', fy - nodeHeight / 2)
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('fill', '#fff')
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .attr('rx', 10) // 둥근 모서리를 위해 추가된 속성
            .attr('ry', 10); // 둥근 모서리를 위해 추가된 속성

          subnetGroup
            .append('text')
            .attr('x', fx)
            .attr('y', fy)
            .attr('dy', '.35em') // 세로 중앙 정렬을 위한 속성
            .attr('text-anchor', 'middle')
            .style('font-size', '0.8rem')
            .text(subnet.subnetCidr);
        });
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

      const link = svg.append('g').attr('class', 'links').selectAll('line').data(data.links).enter().append('line').attr('class', 'link animated-link').attr('stroke', '#999').attr('stroke-width', 1);

      const nodeGroup = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node-group')
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

      nodeGroup.append('rect').attr('class', 'node-background').attr('width', nodeWidth).attr('height', nodeHeight).attr('fill', '#eee');

      nodeGroup
        .append('image')
        .attr('class', 'node')
        .attr('xlink:href', (d: any) => d.img)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight);

      nodeGroup
        .append('text')
        .attr('x', nodeWidth / 2)
        .attr('y', nodeHeight + 5)
        .attr('text-anchor', 'middle')
        .text((d: any) => d.id);

      function ticked() {
        link
          .attr('x1', (d: any) => d.source.fx)
          .attr('y1', (d: any) => d.source.fy)
          .attr('x2', (d: any) => d.target.fx)
          .attr('y2', (d: any) => d.target.fy);

        nodeGroup.attr('transform', (d: any) => `translate(${d.fx - nodeWidth / 2}, ${d.fy - nodeHeight / 2})`);
      }

      svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'none').attr('pointer-events', 'all').on('click', handleBackgroundClick);

      function handleBackgroundClick() {
        svg.selectAll('.node').classed('blur', false);
        svg.selectAll('.link').style('visibility', 'visible');
      }
    }
  }, [groupedSubnets, data, d3Container]);

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
      <div className='panel' style={{ overflowX: 'auto', width: '100%', height: '100%' }}>
        <p className='text-[16px] font-semibold text-[#6667AB]'>Internet ELB</p>
        <svg ref={d3Container}></svg>
      </div>
    </div>
  );
};

export default InternetElb;
