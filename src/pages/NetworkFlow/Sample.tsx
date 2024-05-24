import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './NetworkTopology.css';

interface Node {
  id: string;
  group: string; // "left" or "right"
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
                          {"id": "A", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "B", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "C", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "D", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "E", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "F", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "G", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "H", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "I", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "J", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "K", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "L", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "M", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "N", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "O", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "P", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "Q", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "R", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "S", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
                          {"id": "T", "group": "right", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"}
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
                          {"id": "I", "group": "left", "img": "https://icons.terrastruct.com/aws/Compute/Amazon-EC2_Rescue_light-bg.svg"},
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
                  }
                  `)
    );
  }, []);

  useEffect(() => {
    if (d3Container.current && data.nodes.length && data.links.length) {
      const width = 1200;
      const height = 1000;
      const boxPadding = 30;
      const nodeWidth = 48;
      const nodeHeight = 48;
      const maxNodesPerRow = 10;

      // Calculate node size based on the number of nodes
      const leftNodeCount = data.nodes.filter((node) => node.group === 'left').length;
      const rightNodeCount = data.nodes.filter((node) => node.group === 'right').length;
      const nodeCount = Math.max(leftNodeCount, rightNodeCount);
      const nodeSizeFactor = Math.max(1, maxNodesPerRow / nodeCount);
      const adjustedNodeWidth = nodeWidth * nodeSizeFactor;
      const adjustedNodeHeight = nodeHeight * nodeSizeFactor;

      const svg = d3.select(d3Container.current).attr('width', width).attr('height', height);

      // Clear previous elements
      svg.selectAll('*').remove();

      // Define arrow marker
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

      // Add background rectangle for click events
      svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'none').attr('pointer-events', 'all').on('click', handleBackgroundClick);

      // Group nodes by left and right
      const leftNodes = data.nodes.filter((node) => node.group === 'left');
      const rightNodes = data.nodes.filter((node) => node.group === 'right');

      // Calculate the number of rows and columns needed
      const leftBoxCols = Math.ceil(leftNodes.length);
      const rightBoxCols = Math.ceil(rightNodes.length);

      // Calculate box sizes
      const boxWidth = Math.max(leftBoxCols, rightBoxCols) * (adjustedNodeWidth + boxPadding) + boxPadding;
      const leftBoxHeight = adjustedNodeHeight + 2 * boxPadding;
      const rightBoxHeight = adjustedNodeHeight + 2 * boxPadding;

      // Draw group boxes
      svg
        .append('rect')
        .attr('x', 100)
        .attr('y', (height - leftBoxHeight) / 2)
        .attr('width', boxWidth)
        .attr('height', leftBoxHeight)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 2);

      svg
        .append('rect')
        .attr('x', width - boxWidth - 100)
        .attr('y', (height - rightBoxHeight) / 2)
        .attr('width', boxWidth)
        .attr('height', rightBoxHeight)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 2);

      // Assign fixed positions for nodes in a grid
      leftNodes.forEach((node, index) => {
        const col = index;
        (node as any).fx = 100 + boxPadding + col * (adjustedNodeWidth + boxPadding) + adjustedNodeWidth / 2;
        (node as any).fy = (height - leftBoxHeight) / 2 + boxPadding + adjustedNodeHeight / 2;
      });

      rightNodes.forEach((node, index) => {
        const col = index;
        (node as any).fx = width - boxWidth - 100 + boxPadding + col * (adjustedNodeWidth + boxPadding) + adjustedNodeWidth / 2;
        (node as any).fy = (height - rightBoxHeight) / 2 + boxPadding + adjustedNodeHeight / 2;
      });

      // Create simulation with forces
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

      // Draw links with custom path
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

      // Draw nodes with images
      const node = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('image')
        .data(data.nodes)
        .enter()
        .append('image')
        .attr('class', (d) => `node ${['A', 'F', 'P'].includes(d.id) ? 'blink' : ''}`)
        .attr('xlink:href', (d) => d.img)
        .attr('width', adjustedNodeWidth)
        .attr('height', adjustedNodeHeight)
        .on('click', handleNodeClick); // Add click event handler

      // Draw node labels
      const label = svg
        .append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(data.nodes)
        .enter()
        .append('text')
        .attr('dy', adjustedNodeHeight / 2 + 5)
        .attr('dx', adjustedNodeWidth / 2)
        .attr('text-anchor', 'middle')
        .text((d) => d.id);

      function handleNodeClick(event: any, clickedNode: any) {
        event.stopPropagation();

        const connectedNodes = new Set<string>();
        const connectedLinks = new Set<any>();

        data.links.forEach((link) => {
          if (link.source === clickedNode.id || link.target === clickedNode.id) {
            connectedNodes.add(link.source.toString());
            connectedNodes.add(link.target.toString());
            connectedLinks.add(link);
          }
        });

        // Add the clicked node itself
        connectedNodes.add(clickedNode.id);

        // Get nodes connected to connected links
        connectedLinks.forEach((link) => {
          connectedNodes.add(link.source.toString());
          connectedNodes.add(link.target.toString());
        });

        // Apply blur to all nodes and links, except the connected ones
        svg.selectAll('.node').classed('blur', (d: any) => !connectedNodes.has(d.id));

        svg.selectAll('.link').style('visibility', (d: any) => {
          return !(connectedNodes.has((d.source as any).id) && connectedNodes.has((d.target as any).id)) ? 'hidden' : 'visible';
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

        node.attr('x', (d) => ((d as any).fx as number) - adjustedNodeWidth / 2).attr('y', (d) => ((d as any).fy as number) - adjustedNodeHeight / 2);

        label.attr('x', (d) => (d as any).fx as number).attr('y', (d) => (d as any).fy as number);
      }
    }
  }, [data]);

  return <svg ref={d3Container}></svg>;
};

export default SubnetTopology;
