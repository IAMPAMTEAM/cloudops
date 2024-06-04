import CloudOpsTop from '@/assets/images/CloudOps-top.svg';
import CloudOpsBottom from '@/assets/images/CloudOps-bottom.svg';
import elbSeoul from '@/assets/images/elb-seoul.svg';
import regionalResourcesOregon from '@/assets/images/regional-resources-oregon.svg';
import subnetRoutesSeoulA from '@/assets/images/subnet-routes-seoulA.svg';
import vpcGatewaysSeoul from '@/assets/images/vpc-gateways-seoul.svg';
import subnetSeoulA from '@/assets/images/subnet-seoulA.svg';
import subnetSeoulB from '@/assets/images/subnet-seoulB.svg';
import vpcGatewayVirginia from '@/assets/images/vpc-gateways-virginia.svg';
import networkFlowImage1 from '@/assets/images/networkflow-image1.png';
import networkFlowImage2 from '@/assets/images/networkflow-image2.png';
import networkFlowImage3 from '@/assets/images/networkflow-image3.png';
import networkFlowImage4 from '@/assets/images/networkflow-image4.png';
import { useState } from 'react';

const images = [elbSeoul, regionalResourcesOregon, subnetRoutesSeoulA, vpcGatewaysSeoul, subnetSeoulA, subnetSeoulB, vpcGatewayVirginia, vpcGatewayVirginia, vpcGatewayVirginia, vpcGatewayVirginia];
const networkFlowImages = [networkFlowImage1, networkFlowImage2, networkFlowImage3, networkFlowImage4, networkFlowImage2, networkFlowImage3];

const DashboardSummaryContainer = () => {
  const totalScreens = Math.ceil(images.length / 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalScreens - 1 ? totalScreens - 1 : prevIndex + 1));
  };

  return (
    <div className='w-[1550px]'>
      <img src={CloudOpsTop} alt='' />

      <div className='relative w-full overflow-hidden mt-8 mb-8'>
        <div className='flex transition-transform duration-500 gap-[24px]' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div className='w-1/4 flex-shrink-0 panel' key={index}>
              <img src={image} alt={`Slide ${index}`} className='w-full' />
            </div>
          ))}
        </div>
        <button className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full' onClick={handlePrevClick}>
          &#9664;
        </button>
        <button className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full' onClick={handleNextClick}>
          &#9654;
        </button>
      </div>
      <img src={CloudOpsBottom} alt='' />
      <div className='relative w-full overflow-hidden mt-8 mb-8'>
        <div className='flex transition-transform duration-500 gap-[24px]' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {networkFlowImages.map((image, index) => (
            <div className='w-1/4 flex-shrink-0 panel' key={index}>
              <img src={image} alt={`Slide ${index}`} className='w-full' />
            </div>
          ))}
        </div>
        <button className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full' onClick={handlePrevClick}>
          &#9664;
        </button>
        <button className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full' onClick={handleNextClick}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default DashboardSummaryContainer;
