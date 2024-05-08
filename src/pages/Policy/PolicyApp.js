import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AccessPolicyAppTable from '@/components/DataTables/AccessPolicyAppTable';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
const PolicyApp = () => {
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(AccessPolicyAppTable, {}) }), _jsxs("div", { className: 'grid lg:grid-cols-2 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390, 154],
                                    [410, 165, 305, 164],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['Jira', 'ERP', 'Jenkins', 'Git'], colors: ['#B2B377', '#D2D180'] }) }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: [
                                    [280, 175, 390],
                                    [410, 165, 405],
                                ], title: 'Allowed Users Compare - Radar Chart', categories: ['InfraAWS', 'InfraIDC', 'InfraHybrid'], colors: ['#FFCACC', '#D4E2D4'] }) })] })] }) }));
};
export default PolicyApp;
