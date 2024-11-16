import { Carousel } from 'react-responsive-carousel';
import img1 from "../images/slider/sliderImg_1.jpg";
import img2 from "../images/slider/sliderImg_2.jpg";
import img3 from "../images/slider/sliderImg_3.jpg";
import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative ">
      <Carousel autoPlay infiniteLoop className='' showStatus={false} showIndicators={false} showThumbs={false} interval={3000}>
        <div>
          <Image priority className='min-h-[20rem]' src={img1} alt="Slide 1" width={1200} height={800} />
        </div>
        <div>
          <Image src={img2} alt="Slide 2" className='min-h-[20rem]' width={1200} height={800} />
        </div>
        <div>
          <Image src={img3} alt="Slide 3" width={1200} className='min-h-[20rem]' height={800} />
        </div>
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
}
