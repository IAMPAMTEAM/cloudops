import { useEffect } from 'react';
import onpremiseJson from '../data/nodes-onpremise.json';

export const NodesOnpremise = () => {
  const getCssPropertyValue = (selector, property) => {
    const element = document.querySelector(selector);
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  const calculateGridDimensions = (cidrWidth, cidrHeight, nodeCount) => {
    const aspectRatio = cidrWidth / cidrHeight;
    let cols = Math.ceil(Math.sqrt(nodeCount * aspectRatio));
    let rows = Math.ceil(nodeCount / cols);

    // Adjust columns and rows to minimize empty spaces and consider node size
    while ((cols - 1) * rows >= nodeCount) cols--;
    while ((rows - 1) * cols >= nodeCount) rows--;

    return { rows, cols };
  };

  const calculateNodeGridDimensions = (cidrWidth, cidrHeight, nodeCount) => {
    const aspectRatio = cidrWidth / cidrHeight;
    let cols = Math.ceil(Math.sqrt(nodeCount * aspectRatio));
    let rows = Math.ceil(nodeCount / cols);

    // Adjust columns and rows to minimize empty spaces and consider node size
    while ((cols - 1) * rows >= nodeCount) cols--;
    while ((rows - 1) * cols >= nodeCount) rows--;

    return { rows, cols };
  };

  const getNodeIcon = (nodeType) => {
    switch (nodeType) {
      case 'AWS EC2':
        return 'https://icons.terrastruct.com/aws%2FCompute%2F_Instance%2FAmazon-EC2_Instance_light-bg.svg';
      case 'PC':
        return 'https://icons.terrastruct.com/tech%2Flaptop.svg';
      case 'AWS ELB':
        return 'https://icons.terrastruct.com/aws%2FNetworking%20&%20Content%20Delivery%2FElastic-Load-Balancing-ELB_Network-load-balancer_light-bg.svg';
      case 'AWS RDS':
        return 'https://icons.terrastruct.com/aws%2FDatabase%2FAmazon-RDS_Amazon-RDS_instance_light-bg.svg';
      default:
        return '';
    }
  };

  useEffect(() => {
    const data = onpremiseJson;
    const onpremiseContainer = document.getElementById('onpremiseContainer');
    const tooltip = document.getElementById('tooltip');

    // Clear previous content
    if (onpremiseContainer) onpremiseContainer.innerHTML = '';

    // Get width and height from CSS
    const width = parseInt(getCssPropertyValue('#onpremiseContainer', 'width'));
    const height = parseInt(getCssPropertyValue('#onpremiseContainer', 'height'));
    const padding = 20;
    const maxNodeSize = 80;
    const minNodeSize = 60; // 최소 크기를 60으로 설정

    const distinctCidrs = [...new Set(data.map((node) => node.cidr))];
    const cidrGrid = calculateGridDimensions(width, height, distinctCidrs.length);
    const cidrWidth = (width - (cidrGrid.cols + 1) * padding) / cidrGrid.cols;
    const cidrHeight = (height - (cidrGrid.rows + 1) * padding) / cidrGrid.rows;

    distinctCidrs.forEach((cidr, cidrIndex) => {
      const cidrNodes = data.filter((node) => node.cidr === cidr);
      const cidrName = cidrNodes[0].cidrName;

      const cidrRow = Math.floor(cidrIndex / cidrGrid.cols);
      const cidrCol = cidrIndex % cidrGrid.cols;

      const cidrGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      cidrGroup.setAttribute('class', 'cidr-group round black');
      cidrGroup.setAttribute('transform', `translate(${cidrCol * (cidrWidth + padding) + padding}, ${cidrRow * (cidrHeight + padding) + padding})`);

      const cidrRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      // @ts-ignore
      cidrRect.setAttribute('width', cidrWidth);
      // @ts-ignore
      cidrRect.setAttribute('height', cidrHeight);
      cidrGroup.appendChild(cidrRect);

      const cidrLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      cidrLabel.setAttribute('class', 'cidr-label nanum-bold');
      // @ts-ignore
      cidrLabel.setAttribute('x', 5);
      // @ts-ignore
      cidrLabel.setAttribute('y', 15);
      cidrLabel.textContent = `${cidrName} (${cidr})`;
      cidrGroup.appendChild(cidrLabel);

      const nodeGrid = calculateNodeGridDimensions(cidrWidth, cidrHeight - 30, cidrNodes.length);

      let nodeWidth = (cidrWidth - (nodeGrid.cols + 1) * padding) / nodeGrid.cols;
      let nodeHeight = (cidrHeight - 30 - (nodeGrid.rows + 1) * padding) / nodeGrid.rows;

      // Adjust node sizes if they are smaller than the minimum size
      nodeWidth = Math.max(minNodeSize, Math.min(maxNodeSize, nodeWidth));
      nodeHeight = Math.max(minNodeSize, Math.min(maxNodeSize, nodeHeight));

      // Dynamically adjust padding to ensure nodes fit within the group box
      const nodePaddingX = (cidrWidth - nodeGrid.cols * nodeWidth) / (nodeGrid.cols + 1);
      const nodePaddingY = (cidrHeight - 30 - nodeGrid.rows * nodeHeight) / (nodeGrid.rows + 1);

      const offsetX = (cidrWidth - (nodeGrid.cols * (nodeWidth + nodePaddingX) - nodePaddingX)) / 10;
      const offsetY = (cidrHeight - 30 - (nodeGrid.rows * (nodeHeight + nodePaddingY) - nodePaddingY)) / 10;

      cidrNodes.forEach((node, nodeIndex) => {
        const nodeRow = Math.floor(nodeIndex / nodeGrid.cols);
        const nodeCol = nodeIndex % nodeGrid.cols;

        const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        nodeGroup.setAttribute('class', 'node-group');
        nodeGroup.setAttribute('transform', `translate(${offsetX + nodeCol * (nodeWidth + nodePaddingX) + nodePaddingX}, ${30 + offsetY + nodeRow * (nodeHeight + nodePaddingY) + nodePaddingY})`);

        const nodeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        nodeIcon.setAttribute('href', getNodeIcon(node.nodeType));
        // @ts-ignore
        nodeIcon.setAttribute('width', nodeWidth);
        // @ts-ignore
        nodeIcon.setAttribute('height', nodeHeight - 30);
        nodeIcon.addEventListener('mouseover', () => {
          // @ts-ignore
          tooltip.style.display = 'block';
          // @ts-ignore
          tooltip.textContent = node.nodeId;
        });
        nodeIcon.addEventListener('mouseout', () => {
          // @ts-ignore
          tooltip.style.display = 'none';
        });
        nodeIcon.addEventListener('mousemove', (event) => {
          // @ts-ignore
          tooltip.style.top = `${event.pageY + 5}px`;
          // @ts-ignore
          tooltip.style.left = `${event.pageX + 5}px`;
        });
        nodeGroup.appendChild(nodeIcon);

        const nodeNameLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nodeNameLabel.setAttribute('class', 'node-label nanum-bold');
        // @ts-ignore
        nodeNameLabel.setAttribute('x', nodeWidth / 2);
        // @ts-ignore
        nodeNameLabel.setAttribute('y', nodeHeight - 20);
        nodeNameLabel.setAttribute('text-anchor', 'middle');
        nodeNameLabel.textContent = node.nodeName;
        nodeGroup.appendChild(nodeNameLabel);

        const nodeIpLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nodeIpLabel.setAttribute('class', 'node-label nanum-bold');
        // @ts-ignore
        nodeIpLabel.setAttribute('x', nodeWidth / 2);
        // @ts-ignore
        nodeIpLabel.setAttribute('y', nodeHeight - 10);
        nodeIpLabel.setAttribute('text-anchor', 'middle');
        nodeIpLabel.textContent = node.nodeIp;
        nodeGroup.appendChild(nodeIpLabel);

        cidrGroup.appendChild(nodeGroup);
      });

      // @ts-ignore
      onpremiseContainer.appendChild(cidrGroup);
    });
  });

  return (
    <div className='nodes-box'>
      <svg id='onpremiseContainer'></svg>
    </div>
  );
};
