// d3 topology에 필요한 함수들을 정의
import type { Node } from './type';
import * as d3 from 'd3';

// vertical topology일 경우와 horizontal topology일 경우 구분
interface Data {
  nodes: Node[];
  links: [];
}

// 1. vertical topology
export const createGroups = (
  data: Data,
  margin: { top: number; right: number; bottom: number; left: number },
  width: number,
  height: number,
  boxPadding: number,
  nodeWidth: number,
  nodeHeight: number
) => {
  const topNodes = data.nodes.filter((node) => node.group === 'top');
  const bottomNodes = data.nodes.filter((node) => node.group === 'bottom');

  const maxNodes = Math.max(topNodes.length, bottomNodes.length);

  // 💡 개수에 따라서 box의 너비를 조절
  if (maxNodes > 10) {
    nodeWidth = nodeHeight = 48 * (10 / maxNodes);
  }
  const topBoxWidth = topNodes.length * (nodeWidth + boxPadding) + boxPadding;
  const bottomBoxWidth = bottomNodes.length * (nodeWidth + boxPadding) + boxPadding;
  const boxHeight = nodeHeight + 3 * boxPadding;
};

export const createToGroup = () => {};
