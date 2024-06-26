import resourcesSeoul from '../data/resources-seoul.json';
import resourcesSingapore from '../data/resources-singapore.json';
import resourcesVirginia from '../data/resources-virginia.json';
import { useEffect, useState } from 'react';
import '../css/resources.css';

interface Props {
  region: string;
}

export const Resources = (props: Props) => {
  const calculateGrid = (count) => {
    const rows = Math.ceil(Math.sqrt(count));
    const cols = Math.ceil(count / rows);
    return { rows, cols };
  };

  const getSvgDimensions = () => {
    const svgElement = document.getElementById('mainContainer');
    // @ts-ignore
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
    const data = seoulData;

    const mainContainer = document.getElementById('mainContainer');

    while (mainContainer?.firstChild) {
      mainContainer.removeChild(mainContainer.firstChild);
    }

    // Clear previous content
    if (mainContainer?.innerHTML) mainContainer.innerHTML = '';

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
    // @ts-ignore
    regionIcon.setAttribute('width', iconSize);
    // @ts-ignore
    regionIcon.setAttribute('height', iconSize);
    // @ts-ignore
    regionIcon.setAttribute('x', (leftSpaceWidth - iconSize) / 2);
    // @ts-ignore
    regionIcon.setAttribute('y', height / 2 - iconSize);

    const regionName = createTextElement(leftSpaceWidth / 2, height / 2 + 90 - iconSize, data.regionName, 'label', 'black', 'bold');

    regionGroup.appendChild(regionIcon);
    regionGroup.appendChild(regionName);
    // @ts-ignore
    mainContainer.appendChild(regionGroup);

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
      // @ts-ignore
      resourceRect.setAttribute('width', resourceWidth);
      // @ts-ignore
      resourceRect.setAttribute('height', resourceHeight);
      // @ts-ignore
      resourceRect.setAttribute('rx', 10); // Rounded corners
      // @ts-ignore
      resourceRect.setAttribute('ry', 10); // Rounded corners
      resourceRect.setAttribute('stroke', 'purple');
      resourceRect.setAttribute('stroke-dasharray', '4');
      resourceRect.setAttribute('fill', 'white');

      // Calculate the size for the icon to be 3 times smaller than the group box size
      const iconWidth = resourceWidth / 3;
      const iconHeight = resourceHeight / 3;

      const resourceIcon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      // @ts-ignore
      resourceIcon.setAttribute('href', resource.iconUrl);
      // @ts-ignore
      resourceIcon.setAttribute('width', iconWidth);
      // @ts-ignore
      resourceIcon.setAttribute('height', iconHeight);
      // @ts-ignore
      resourceIcon.setAttribute('x', (resourceWidth - iconWidth) / 2);
      // @ts-ignore
      resourceIcon.setAttribute('y', (resourceHeight - iconHeight) / 2);

      const resourceName = createTextElement(
        resourceWidth / 2,
        40, // Position the text at the top
        // @ts-ignore
        resource.name,
        'label',
        '#000',
        'bold'
      );

      const resourceDescription = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      // @ts-ignore
      resourceDescription.setAttribute('x', resourceWidth / 2);
      // @ts-ignore
      resourceDescription.setAttribute('y', resourceHeight * 0.85);
      resourceDescription.setAttribute('class', 'description');
      resourceDescription.setAttribute('text-anchor', 'middle');
      // @ts-ignore
      resourceDescription.innerHTML = createFormattedDescription(resource.description);

      resourceGroup.appendChild(resourceRect);
      resourceGroup.appendChild(resourceIcon);
      resourceGroup.appendChild(resourceName);
      resourceGroup.appendChild(resourceDescription);

      // @ts-ignore
      mainContainer.appendChild(resourceGroup);
      resourceIndex++;
    }
  });
  return (
    <div className='resources-box'>
      <svg id='mainContainer' className=''></svg>
    </div>
  );
};
