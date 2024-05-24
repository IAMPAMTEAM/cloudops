import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './NetworkTopology.css';

interface Node {
  id: string;
  group: string; // "top" or "bottom"
  img: string; // Image path
}

interface Link {
  source: string | number;
  target: string | number;
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

const SubnetTopology: React.FC = () => {
  const [data, setData] = useState<NetworkData>({ nodes: [], links: [] });
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    setData(
      JSON.parse(`{
        "nodes": [
            {"id": "A", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "B", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "C", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "D", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "E", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "F", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "G", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "H", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "I", "group": "top", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "J", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "K", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "L", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "M", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "N", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "O", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "P", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "Q", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "R", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "S", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
            {"id": "T", "group": "bottom", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"}
        ],
        "links": [
            {"source": "A", "target": "J"},
            {"source": "B", "target": "K"},
            {"source": "C", "target": "L"},
            {"source": "D", "target": "M"},
            {"source": "E", "target": "N"},
            {"source": "F", "target": "O"},
            {"source": "G", "target": "P"},
            {"source": "H", "target": "Q"},
            {"source": "I", "target": "R"},
            {"source": "A", "target": "K"},
            {"source": "B", "target": "L"},
            {"source": "C", "target": "M"},
            {"source": "D", "target": "N"},
            {"source": "E", "target": "O"},
            {"source": "F", "target": "P"},
            {"source": "G", "target": "Q"},
            {"source": "H", "target": "R"},
            {"source": "I", "target": "J"}
        ]
      }`)
    );
  }, []);

  useEffect(() => {
    if (d3Container.current && data.nodes.length && data.links.length) {
      const margin = { top: 20, right: 30, bottom: 20, left: 30 };
      const width = data.nodes.length * 50 + margin.left + margin.right;
      const height = 1000;

      const boxPadding = 30;
      let nodeWidth = 48;
      let nodeHeight = 48;

      const svg = d3.select(d3Container.current).attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');

      svg.selectAll('*').remove();

      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 13)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 13)
        .attr('markerHeight', 13)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#000')
        .style('stroke', 'none');

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
        .append('rect')
        .attr('x', (width - bottomBoxWidth) / 2)
        .attr('y', height - boxHeight - 100)
        .attr('width', bottomBoxWidth)
        .attr('height', boxHeight)
        .attr('class', 'bottom-box');

      topNodes.forEach((node, index) => {
        (node as any).fx = (width - topBoxWidth) / 2 + boxPadding + index * (nodeWidth + boxPadding) + nodeWidth / 2;
        (node as any).fy = 100 + boxHeight / 2;
      });

      bottomNodes.forEach((node, index) => {
        (node as any).fx = (width - bottomBoxWidth) / 2 + boxPadding + index * (nodeWidth + boxPadding) + nodeWidth / 2;
        (node as any).fy = height - boxHeight - 100 + boxHeight / 2;
      });

      const simulation = d3
        .forceSimulation(data.nodes as d3.SimulationNodeDatum[])
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
        .attr('class', (d) => `node ${['A', 'F', 'P'].includes(d.id) ? 'blink' : ''}`)
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
        .attr('dy', nodeHeight / 2 + 5)
        .attr('dx', nodeWidth / 2)
        .attr('text-anchor', 'middle')
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

        svg.selectAll('.node').classed('blur', (d: any) => !connectedNodes.has(d.id));
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
    }
  }, [data]);

  return (
    <div style={{ overflowX: 'auto', width: '100%', height: '100%' }}>
      <svg ref={d3Container}></svg>
    </div>
  );
};

export default SubnetTopology;
