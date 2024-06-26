import { TopologyRepeat } from '@/components/TopologyRepeat';
import SubnetSeoulA from '@/assets/images/subnet-seoulA.svg';
import SubnetSeoulB from '@/assets/images/subnet-seoulB.svg';
import SubnetSingapore from '@/assets/images/subnet-singapore.svg';
import SubnetVirginia from '@/assets/images/subnet-virginia.svg';
import { useEffect } from 'react';
import subnetsJson from './data/subnets.json';
import './css/subnets.css';

const Subnets = () => {
  const calculateGrid = (count) => {
    const rows = Math.ceil(Math.sqrt(count));
    const cols = Math.ceil(count / rows);
    return { rows, cols };
  };

  const getSvgDimensions = () => {
    const svgElement = document.getElementById('mainContainer') as Element;
    const computedStyle = getComputedStyle(svgElement);
    const width = parseFloat(computedStyle.width);
    const height = parseFloat(computedStyle.height);
    return { width, height };
  };

  useEffect(() => {
    const data = subnetsJson;
    const mainContainer = document.getElementById('mainContainer');

    // Clear previous content
    if (mainContainer) mainContainer.innerHTML = '';

    const { width, height } = getSvgDimensions();
    const padding = 20;
    const vpcCount = data.length;

    const vpcGrid = calculateGrid(vpcCount);
    const vpcWidth = (width - (vpcGrid.cols + 1) * padding) / vpcGrid.cols;
    const vpcHeight = (height - (vpcGrid.rows + 1) * padding) / vpcGrid.rows;

    data.forEach((vpc, vpcIndex) => {
      const vpcRow = Math.floor(vpcIndex / vpcGrid.cols);
      const vpcCol = vpcIndex % vpcGrid.cols;

      const vpcGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      vpcGroup.setAttribute('class', 'vpc-group');
      vpcGroup.setAttribute('transform', `translate(${vpcCol * (vpcWidth + padding) + padding}, ${vpcRow * (vpcHeight + padding) + padding})`);

      const vpcRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      vpcRect.setAttribute('width', vpcWidth);
      vpcRect.setAttribute('height', vpcHeight);
      vpcGroup.appendChild(vpcRect);

      const vpcLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      vpcLabel.setAttribute('class', 'vpc-label');
      vpcLabel.setAttribute('x', 5);
      vpcLabel.setAttribute('y', 15);
      vpcLabel.textContent = `${vpc.vpcName} (${vpc.vpcCidr})`;
      vpcGroup.appendChild(vpcLabel);

      const subnetCount = vpc.subnets.length;
      const subnetGrid = calculateGrid(subnetCount);

      // Adjusting sizes to be at least 50% larger
      let subnetWidth = ((vpcWidth - (subnetGrid.cols + 1) * padding) / subnetGrid.cols) * 1.5;
      let subnetHeight = subnetWidth * 0.4; // Setting height to be 4% of the width

      subnetWidth = Math.max(90, Math.min(120, subnetWidth)); // Adjusted min and max sizes
      subnetHeight = Math.max(63, Math.min(84, subnetHeight)); // Adjusted min and max sizes proportionally

      const subnetPaddingX = (vpcWidth - subnetGrid.cols * subnetWidth) / (subnetGrid.cols + 1);
      const subnetPaddingY = (vpcHeight - 30 - subnetGrid.rows * subnetHeight) / (subnetGrid.rows + 1);

      const offsetX = (vpcWidth - (subnetGrid.cols * (subnetWidth + subnetPaddingX) - subnetPaddingX)) / 20;
      const offsetY = (vpcHeight - 30 - (subnetGrid.rows * (subnetHeight + subnetPaddingY) - subnetPaddingY)) / 50;

      vpc.subnets.forEach((subnet, subnetIndex) => {
        const subnetRow = Math.floor(subnetIndex / subnetGrid.cols);
        const subnetCol = subnetIndex % subnetGrid.cols;

        const subnetGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        subnetGroup.setAttribute('class', 'subnet-group');
        subnetGroup.setAttribute(
          'transform',
          `translate(${offsetX + subnetCol * (subnetWidth + subnetPaddingX) + subnetPaddingX}, ${30 + offsetY + subnetRow * (subnetHeight + subnetPaddingY) + subnetPaddingY})`
        );

        const subnetRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        subnetRect.setAttribute('width', subnetWidth);
        subnetRect.setAttribute('height', subnetHeight);
        subnetRect.classList.add(subnet.connectivityType);
        subnetGroup.appendChild(subnetRect);

        const subnetLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subnetLabel.setAttribute('class', 'subnet-label');
        subnetLabel.setAttribute('x', subnetWidth / 2);
        subnetLabel.setAttribute('y', subnetHeight / 2 - 5);
        subnetLabel.textContent = subnet.subnetName;
        subnetGroup.appendChild(subnetLabel);

        const subnetCidrLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subnetCidrLabel.setAttribute('class', 'subnet-label');
        subnetCidrLabel.setAttribute('x', subnetWidth / 2);
        subnetCidrLabel.setAttribute('y', subnetHeight / 2 + 15);
        subnetCidrLabel.textContent = subnet.subnetCidr;
        subnetGroup.appendChild(subnetCidrLabel);

        vpcGroup.appendChild(subnetGroup);
      });

      mainContainer.appendChild(vpcGroup);
    });
  });

  return (
    <>
      <div className='grid lg:grid-cols-1 gap-[8px]'>
        <div className='subnet-box panel lg:col-span-1 w-fit'>
          <svg className='' id='mainContainer'></svg>
        </div>
      </div>
    </>
    // <div>
    //     <TopologyRepeat imageSrcs={images} title={titles} />
    // </div>
  );
};

export default Subnets;
