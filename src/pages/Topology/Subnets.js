import { jsx as _jsx } from "react/jsx-runtime";
import { TopologyRepeat } from '@/components/TopologyRepeat';
import SubnetSeoulA from '@/assets/images/subnet-seoulA.svg';
import SubnetSeoulB from '@/assets/images/subnet-seoulB.svg';
import SubnetSingapore from '@/assets/images/subnet-singapore.svg';
import SubnetVirginia from '@/assets/images/subnet-virginia.svg';
const Subnets = () => {
    const images = [SubnetSeoulA, SubnetSeoulB, SubnetSingapore, SubnetVirginia];
    const titles = ['Seoul A', 'Seoul B', 'Singapore', 'Virginia'];
    return (_jsx("div", { children: _jsx(TopologyRepeat, { imageSrcs: images, title: titles }) }));
};
export default Subnets;
