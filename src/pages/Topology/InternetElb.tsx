import { useEffect } from 'react';
import elbJson from './data/elb.json';
// import './css/elb.css';

const InternetElb = () => {
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
    // @ts-ignore
    circle.setAttribute('cx', 0);
    // @ts-ignore
    circle.setAttribute('cy', 0);
    // @ts-ignore
    circle.setAttribute('r', size / 2);
    circle.setAttribute('fill', fillColor);
    circle.setAttribute('stroke', 'black');
    // @ts-ignore
    circle.setAttribute('stroke-width', 2);

    const text = createText(0, size / 2 + 20, nodeName, 'Nanum Square', textFontSize, 'black', 'middle');

    g.appendChild(circle);
    g.appendChild(text);

    return g;
  };

  const createRectNode = (groupName, nodeName, x, y, size, fillColor, textFontSize) => {
    const g = createGroup(groupName, nodeName, x, y);

    const rect = document.createElementNS(svgns, 'rect');
    // @ts-ignore
    rect.setAttribute('x', -size / 2);
    // @ts-ignore
    rect.setAttribute('y', -size / 2);
    rect.setAttribute('width', size);
    rect.setAttribute('height', size);
    rect.setAttribute('fill', fillColor);
    rect.setAttribute('stroke', 'black');
    // @ts-ignore
    rect.setAttribute('stroke-width', 2);

    const text = createText(0, size / 2 + 20, nodeName, 'Nanum Square', textFontSize, 'black', 'middle');

    g.appendChild(rect);
    g.appendChild(text);

    return g;
  };

  const createImageNode = (groupName, nodeName, x, y, imageUrl, size, textFontSize) => {
    const g = createGroup(groupName, nodeName, x, y);

    const image = document.createElementNS(svgns, 'image');
    // @ts-ignore
    image.setAttribute('x', -size / 2);
    // @ts-ignore
    image.setAttribute('y', -size / 2);
    image.setAttribute('width', size);
    image.setAttribute('height', size);
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

    // 노드 크기 및 패딩 비율을 계산
    const maxNodeSize = Math.min(groupWidth / (nodeCount * 1.5), groupHeight / 2);
    const minNodeSize = Math.min(groupWidth / (nodeCount * 3), groupHeight / 4);
    const nodeSize = Math.max(minNodeSize, Math.min(maxNodeSize, groupHeight / 3));

    const totalNodeWidth = nodeCount * nodeSize + (nodeCount - 1) * (nodeSize / 2);
    //const startX = (groupWidth - totalNodeWidth) / 2 + nodeSize / 2;
    const startX = (groupWidth - totalNodeWidth) / 2 - nodeSize;
    const yPos = groupHeight / 2;

    const positions = [];
    let xPos = startX;

    for (const node of groupNodes) {
      // @ts-ignore
      positions.push({ x: xPos, y: yPos, size: nodeSize });
      xPos += nodeSize * 2.2; // node 간격을 조정
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
    // @ts-ignore
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

    return path;
  };
  useEffect(() => {
    const loadJson = async () => {
      try {
        const response = elbJson;
        const data = response;

        const svgContainer = document.getElementById('svgContainer');

        while (svgContainer?.firstChild) {
          svgContainer.removeChild(svgContainer.firstChild);
        }

        // @ts-ignore
        svgContainer.style.width = data.width + 'px';
        // @ts-ignore
        svgContainer.style.height = data.height + 'px';
        // svgContainer.style.backgroundImage = `url(${data.backgroundUrl})`;
        // @ts-ignore
        svgContainer.classList.add('svg-container');

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        // @ts-ignore
        svg.setAttribute('width', data.width);
        // @ts-ignore
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
          // @ts-ignore
          rect.setAttribute('width', layout.width);
          // @ts-ignore
          rect.setAttribute('height', layout.height);
          rect.setAttribute('fill', layout.color);
          group.appendChild(rect);

          const text = document.createElementNS(svgNS, 'text');
          // @ts-ignore
          text.setAttribute('x', 5); // 왼쪽에서 약간 패딩
          // @ts-ignore
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
                // @ts-ignore
                x: x + pos.x,
                // @ts-ignore
                y: y + pos.y,
                fontSize: 12,
              };
              switch (node.nodeType) {
                case 'circleNode':
                  nodeElement = createCircleNode(
                    layout.groupName,
                    node.nodeName,
                    // @ts-ignore
                    pos.x,
                    // @ts-ignore
                    pos.y,
                    // @ts-ignore
                    pos.size,
                    node.color || node.fillColor,
                    12
                  );
                  // @ts-ignore
                  computedNode.radius = pos.size / 2;
                  break;
                case 'rectNode':
                  // @ts-ignore
                  nodeElement = createRectNode(layout.groupName, node.nodeName, pos.x, pos.y, pos.size, node.color || node.fillColor, 12);
                  // @ts-ignore
                  computedNode.width = pos.size;
                  // @ts-ignore
                  computedNode.height = pos.size;
                  break;
                case 'imageNode':
                  // @ts-ignore
                  nodeElement = createImageNode(layout.groupName, node.nodeName, pos.x, pos.y, node.imageUrl, pos.size, 12);
                  // @ts-ignore
                  computedNode.width = pos.size;
                  // @ts-ignore
                  computedNode.height = pos.size;
                  break;
                case 'textNode':
                  // @ts-ignore
                  nodeElement = createTextNode(layout.groupName, node.nodeName, pos.x, pos.y, node.text, 12, node.color);
                  break;
              }
              group.appendChild(nodeElement);

              // 노드 JSON에 계산된 속성 추가
              node.x = computedNode.x;
              node.y = computedNode.y;
              // @ts-ignore
              if (computedNode.width) node.width = computedNode.width;
              // @ts-ignore
              if (computedNode.height) node.height = computedNode.height;
              // @ts-ignore
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

        svgContainer?.appendChild(svg);

        // 수정된 JSON을 computed-topology.json 파일로 저장
        const computedData = JSON.stringify(data, null, 2);
        // downloadJson(computedData, "computed-topology.json");
      } catch (error) {
        console.error('Error loading JSON:', error); // 에러 로그 추가
      }
    };

    loadJson();
  }, [elbJson]);

  return (
    <div>
      <h1>InternetElb</h1>
      <div className='panel mt-[16px]' id='svgContainer'></div>
    </div>
  );
};

export default InternetElb;
