import { jsx as _jsx } from "react/jsx-runtime";
import { TopologyRepeat } from '@/components/TopologyRepeat';
import SubnetRoutesSeoulA from '@/assets/images/subnet-routes-seoulA.svg';
import SubnetRoutesSeoulB from '@/assets/images/subnet-routes-seoulB.svg';
import SubnetRoutesSingapore from '@/assets/images/subnet-routes-singapore.svg';
const SubnetRoutes = () => {
    const images = [SubnetRoutesSeoulA, SubnetRoutesSeoulB, SubnetRoutesSingapore];
    const titles = ['Seoul A', 'Seoul B', 'Singapore'];
    return (_jsx("div", { children: _jsx(TopologyRepeat, { imageSrcs: images, title: titles }) }));
};
export default SubnetRoutes;
