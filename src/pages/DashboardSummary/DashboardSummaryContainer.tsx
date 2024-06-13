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
import DashboardBanner from '@/assets/images/dashboard_main.svg';
import DashboardTop from '@/assets/images/dashboard_top.svg';
import DashboardBottom from '@/assets/images/dashboard_bottom.svg';
import './arrow.scss';

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
      <img src={DashboardBanner} alt='' />
      <img className='mt-[1.2rem]' src={DashboardTop} alt='' />

      <div className='relative'>
        <div className='arrow arrow--left absolute top-1/2 left-6 transform -translate-y-1/2 ' onClick={handlePrevClick}>
          <span></span>
        </div>
        <div className='arrow arrow--right absolute top-1/2 right-6 transform -translate-y-1/2' onClick={handleNextClick}>
          <span></span>
        </div>
        <div className='relative w-[90%] overflow-hidden mt-8 mb-8 ml-auto mr-auto'>
          <div className='flex transition-transform duration-500 gap-[24px]' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
              <div className='w-1/4 flex-shrink-0 panel' key={index}>
                <img src={image} alt={`Slide ${index}`} className='w-full' />
              </div>
            ))}
          </div>
        </div>
      </div>
      <img src={DashboardBottom} alt='' />
      <div className='relative'>
        <div className='arrow arrow--left absolute top-1/2 left-6 transform -translate-y-1/2 ' onClick={handlePrevClick}>
          <span></span>
        </div>
        <div className='arrow arrow--right absolute top-1/2 right-6 transform -translate-y-1/2' onClick={handleNextClick}>
          <span></span>
        </div>
        <div className='relative w-[90%] overflow-hidden mt-8 mb-8 ml-auto mr-auto'>
          <div className='flex transition-transform duration-500 gap-[24px]' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {networkFlowImages.map((image, index) => (
              <div className='w-1/4 flex-shrink-0 panel' key={index}>
                <img src={image} alt={`Slide ${index}`} className='w-full' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryContainer;
