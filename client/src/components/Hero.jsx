import React from 'react'
import bus1 from '../assets/bus1.png'
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper';


//md:w-2/3
function Hero() {
  return (
    <div className='p-3 overflow-hidden'>
        <Swiper className='w-full relative rounded-xl'
            // spaceBetween={50}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            slidesPerView={1}
            onSlideChange={() => {}}
            onSwiper={(swiper) => swiper}
        >
            
            <SwiperSlide>
              <div className='w-[100%] '>
                  <img src={banner1} alt="slide1" className='w-full h-full object-contain'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full '>
                  <img src={banner2} alt="slide6" className='w-full h-full  object-contain'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full '>
                  <img src={banner1} alt="slide4" className='w-full h-full  object-contain'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full '>
                <img src={banner2} alt="slide6" className='w-full h-full  object-contain'/>
              </div>
            </SwiperSlide>

        </Swiper>
        
    </div>
  )
}

export default Hero