import { useEffect, useState } from 'react';

interface SubnetsNode {
  nodeIp: string;
  nodeId: string;
  nodeName: string;
  nodeType: string;
  cidr: string;
  cidrName: string;
}

const SubnetsNodes = () => {
  const [fetchData, setFetchData] = useState<SubnetsNode[]>([]);
  const [groupedByCidrData, setGroupedByCidrData] = useState<any>({});
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/flow/nodes.json')
      .then((response) => response.json())
      .then((data) => {
        if (cnt < 1) {
          setFetchData(data);
          setCnt((prev) => prev + 1);
        }
      });
  });

  useEffect(() => {
    const groupedData = {};
    fetchData.forEach((subnetsNode: SubnetsNode) => {
      const { cidr, cidrName, ...nodeInfo } = subnetsNode;
      if (groupedData[cidr]) {
        groupedData[cidr].nodes.push(nodeInfo);
      } else {
        groupedData[cidr] = { cidr, cidrName, nodes: [nodeInfo] };
      }
    });
    setGroupedByCidrData(Object.values(groupedData));
  }, [fetchData]);

  function getNodeIcon(nodeType: string) {
    switch (nodeType) {
      case 'AWS EC2':
        return 'https://icons.terrastruct.com/aws%2FCompute%2F_Instance%2FAmazon-EC2_Instance_light-bg.svg';
      case 'PC':
        return 'https://icons.terrastruct.com/tech%2Flaptop.svg';
      case 'AWS ELB':
        return 'https://icons.terrastruct.com/aws%2FNetworking%20&%20Content%20Delivery%2FElastic-Load-Balancing-ELB_Network-load-balancer_light-bg.svg';
      case 'AWS RDS':
        return 'https://icons.terrastruct.com/aws%2FDatabase%2FAmazon-RDS_Amazon-RDS_instance_light-bg.svg';
      default:
        return '';
    }
  }

  return (
    <div>
      <p className='text-[16px] font-semibold text-[#6667AB]'>Subnets Nodes</p>
      <div className='grid grid-cols-3 gap-[12px]'>
        {groupedByCidrData.map((data: { cidr: string; cidrName: string; nodes: { nodeId: string; nodeIp: string; nodeName: string; nodeType: string }[] }) => (
          // <div key={data.cidr} className='col-span-1 border border-[#E0E0E0] p-4 rounded-md'>
          // <div key={data.cidr} className='col-span-1 border border-[#E0E0E0] p-4 rounded-md max-h-[500px] overflow-y-hidden'>
          <div key={data.cidr} className='panel col-span-1 border border-[#E0E0E0] p-4 rounded-md max-h-[500px] overflow-y-auto'>
            <p className='text-[14px] font-semibold text-[#6667AB]'>{data.cidrName}</p>
            <div className='grid grid-cols-4 gap-4 mt-4'>
              {data.nodes.map((node) => (
                <div key={node.nodeId} className='flex flex-col items-center'>
                  <img src={getNodeIcon(node.nodeType)} alt='node' className='w-6 h-6 mr-2' />
                  <p className='text-[14px] font-semibold text-[#6667AB]'>{node.nodeName}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* {
        groupedByCidrData.map((data: {cidr: string; cidrName: string; nodes: {nodeId: string; nodeIp: string; nodeName: string; nodeType: string}}) => {

        })
       } */}
      </div>
    </div>
  );
};

export default SubnetsNodes;
