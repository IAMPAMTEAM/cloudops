import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: string;
  img?: string;
  fx?: number;
  fy?: number;
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

interface ELB {
  elbName: string;
  elbId: string;
  flows: Flow[];
  subnets: ELBSubnet[];
}

interface InternetELB {
  vpcName: string;
  vpcCidr: string;
  elbs: ELB[];
}

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

  // az group생성 과정
  // 1. subnetAz로 group화
  useEffect(() => {
    const uniqueGroupedSubnets = new Map<string, { subnetAz: string; subnetsInfo: { subnetName: string; subnetCidr: string; elbId: string }[] }>();

    if (fetchData.length && fetchData[0]['elbs'].length) {
      fetchData[0]['elbs'].forEach((data: ELB) => {
        const groupedSubnets = data.subnets.reduce((acc: any[], subnet) => {
          const existingGroup = acc.find((group) => group.subnetAz === subnet.subnetAz);

          if (existingGroup) {
            const isDuplicate = existingGroup.subnetsInfo.some((info) => info.subnetName === subnet.subnetName && info.subnetCidr === subnet.subnetCidr);
            if (!isDuplicate) {
              existingGroup.subnetsInfo.push({
                subnetName: subnet.subnetName,
                subnetCidr: subnet.subnetCidr,
                elbId: data.elbId,
              });
            }
          } else {
            acc.push({
              subnetAz: subnet.subnetAz,
              subnetsInfo: [
                {
                  subnetName: subnet.subnetName,
                  subnetCidr: subnet.subnetCidr,
                  elbId: data.elbId,
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
    }
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
      const width = 1200;
      const height = 600;

      const boxPadding = 30;
      let nodeWidth = 40;
      let nodeHeight = 40;
      const groupSpacing = 200; // 그룹 간 간격

      const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');

      svg.selectAll('*').remove();

      const topNodes = data.nodes.filter((node) => node.group === 'top');
      const bottomNodes = data.nodes.filter((node) => node.group === 'bottom');

      const maxNodes = Math.max(topNodes.length, bottomNodes.length);

      if (maxNodes > 10) {
        nodeWidth = nodeHeight = 48 * (10 / maxNodes);
      }

      const nodeSpacing = 40;
      const topBoxWidth = topNodes.length * (nodeWidth + boxPadding + nodeSpacing) + boxPadding;
      const boxHeight = nodeHeight + 3 * boxPadding;

      const internetBox = svg.append('g').attr('class', 'internet-box-group');

      internetBox
        .append('image')
        .attr('class', 'node')
        .attr('xlink:href', 'https://icons.terrastruct.com/essentials%2F140-internet.svg')
        .attr('x', (width - topBoxWidth) / 2 + topBoxWidth / 2 - nodeWidth / 2)
        .attr('y', 0)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight);

      const internetNode = { id: '', group: 'top', fx: (width - topBoxWidth) / 2 + topBoxWidth / 2, fy: nodeHeight - 50 };

      // Top group box
      const topBox = svg.append('g').attr('class', 'top-box-group');

      topBox
        .append('rect')
        .attr('x', (width - topBoxWidth) / 2.1)
        .attr('y', 80)
        .attr('width', topBoxWidth)
        .attr('height', boxHeight)
        .style('fill', 'none')
        .style('stroke', 'none');

      topNodes.forEach((node, index) => {
        node.fx = (width - topBoxWidth) / 2 + boxPadding + index * (nodeWidth + boxPadding + nodeSpacing) + nodeWidth / 2;
        node.fy = 10 + boxHeight;

        data.links.push({ source: internetNode.id, target: node.id });
      });

      data.nodes.push(internetNode);

      const bottomBoxGroup = svg.append('g').attr('class', 'bottom-box-group');

      // Calculate the total width of all subnet groups
      const totalSubnetGroupsWidth =
        groupedSubnets.reduce((acc, group) => {
          const subnetGroupWidth = group.subnetsInfo.length * (nodeWidth + boxPadding + nodeSpacing) + boxPadding;
          return acc + subnetGroupWidth + groupSpacing;
        }, 0) - groupSpacing; // Subtract extra spacing added in the last iteration

      // Calculate the starting x position to center the bottomBoxGroup
      const bottomBoxGroupX = (width - totalSubnetGroupsWidth) / 2;

      // Bottom group boxes for each subnetAz
      groupedSubnets.forEach((group, groupIndex) => {
        const subnetGroupWidth = group.subnetsInfo.length * (nodeWidth + boxPadding + nodeSpacing) + boxPadding;
        const xPosition = bottomBoxGroupX + groupIndex * (subnetGroupWidth + groupSpacing + 70);

        const bottomBox = bottomBoxGroup.append('g').attr('class', 'bottom-box');

        bottomBox
          .append('rect')
          .attr('x', xPosition)
          .attr('y', height - boxHeight - 80)
          .attr('width', subnetGroupWidth)
          .attr('height', boxHeight)
          .style('fill', 'none')
          .style('stroke', '#6667AB')
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', 12);

        bottomBox
          .append('text')
          .attr('x', xPosition + 10)
          .attr('y', height - boxHeight * 1.5 - 20)
          .attr('fill', 'black')
          .text(group.subnetAz)
          .style('font-size', '1.1rem')
          .style('font-weight', 'bold');

        group.subnetsInfo.forEach((subnet, subnetIndex) => {
          const fx = xPosition + boxPadding + subnetIndex * (nodeWidth + boxPadding + nodeSpacing) + nodeWidth / 2;
          const fy = height - boxHeight - 100 + boxHeight / 2;

          const subnetGroup = bottomBox.append('g').attr('class', 'subnet-group');

          subnetGroup
            .append('rect')
            .attr('x', fx - nodeWidth / 1.5)
            .attr('y', fy - nodeHeight / 2)
            .attr('width', nodeWidth + 50)
            .attr('height', nodeHeight * 2)
            .attr('fill', 'none')
            .attr('stroke', '#6667AB')
            .attr('stroke-width', 1)
            .attr('rx', 10)
            .attr('ry', 10);

          const node = data.nodes.find((n) => n.id === subnet.subnetCidr);
          if (node) {
            node.fx = fx;
            node.fy = fy;
          }
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

      const link = svg.append('g').attr('class', 'links').selectAll('line').data(data.links).enter().append('line').attr('class', 'link animated-link').attr('stroke', '#000').attr('stroke-width', 2);

      const nodeGroup = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node-group')
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

      nodeGroup.append('rect').attr('class', 'node-background').attr('width', nodeWidth).attr('height', nodeHeight).attr('fill', 'none');

      nodeGroup
        .append('image')
        .attr('class', 'node')
        .attr('xlink:href', (d: any) => d.img)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight);
      // .on('click', handleNodeClick);

      nodeGroup
        .append('text')
        .attr('x', nodeWidth - 1)
        .attr('y', nodeHeight + 5)
        .attr('text-anchor', 'middle')
        .text((d: any) => (d.group === 'bottom' ? d.id : null))
        .style('font-size', '1rem')
        .style('font-weight', 'bold');

      nodeGroup
        .append('text')
        .attr('x', nodeWidth * 1.5 - 40)
        .attr('y', nodeHeight * 1.5)
        .attr('text-anchor', 'middle')
        .text((d: any) => (d.group === 'top' ? d.id : null))
        .style('font-size', '1rem')
        .style('font-weight', 'bold');

      function ticked() {
        link
          .attr('x1', (d: any) => d.source.fx)
          .attr('y1', (d: any) => d.source.fy + 45)
          .attr('x2', (d: any) => d.target.fx)
          .attr('y2', (d: any) => d.target.fy - 20);

        nodeGroup.attr('transform', (d: any) => `translate(${d.fx - nodeWidth / 2}, ${d.fy - nodeHeight / 2})`);
      }

      // function handleNodeClick(event: any, clickedNode: any) {
      //   const connectedNodes = new Set<string>();
      //   const connectedLinks = new Set<any>();

      //   data.links.forEach((link) => {
      //     if (link.source.id === clickedNode.id || link.target.id === clickedNode.id) {
      //       connectedNodes.add(link.source.id.toString());
      //       connectedNodes.add(link.target.id.toString());
      //       connectedLinks.add(link);
      //     }
      //   });

      //   connectedNodes.add(clickedNode.id);

      //   connectedLinks.forEach((link) => {
      //     connectedNodes.add(link.source.toString());
      //     connectedNodes.add(link.target.toString());
      //   });

      //   svg.selectAll('.node').classed('blur', (d: any) => !connectedNodes.has(d.id));
      //   svg.selectAll('.link').style('visibility', (d: any) => {
      //     return !(connectedNodes.has(d.source.id) && connectedNodes.has(d.target.id)) ? 'hidden' : 'visible';
      //   });
      // }

      // svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'none').attr('pointer-events', 'all').on('click', handleBackgroundClick);

      // function handleBackgroundClick() {
      //   svg.selectAll('.node').classed('blur', false);
      //   svg.selectAll('.link').style('visibility', 'visible');
      // }
    }
    // if (d3Container.current && data.nodes.length && data.links.length) {

    // }
  }, [groupedSubnets, data, d3Container]);

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
