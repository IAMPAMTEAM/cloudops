import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
import AccessPolicyPortalTable from '@/components/DataTables/AccessPolicyPortalTable';
const Portal = () => {
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(AccessPolicyPortalTable, {}) }), _jsxs("div", { className: 'grid lg:grid-cols-2 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390, 154, 140, 245, 390, 154],
                                    [410, 165, 305, 164, 245, 245, 305, 164],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['Mgmt', 'Diag', 'Monitor', 'Audit', 'Approval', 'Admin', 'Debug', 'OTPPortal'], colors: ['#FFBB70', '#FFEC9E'] }) }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390],
                                    [410, 165, 405],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['InfraAWS', 'InfraIDC', 'InfraHybrid'], colors: ['#C40C0C', '#FF6500'] }) })] })] }) }));
};
export default Portal;
