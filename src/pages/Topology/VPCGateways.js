import { jsx as _jsx } from "react/jsx-runtime";
import { TopologyRepeat } from '@/components/TopologyRepeat';
import VPCGatewaysSeoul from '@/assets/images/vpc-gateways-seoul.svg';
import VPCGatewaysVirginia from '@/assets/images/vpc-gateways-virginia.svg';
const VPCGateways = () => {
    const images = [VPCGatewaysSeoul, VPCGatewaysVirginia];
    const titles = ['Seoul', 'Virginia'];
    return (_jsx("div", { children: _jsx(TopologyRepeat, { imageSrcs: images, title: titles }) }));
};
export default VPCGateways;
