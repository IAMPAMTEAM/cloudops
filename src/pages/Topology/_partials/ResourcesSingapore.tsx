import { TopologyRepeat } from '@/components/TopologyRepeat';
import RegionalResourcesSeoul from '@/assets/images/regional-resources-seoul.svg';
import RegionalResourcesVirginia from '@/assets/images/regional-resources-virginia.svg';
import RegionalResourcesSingapore from '@/assets/images/regional-resources-singapore.svg';
import RegionalResourcesOregon from '@/assets/images/regional-resources-oregon.svg';
import resourcesSeoul from '../data/resources-seoul.json';
import resourcesSingapore from '../data/resources-singapore.json';
import resourcesVirginia from '../data/resources-virginia.json';
import { useEffect, useState } from 'react';
import '../css/resources.css';

interface Props {
  region: string;
}

export const ResourcesSingapore = (props: Props) => {
  const calculateGrid = (count) => {
    const rows = Math.ceil(Math.sqrt(count));
    const cols = Math.ceil(count / rows);
    return { rows, cols };
  };

  const getSvgDimensions = () => {
    const svgElement = document.getElementById('singaporeContainer');
    const computedStyle = getComputedStyle(svgElement);
    const width = parseFloat(computedStyle.width);
    const height = parseFloat(computedStyle.height);
    return { width, height };
  };

  const createTextElement = (x, y, text, className, fill = 'black', fontWeight = 'normal') => {
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', x);
    textElement.setAttribute('y', y);
    textElement.setAttribute('class', className);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('fill', fill);
    textElement.setAttribute('font-weight', fontWeight);
    textElement.textContent = text;
    return textElement;
  };

  const createFormattedDescription = (description) => {
    const parts = description.split(' ');
    const formattedParts = parts.map((part) => {
      if (!isNaN(part)) {
        return `<tspan style="fill: red; font-weight: bold;">${part}</tspan>`;
      }
      return part;
    });
    return formattedParts.join(' ');
  };

  const [seoulData, setSeoulData] = useState<any>(resourcesSeoul);
  const [virginiaData, setVirginiaData] = useState<any>(resourcesVirginia);
  const [singaporeData, setSingaporeData] = useState<any>(resourcesSingapore);

  useEffect(() => {
    const data = singaporeData;

    const singaporeContainer = document.getElementById('singaporeContainer');

    while (singaporeContainer?.firstChild) {
      singaporeContainer.removeChild(singaporeContainer.firstChild);
    }

    // Clear previous content
    if (singaporeContainer?.innerHTML) singaporeContainer.innerHTML = '';

    const { width, height } = getSvgDimensions();
    const padding = 20;
    const resourceCount = Object.keys(data.resources).length;

    // Left 20% space for region icon and name
    const leftSpaceWidth = width * 0.2;
    const contentWidth = width * 0.8;

    // Add region icon and name to the left 20% space
    const regionGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const regionIcon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    const iconSize = leftSpaceWidth * 0.6;
    regionIcon.setAttribute('href', data.regionIconUrl);
    regionIcon.setAttribute('width', iconSize);
    regionIcon.setAttribute('height', iconSize);
    regionIcon.setAttribute('x', (leftSpaceWidth - iconSize) / 2);
    regionIcon.setAttribute('y', height / 2 - iconSize);

    const regionName = createTextElement(leftSpaceWidth / 2, height / 2 + 90 - iconSize, data.regionName, 'label', 'black', 'bold');

    regionGroup.appendChild(regionIcon);
    regionGroup.appendChild(regionName);
    singaporeContainer.appendChild(regionGroup);

    const resourceGrid = calculateGrid(resourceCount);
    const resourceWidth = (contentWidth - (resourceGrid.cols + 1) * padding) / resourceGrid.cols;
    const resourceHeight = (height - (resourceGrid.rows + 1) * padding) / resourceGrid.rows;

    let resourceIndex = 0;
    for (const [key, resource] of Object.entries(data.resources)) {
      const row = Math.floor(resourceIndex / resourceGrid.cols);
      const col = resourceIndex % resourceGrid.cols;

      const resourceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      resourceGroup.setAttribute('transform', `translate(${leftSpaceWidth + col * (resourceWidth + padding) + padding}, ${row * (resourceHeight + padding) + padding})`);

      const resourceRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      resourceRect.setAttribute('width', resourceWidth);
      resourceRect.setAttribute('height', resourceHeight);
      resourceRect.setAttribute('rx', 10); // Rounded corners
      resourceRect.setAttribute('ry', 10); // Rounded corners
      resourceRect.setAttribute('stroke', 'purple');
      resourceRect.setAttribute('stroke-dasharray', '4');
      resourceRect.setAttribute('fill', 'white');

      // Calculate the size for the icon to be 3 times smaller than the group box size
      const iconWidth = resourceWidth / 3;
      const iconHeight = resourceHeight / 3;

      const resourceIcon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      resourceIcon.setAttribute('href', resource.iconUrl);
      resourceIcon.setAttribute('width', iconWidth);
      resourceIcon.setAttribute('height', iconHeight);
      resourceIcon.setAttribute('x', (resourceWidth - iconWidth) / 2);
      resourceIcon.setAttribute('y', (resourceHeight - iconHeight) / 2);

      const resourceName = createTextElement(
        resourceWidth / 2,
        40, // Position the text at the top
        resource.name,
        'label',
        '#000',
        'bold'
      );

      const resourceDescription = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      resourceDescription.setAttribute('x', resourceWidth / 2);
      resourceDescription.setAttribute('y', resourceHeight * 0.85);
      resourceDescription.setAttribute('class', 'description');
      resourceDescription.setAttribute('text-anchor', 'middle');
      resourceDescription.innerHTML = createFormattedDescription(resource.description);

      resourceGroup.appendChild(resourceRect);
      resourceGroup.appendChild(resourceIcon);
      resourceGroup.appendChild(resourceName);
      resourceGroup.appendChild(resourceDescription);

      singaporeContainer.appendChild(resourceGroup);
      resourceIndex++;
    }
  });
  return (
    <div className='resources-box'>
      <svg id='singaporeContainer'></svg>
    </div>
  );
};
