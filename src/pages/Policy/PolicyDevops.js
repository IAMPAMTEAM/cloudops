import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AccessPolicyDevopsTable from '@/components/DataTables/AccessPolicyDevopsTable';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
const PolicyDevops = () => {
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(AccessPolicyDevopsTable, {}) }), _jsxs("div", { className: 'grid lg:grid-cols-2 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390, 154, 140, 245, 390, 154],
                                    [410, 165, 305, 164, 245, 245, 305, 164],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['Mgmt', 'Diag', 'Monitor', 'Audit', 'Approval', 'Admin', 'Debug', 'OTPPortal'], colors: ['#7B66FF', '#5FBDFF'] }) }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390],
                                    [410, 165, 405],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['InfraAWS', 'InfraIDC', 'InfraHybrid'], colors: ['#8294C4', '#ACB1D6'] }) })] })] }) }));
};
export default PolicyDevops;
