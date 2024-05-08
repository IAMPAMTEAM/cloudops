import { jsx as _jsx } from "react/jsx-runtime";
import { TopologyRepeat } from '@/components/TopologyRepeat';
import VPCPeeringSeoul from '@/assets/images/vpc-peering-seoul.svg';
import VPCPeeringVirginia from '@/assets/images/vpc-peering-virginia.svg';
const VPCPeering = () => {
    const images = [VPCPeeringSeoul, VPCPeeringVirginia];
    const titles = ['Seoul', 'Virginia'];
    return (_jsx("div", { children: _jsx(TopologyRepeat, { imageSrcs: images, title: titles }) }));
};
export default VPCPeering;
