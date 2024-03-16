import React from 'react'
import bus1 from '../assets/bus1.png'
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper';
import SearchInput from './SearchInput';


//md:w-2/3
function Hero() {
  return (
    <div className='md:h-[70vh] mb-20 relative'>
        <Swiper className='w-full h-full '
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
              <div className='w-[100%] h-[100%]'>
                  <img src={banner1} alt="slide1" className='w-full h-full'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full h-[100%]'>
                  <img src={banner2} alt="slide6" className='w-full h-full'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full h-[100%]'>
                  <img src={banner1} alt="slide4" className='w-full h-full'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full h-[100%]'>
                <img src={banner2} alt="slide6" className='w-full h-full'/>
              </div>
            </SwiperSlide>
        </Swiper>

          <div className='md:absolute w-full inset-x-0 z-50 bottom-[-30px]'>
            <SearchInput/>
          </div>


        
    </div>
  )
}

export default Hero