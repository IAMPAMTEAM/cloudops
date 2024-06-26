import { TopologyRepeat } from '@/components/TopologyRepeat';
import VPCPeeringSeoul from '@/assets/images/vpc-peering-seoul.svg';
import VPCPeeringVirginia from '@/assets/images/vpc-peering-virginia.svg';
import './css/elb.css';
import { useEffect } from 'react';
import vpcpeeringJson from './data/vpcPeers.json';

const VPCPeering = () => {
  const images = [VPCPeeringSeoul, VPCPeeringVirginia];
  const titles = ['Seoul', 'Virginia'];

  const svgns = 'http://www.w3.org/2000/svg';
  const linkType = ['animate-draw', 'animate-blink', 'animate-fade', 'line', 'dash', 'curvedQ', 'curvedC', 'curvedQ-dash', 'curvedC-dash'];
  const linkColor = ['black', 'gray', 'blue', 'red', 'yellow', 'green', 'orange'];

  const createGroup = (groupName, nodeName, x, y) => {
    const g = document.createElementNS(svgns, 'g');
    g.setAttribute('data-group', groupName);
    g.setAttribute('data-name', nodeName);
    g.setAttribute('transform', `translate(${x}, ${y})`);
    addScaleEvents(g, x, y);
    return g;
  };

  const createText = (x, y, content, fontFamily, fontSize, fill, anchor) => {
    const text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('font-family', fontFamily);
    text.setAttribute('font-size', fontSize);
    text.setAttribute('fill', fill);
    text.setAttribute('text-anchor', anchor);
    text.textContent = content;
    return text;
  };

  const addScaleEvents = (g, x, y) => {
    g.addEventListener('mouseover', () => {
      g.setAttribute('transform', `translate(${x}, ${y}) scale(1.1)`);
    });
    g.addEventListener('mouseout', () => {
      g.setAttribute('transform', `translate(${x}, ${y}) scale(1)`);
    });
  };

  const createCircleNode = (groupName, nodeName, x, y, size, fillColor, textFontSize) => {
    const g = createGroup(groupName, nodeName, x, y);

    const circle = document.createElementNS(svgns, 'circle');
    //@ts-ignore
    circle.setAttribute('cx', 0);
    //@ts-ignore
    circle.setAttribute('cy', 0);
    //@ts-ignore
    circle.setAttribute('r', size / 2);
    circle.setAttribute('fill', fillColor);
    circle.setAttribute('stroke', 'black');
    //@ts-ignore
    circle.setAttribute('stroke-width', 2);

    const text = createText(0, size / 2 + 20, nodeName, 'Nanum Square', textFontSize, 'black', 'middle');

    g.appendChild(circle);
    g.appendChild(text);

    return g;
  };

  const createRectNode = (groupName, nodeName, x, y, size, fillColor, textFontSize) => {
    const g = createGroup(groupName, nodeName, x, y);

    const rect = document.createElementNS(svgns, 'rect');
    //@ts-ignore
    rect.setAttribute('x', -size / 2);
    //@ts-ignore
    rect.setAttribute('y', -size / 2);
    rect.setAttribute('width', size);
    rect.setAttribute('height', size);
    rect.setAttribute('fill', fillColor);
    rect.setAttribute('stroke', 'black');
    //@ts-ignore
    rect.setAttribute('stroke-width', 2);

    const text = createText(0, size / 2 + 20, nodeName, 'Nanum Square', textFontSize, 'black', 'middle');

    g.appendChild(rect);
    g.appendChild(text);

    return g;
  };

  const createImageNode = (groupName, nodeName, x, y, imageUrl, size, textFontSize) => {
    const g = createGroup(groupName, nodeName, x, y);

    const imageSize = size * 1.2; // 이미지 크기를 노드 크기의 110%로 설정
    const image = document.createElementNS(svgns, 'image');
    //@ts-ignore
    image.setAttribute('x', -imageSize / 2);
    //@ts-ignore
    image.setAttribute('y', -imageSize / 2);
    //@ts-ignore
    image.setAttribute('width', imageSize);
    //@ts-ignore
    image.setAttribute('height', imageSize);
    image.setAttribute('href', imageUrl);

    const text = createText(0, size / 2 + 20, nodeName, 'Nanum Square', textFontSize, 'black', 'middle');

    g.appendChild(image);
    g.appendChild(text);

    return g;
  };

  const createTextNode = (groupName, nodeName, x, y, textContent, fontSize, fillColor) => {
    const g = createGroup(groupName, nodeName, x, y);

    const text = createText(0, 0, textContent, 'Nanum Square', fontSize, fillColor, 'middle');

    g.appendChild(text);

    return g;
  };

  const calculateNodePositionAndSize = (groupNodes, groupWidth, groupHeight) => {
    const nodeCount = groupNodes.length;

    // 텍스트를 위한 여유 공간
    const textPadding = 30;

    // 사용 가능한 실제 높이 (텍스트 공간 제외)
    const availableHeight = groupHeight - textPadding;

    // 텍스트 길이를 기반으로 최소 노드 크기 계산
    const getMinNodeSize = (node) => {
      const textLength = node.nodeName.length;
      return Math.max(40, textLength * 6); // 텍스트 길이의 50% 이상
    };

    // 최소 및 최대 노드 크기 설정
    const minNodeSize = Math.min(80, groupWidth / 8, availableHeight / 3.5);
    const maxNodeSize = Math.min(groupWidth / 7, availableHeight / 5);

    // 노드 간 최소 간격
    const minSpacing = 10;

    // 초기 노드 크기 계산 (텍스트 길이 고려)
    let nodeSize = Math.min(maxNodeSize, Math.max(...groupNodes.map(getMinNodeSize), minNodeSize, (groupWidth - minSpacing * (nodeCount + 1)) / nodeCount, (availableHeight - minSpacing * 2) / 2));

    // 총 필요 너비 계산
    let totalWidth = nodeSize * nodeCount + minSpacing * (nodeCount + 1);

    // 노드 크기 조정 (필요한 경우)
    while (totalWidth > groupWidth && nodeSize > minNodeSize) {
      nodeSize -= 0.5;
      totalWidth = nodeSize * nodeCount + minSpacing * (nodeCount + 1);
    }

    // 최종 간격 계산
    const spacing = Math.max(minSpacing, (groupWidth - nodeSize * nodeCount) / (nodeCount + 1));

    // Y 위치 계산 (세로 중앙, 텍스트 공간 고려)
    const yPos = availableHeight / 2 - textPadding / 2;

    const positions = [];
    let xPos = spacing;

    for (let i = 0; i < nodeCount; i++) {
      //@ts-ignore
      positions.push({ x: xPos, y: yPos, size: nodeSize });
      xPos += nodeSize + spacing;
    }

    return positions;
  };

  const createLink = (fromNode, toNode, linkType, linkColor) => {
    const path = document.createElementNS(svgns, 'path');

    let pathData;
    switch (linkType) {
      case 'curvedQ':
      case 'curvedQ-dash':
        pathData = `M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${(fromNode.y + toNode.y) / 2 - 50} ${toNode.x} ${toNode.y}`;
        break;
      case 'curvedC':
      case 'curvedC-dash':
        pathData = `M ${fromNode.x} ${fromNode.y} C ${fromNode.x} ${fromNode.y - 50} ${toNode.x} ${toNode.y - 50} ${toNode.x} ${toNode.y}`;
        break;
      default:
        pathData = `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;
        break;
    }

    path.setAttribute('d', pathData);
    path.setAttribute('stroke', linkColor);
    path.setAttribute('fill', 'transparent');
    //@ts-ignore
    path.setAttribute('stroke-width', 2);

    if (linkType.includes('dash')) {
      path.setAttribute('stroke-dasharray', '5,5');
    }

    if (linkType.startsWith('animate')) {
      const animate = document.createElementNS(svgns, 'animate');
      animate.setAttribute('attributeName', 'stroke-dasharray');
      animate.setAttribute('from', '0, 100');
      animate.setAttribute('to', '100, 0');
      animate.setAttribute('dur', '2s');
      animate.setAttribute('repeatCount', 'indefinite');
      path.appendChild(animate);
    }

    if (linkType === 'animate-blink') {
      const animateBlink = document.createElementNS(svgns, 'animate');
      animateBlink.setAttribute('attributeName', 'opacity');
      animateBlink.setAttribute('values', '1;0;1');
      animateBlink.setAttribute('dur', '1s');
      animateBlink.setAttribute('repeatCount', 'indefinite');
      path.appendChild(animateBlink);
    }

    if (linkType === 'animate-fade') {
      const animateFade = document.createElementNS(svgns, 'animate');
      animateFade.setAttribute('attributeName', 'opacity');
      animateFade.setAttribute('values', '0;1;0');
      animateFade.setAttribute('dur', '3s');
      animateFade.setAttribute('repeatCount', 'indefinite');
      path.appendChild(animateFade);
    }

    return path;
  };

  useEffect(() => {
    try {
      const data = vpcpeeringJson;

      const svgContainer = document.getElementById('svgContainer');
      //@ts-ignore
      svgContainer.style.width = data.width + 'px';
      //@ts-ignore
      svgContainer.style.height = data.height + 'px';
      //@ts-ignore
      svgContainer.style.backgroundImage = `url(${data.backgroundUrl})`;
      //@ts-ignore
      svgContainer.classList.add('svg-container');

      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      //@ts-ignore
      svg.setAttribute('width', data.width);
      //@ts-ignore
      svg.setAttribute('height', data.height);

      // 링크를 담을 그룹을 먼저 추가 (노드 아래 레이어에 배치하기 위함)
      const linkLayer = document.createElementNS(svgNS, 'g');
      svg.appendChild(linkLayer);

      // 행 높이 및 열 너비 초기화
      const rowHeights = {};
      const columnWidths = {};

      // 각 셀의 행 높이와 열 너비 계산
      data.layouts.forEach((layout) => {
        if (!rowHeights[layout.row]) {
          rowHeights[layout.row] = 0;
        }
        if (!columnWidths[layout.column]) {
          columnWidths[layout.column] = 0;
        }
        rowHeights[layout.row] = Math.max(rowHeights[layout.row], layout.height);
        columnWidths[layout.column] += layout.width;
      });

      const nodePositions = {};

      // 각 그룹의 위치 및 크기 설정
      data.layouts.forEach((layout) => {
        const group = document.createElementNS(svgNS, 'g');
        group.classList.add('svg-group');

        // 행과 열에 따른 위치 계산
        const x = data.layouts.filter((l) => l.row === layout.row && l.column < layout.column).reduce((sum, l) => sum + l.width, 0);
        const y = data.layouts.filter((l) => l.column === layout.column && l.row < layout.row).reduce((sum, l) => sum + l.height, 0);

        group.setAttribute('transform', `translate(${x}, ${y})`);

        const rect = document.createElementNS(svgNS, 'rect');
        //@ts-ignore
        rect.setAttribute('width', layout.width);
        //@ts-ignore
        rect.setAttribute('height', layout.height);
        rect.setAttribute('fill', layout.color);
        group.appendChild(rect);

        const text = document.createElementNS(svgNS, 'text');
        //@ts-ignore
        text.setAttribute('x', 5); // 왼쪽에서 약간 패딩
        //@ts-ignore
        text.setAttribute('y', 15); // 위쪽에서 약간 패딩
        text.classList.add('group-name');
        text.textContent = layout.groupName;
        //group.appendChild(text);

        const groupNodes = data.groupList[layout.groupName];
        if (groupNodes) {
          const positions = calculateNodePositionAndSize(groupNodes, layout.width, layout.height);
          groupNodes.forEach((node, index) => {
            const pos = positions[index];
            let nodeElement;
            const computedNode = {
              //@ts-ignore
              x: x + pos.x,
              //@ts-ignore
              y: y + pos.y,
              fontSize: 11,
            };
            switch (node.nodeType) {
              case 'circleNode':
                //@ts-ignore
                nodeElement = createCircleNode(layout.groupName, node.nodeName, pos.x, pos.y, pos.size, node.color || node.fillColor, 11);
                //@ts-ignore
                computedNode.radius = pos.size / 2;
                break;
              case 'rectNode':
                //@ts-ignore
                nodeElement = createRectNode(layout.groupName, node.nodeName, pos.x, pos.y, pos.size, node.color || node.fillColor, 11);
                //@ts-ignore
                computedNode.width = pos.size;
                //@ts-ignore
                computedNode.height = pos.size;
                break;
              case 'imageNode':
                nodeElement = createImageNode(
                  layout.groupName,
                  node.nodeName,
                  //@ts-ignore
                  pos.x,
                  //@ts-ignore
                  pos.y,
                  node.imageUrl,
                  //@ts-ignore
                  pos.size,
                  11
                );
                //@ts-ignore
                computedNode.width = pos.size;
                //@ts-ignore
                computedNode.height = pos.size;
                break;
              case 'textNode':
                //@ts-ignore
                nodeElement = createTextNode(layout.groupName, node.nodeName, pos.x, pos.y, node.text, 11, node.color);
                break;
            }
            group.appendChild(nodeElement);

            // 노드 JSON에 계산된 속성 추가
            node.x = computedNode.x;
            node.y = computedNode.y;
            //@ts-ignore
            if (computedNode.width) node.width = computedNode.width;
            //@ts-ignore
            if (computedNode.height) node.height = computedNode.height;
            //@ts-ignore
            if (computedNode.radius) node.radius = computedNode.radius;
            node.fontSize = computedNode.fontSize;

            // 링크를 위한 노드 위치 저장
            nodePositions[node.nodeName] = {
              x: computedNode.x,
              y: computedNode.y,
            };
          });
        }

        svg.appendChild(group);
      });

      // 링크 그리기
      data.groupLink.forEach((link) => {
        const fromNode = nodePositions[link.fromNode];
        const toNode = nodePositions[link.toNode];
        if (fromNode && toNode) {
          const linkElement = createLink(fromNode, toNode, link.linkType, link.linkColor);
          linkLayer.appendChild(linkElement); // 링크를 링크 레이어에 추가
        }
      });

      //@ts-ignore
      svgContainer.appendChild(svg);

      // 수정된 JSON을 computed-topology.json 파일로 저장
      const computedData = JSON.stringify(data, null, 2);
      // downloadJson(computedData, "computed-topology.json");
    } catch (error) {
      console.error('Error loading JSON:', error); // 에러 로그 추가
    }
  });

  return (
    <>
      <div className='panel '>
        <svg id='svgContainer' className='m-0 mx-auto'></svg>
      </div>
    </>
    // <div>
    //     <TopologyRepeat imageSrcs={images} title={titles} />
    // </div>
  );
};

export default VPCPeering;
