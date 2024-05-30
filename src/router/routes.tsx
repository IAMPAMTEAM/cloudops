import { lazy } from 'react';
import { useSelector } from 'react-redux';
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

const SubnetFlow = lazy(() => import('@/pages/NetworkFlow/SubnetFlow'));
const VPCFlow = lazy(() => import('@/pages/NetworkFlow/VPCFlow'));

const Landing = lazy(() => import('@/pages/Landing/LandingContainer'));

const Governance = lazy(() => import('@/pages/Governance/Governance'));
const Resources = lazy(() => import('@/pages/Resources/Resources'));
const Cost = lazy(() => import('@/pages/Cost/Cost'));

const routes = [
  {
    path: '/',
    layout: 'blank',
  },
  {
    path: '/landing',
    element: <Landing />,
    layout: 'blank',
  },
  {
    path: '/entry',
    element: <EntryContainer />,
    layout: 'blank',
  },
  {
    path: '/chart',
    element: <Chart />,
    layout: 'default',
  },
  {
    path: '/test',
    element: <Test />,
    layout: 'default',
  },
  {
    path: '/user-test',
    element: <UserTest />,
    layout: 'default',
  },
  {
    path: '/regional-resources',
    element: <RegionalResources />,
    layout: 'default',
  },
  {
    path: '/subnets',
    element: <Subnets />,
    layout: 'default',
  },
  {
    path: '/subnet-routes',
    element: <SubnetRoutes />,
    layout: 'default',
  },
  {
    path: '/vpc-gateways',
    element: <VPCGateways />,
    layout: 'default',
  },
  {
    path: '/load-balancers',
    element: <LoadBalancers />,
    layout: 'default',
  },
  {
    path: '/vpc-peering',
    element: <VPCPeering />,
    layout: 'default',
  },
  {
    path: '/approval',
    element: <Approval />,
    layout: 'default',
  },
  {
    path: '/users/hr',
    layout: 'default',
    element: <HR />,
  },
  {
    path: '/users/dev-ops',
    layout: 'default',
    element: <UsersDevOps />,
  },
  {
    path: '/users/app',
    layout: 'default',
    element: <UsersApp />,
  },
  {
    path: '/users/saas',
    layout: 'default',
    element: <UsersSaaS />,
  },
  {
    path: '/chat',
    layout: 'default',
    element: <ChatContainer />,
  },
  {
    path: '/assets/server-aws',
    layout: 'default',
    element: <AssetsServerAWS />,
  },
  {
    path: '/assets/server-onpremise',
    layout: 'default',
    element: <AssetsServerOnpremise />,
  },
  {
    path: '/assets/server-access-control',
    layout: 'default',
    element: <AssetsServerAccessControl />,
  },
  {
    path: '/assets/db-access-control',
    layout: 'default',
    element: <AssetsDBAccessControl />,
  },
  {
    path: '/assets/db-aws-rds',
    layout: 'default',
    element: <AssetsDBAWSRDS />,
  },
  {
    path: '/assets/db-onpremise',
    layout: 'default',
    element: <AssetsDBOnpremise />,
  },
  {
    path: '/policy/portal',
    layout: 'default',
    element: <PolicyPortal />,
  },
  {
    path: '/policy/dev-ops',
    layout: 'default',
    element: <PolicyDevops />,
  },
  {
    path: '/policy/app',
    layout: 'default',
    element: <PolicyApp />,
  },
  {
    path: '/policy/saas',
    layout: 'default',
    element: <PolicySaaS />,
  },
  {
    path: '/compliance',
    layout: 'default',
    element: <Compliance />,
  },
  {
    path: '/workflow/main',
    layout: 'default',
    element: <WorkflowMain />,
  },
  {
    path: '/sg',
    layout: 'default',
    element: <SecurityGroup />,
  },
  {
    path: '/network-flow/subnet',
    layout: 'default',
    element: <SubnetFlow />,
  },
  {
    path: '/network-flow/vpc',
    layout: 'default',
    element: <VPCFlow />,
  },
  {
    path: '/governance',
    layout: 'default',
    element: <Governance />,
  },
  {
    path: '/resources',
    layout: 'default',
    element: <Resources />,
  },
  {
    path: '/cost',
    layout: 'default',
    element: <Cost />,
  },
];

export { routes };
