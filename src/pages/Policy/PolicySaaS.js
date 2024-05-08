import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AccessPolicySaaSTable from '@/components/DataTables/AccessPolicySaaSTable';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
const PolicySaaS = () => {
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(AccessPolicySaaSTable, {}) }), _jsxs("div", { className: 'grid lg:grid-cols-2 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [380, 375, 390, 254],
                                    [410, 465, 105, 104],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['Slack', 'Notion', 'BitBucket', 'Office365'], colors: ['#FF76CE', '#FDFFC2'] }) }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390],
                                    [410, 165, 405],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['InfraAWS', 'InfraIDC', 'InfraHybrid'], colors: ['#5E1675', '#EE4266'] }) })] })] }) }));
};
export default PolicySaaS;
