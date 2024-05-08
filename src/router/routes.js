import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from 'react';
const Chart = lazy(() => import('@/pages/Chart'));
const Test = lazy(() => import('@/pages/Test'));
const UserTest = lazy(() => import('@/pages/UserTest'));
const RegionalResources = lazy(() => import('@/pages/Topology/RegionalResources'));
const Subnets = lazy(() => import('@/pages/Topology/Subnets'));
const SubnetRoutes = lazy(() => import('@/pages/Topology/SubnetRoutes'));
const VPCGateways = lazy(() => import('@/pages/Topology/VPCGateways'));
const LoadBalancers = lazy(() => import('@/pages/Topology/LoadBalancers'));
const VPCPeering = lazy(() => import('@/pages/Topology/VPCPeering'));
const Approval = lazy(() => import('@/pages/Approval'));
const EntryContainer = lazy(() => import('@/pages/Entry/EntryContainer'));
const ChatContainer = lazy(() => import('@/pages/Chat/ChatContainer'));
const HR = lazy(() => import('@/pages/Users/HR'));
const UsersDevOps = lazy(() => import('@/pages/Users/UsersDevOps'));
const UsersApp = lazy(() => import('@/pages/Users/UsersApp'));
const UsersSaaS = lazy(() => import('@/pages/Users/UsersSaaS'));
const AssetsServerAWS = lazy(() => import('@/pages/Assets/AssetsServerAWS'));
const AssetsServerOnpremise = lazy(() => import('@/pages/Assets/ServerOnpremise'));
const AssetsServerAccessControl = lazy(() => import('@/pages/Assets/ServerAccessControl'));
const AssetsDBAccessControl = lazy(() => import('@/pages/Assets/DBAccessControl'));
const AssetsDBAWSRDS = lazy(() => import('@/pages/Assets/DBAWSRDS'));
const AssetsDBOnpremise = lazy(() => import('@/pages/Assets/DBOnpremise'));
const SecurityGroup = lazy(() => import('@/pages/SecurityGroup/SecurityGroup'));
const PolicyPortal = lazy(() => import('@/pages/Policy/Portal'));
const PolicyDevops = lazy(() => import('@/pages/Policy/PolicyDevops'));
const PolicyApp = lazy(() => import('@/pages/Policy/PolicyApp'));
const PolicySaaS = lazy(() => import('@/pages/Policy/PolicySaaS'));
const Compliance = lazy(() => import('@/pages/Compliance'));
const WorkflowMain = lazy(() => import('@/pages/Workflow/WorkflowMain'));
const routes = [
    {
        path: '/',
        layout: 'blank',
        // element: <EntryContainer />,
    },
    {
        path: '/entry',
        element: _jsx(EntryContainer, {}),
        layout: 'blank',
    },
    {
        path: '/chart',
        element: _jsx(Chart, {}),
        layout: 'default',
    },
    {
        path: '/test',
        element: _jsx(Test, {}),
        layout: 'default',
    },
    {
        path: '/user-test',
        element: _jsx(UserTest, {}),
        layout: 'default',
    },
    {
        path: '/regional-resources',
        element: _jsx(RegionalResources, {}),
        layout: 'default',
    },
    {
        path: '/subnets',
        element: _jsx(Subnets, {}),
        layout: 'default',
    },
    {
        path: '/subnet-routes',
        element: _jsx(SubnetRoutes, {}),
        layout: 'default',
    },
    {
        path: '/vpc-gateways',
        element: _jsx(VPCGateways, {}),
        layout: 'default',
    },
    {
        path: '/load-balancers',
        element: _jsx(LoadBalancers, {}),
        layout: 'default',
    },
    {
        path: '/vpc-peering',
        element: _jsx(VPCPeering, {}),
        layout: 'default',
    },
    {
        path: '/approval',
        element: _jsx(Approval, {}),
        layout: 'default',
    },
    {
        path: '/users/hr',
        layout: 'default',
        element: _jsx(HR, {}),
    },
    {
        path: '/users/dev-ops',
        layout: 'default',
        element: _jsx(UsersDevOps, {}),
    },
    {
        path: '/users/app',
        layout: 'default',
        element: _jsx(UsersApp, {}),
    },
    {
        path: '/users/saas',
        layout: 'default',
        element: _jsx(UsersSaaS, {}),
    },
    {
        path: '/chat',
        layout: 'default',
        element: _jsx(ChatContainer, {}),
    },
    {
        path: '/assets/server-aws',
        layout: 'default',
        element: _jsx(AssetsServerAWS, {}),
    },
    {
        path: '/assets/server-onpremise',
        layout: 'default',
        element: _jsx(AssetsServerOnpremise, {}),
    },
    {
        path: '/assets/server-access-control',
        layout: 'default',
        element: _jsx(AssetsServerAccessControl, {}),
    },
    {
        path: '/assets/db-access-control',
        layout: 'default',
        element: _jsx(AssetsDBAccessControl, {}),
    },
    {
        path: '/assets/db-aws-rds',
        layout: 'default',
        element: _jsx(AssetsDBAWSRDS, {}),
    },
    {
        path: '/assets/db-onpremise',
        layout: 'default',
        element: _jsx(AssetsDBOnpremise, {}),
    },
    {
        path: '/policy/portal',
        layout: 'default',
        element: _jsx(PolicyPortal, {}),
    },
    {
        path: '/policy/dev-ops',
        layout: 'default',
        element: _jsx(PolicyDevops, {}),
    },
    {
        path: '/policy/app',
        layout: 'default',
        element: _jsx(PolicyApp, {}),
    },
    {
        path: '/policy/saas',
        layout: 'default',
        element: _jsx(PolicySaaS, {}),
    },
    {
        path: '/compliance',
        layout: 'default',
        element: _jsx(Compliance, {}),
    },
    {
        path: '/workflow/main',
        layout: 'default',
        element: _jsx(WorkflowMain, {}),
    },
    {
        path: '/sg',
        layout: 'default',
        element: _jsx(SecurityGroup, {}),
    },
];
export { routes };
