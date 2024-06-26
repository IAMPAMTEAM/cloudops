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
const InternetELB = lazy(() => import('@/pages/Topology/InternetElb'));
const SubnetsNodes = lazy(() => import('@/pages/Topology/SubnetsNodes'));
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
const EventViewer = lazy(() => import('@/pages/EventViewer/EventViewer'));

const PolicyPortal = lazy(() => import('@/pages/Policy/Portal'));
const PolicyDevops = lazy(() => import('@/pages/Policy/PolicyDevops'));
const PolicyApp = lazy(() => import('@/pages/Policy/PolicyApp'));
const PolicySaaS = lazy(() => import('@/pages/Policy/PolicySaaS'));

// const Compliance = lazy(() => import('@/pages/Compliance'));

const WorkflowMain = lazy(() => import('@/pages/Workflow/WorkflowMain'));

const SubnetFlow = lazy(() => import('@/pages/NetworkFlow/SubnetFlow/SubnetFlow'));
const VPCFlow = lazy(() => import('@/pages/NetworkFlow/VPCFlow/VPCFlow'));
const InternalElbFlow = lazy(() => import('@/pages/NetworkFlow/InternalElbFlow/InternalElbFlow'));
const InternetElbFlow = lazy(() => import('@/pages/NetworkFlow/InternetElbFlow/InternetElbFlow'));

// const Landing = lazy(() => import('@/pages/Landing/LandingContainer'));

// @ts-ignore
const Governance = lazy(() => import('@/pages/Governance/Governance'));
// @ts-ignore
const Resources = lazy(() => import('@/pages/Resources/Resources'));
const Cost = lazy(() => import('@/pages/Cost/Cost'));
// @ts-ignore
const CostRegionDaily = lazy(() => import('@/pages/Cost/CostRegion/CostRegionDaily'));
// @ts-ignore
const CostRegionMonthly = lazy(() => import('@/pages/Cost/CostRegion/CostRegionMonthly'));
// @ts-ignore
const CostServiceDaily = lazy(() => import('@/pages/Cost/CostService/CostServiceDaily'));
// @ts-ignore
const CostServiceMonthly = lazy(() => import('@/pages/Cost/CostService/CostServiceMonthly'));
// @ts-ignore
const CostAccountDaily = lazy(() => import('@/pages/Cost/CostAccount/CostAccountDaily'));
// @ts-ignore
const CostAccountMonthly = lazy(() => import('@/pages/Cost/CostAccount/CostAccountMonthly'));

const DashboardOverview = lazy(() => import('@/pages/DashboardOverview/DashboardOverviewContainer'));
const DashboardSummary = lazy(() => import('@/pages/DashboardSummary/DashboardSummaryContainer'));

const Credentials = lazy(() => import('@/pages/Credentials/Credentials'));
const Compliance = lazy(() => import('@/pages/Compliance/ComplianceContainer'));
const Monitor = lazy(() => import('@/pages/Monitor/MonitorContainer'));
const Log = lazy(() => import('@/pages/Log/Log'));
const Chatbot = lazy(() => import('@/pages/Chatbot/ChatbotContainer'));
const Admin = lazy(() => import('@/pages/Admin/AdminContainer'));

// @ts-ignore
const NetworkCidr = lazy(() => import('@/pages/Network/NetworkCidr/NetworkCidr'));
// @ts-ignore
const NetworkNodes = lazy(() => import('@/pages/Network/NetworkNodes/NetworkNodes'));
// @ts-ignore
const NetworkPorts = lazy(() => import('@/pages/Network/NetworkPorts/NetworkPorts'));

const routes = [
  {
    path: '/',
    layout: 'blank',
  },
  // {
  //   path: '/landing',
  //   element: <Landing />,
  //   layout: 'blank',
  // },
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
    path: '/internet-elb',
    element: <InternetELB />,
    layout: 'default',
  },
  {
    path: '/subnets-nodes',
    element: <SubnetsNodes />,
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
    path: '/network-flow/internal-elb',
    layout: 'default',
    element: <InternalElbFlow />,
  },
  {
    path: '/network-flow/internet-elb',
    layout: 'default',
    element: <InternetElbFlow />,
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
  // Cost Region
  {
    path: '/cost/region/daily',
    layout: 'default',
    element: <CostRegionDaily />,
  },
  {
    path: '/cost/region/monthly',
    layout: 'default',
    element: <CostRegionMonthly />,
  },
  // Cost Service
  {
    path: '/cost/service/daily',
    layout: 'default',
    element: <CostServiceDaily />,
  },
  {
    path: '/cost/service/monthly',
    layout: 'default',
    element: <CostServiceMonthly />,
  },
  // Cost Account
  {
    path: '/cost/account/daily',
    layout: 'default',
    element: <CostAccountDaily />,
  },
  {
    path: '/cost/account/monthly',
    layout: 'default',
    element: <CostAccountMonthly />,
  },
  {
    path: '/dashboard-overview',
    layout: 'default',
    element: <DashboardOverview />,
  },
  {
    path: '/dashboard-summary',
    layout: 'default',
    element: <DashboardSummary />,
  },
  {
    path: '/event-viewer',
    layout: 'default',
    element: <EventViewer />,
  },
  {
    path: '/monitor',
    layout: 'default',
    element: <Monitor />,
  },
  {
    path: '/credentials',
    layout: 'default',
    element: <Credentials />,
  },
  {
    path: '/log',
    layout: 'default',
    element: <Log />,
  },
  {
    path: '/chatbot',
    layout: 'default',
    element: <Chatbot />,
  },
  {
    path: '/admin',
    layout: 'default',
    element: <Admin />,
  },
  {
    path: '/network/cidr',
    layout: 'default',
    element: <NetworkCidr />,
  },
  {
    path: '/network/ports',
    layout: 'default',
    element: <NetworkPorts />,
  },
  {
    path: '/network/nodes',
    layout: 'default',
    element: <NetworkNodes />,
  },
];

export { routes };
