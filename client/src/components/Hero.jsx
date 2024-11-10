import React from 'react'
import bus1 from '../assets/bus1.png'
import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper';
import SearchInput from './SearchInput';


//md:w-2/3
function Hero() {
  return (
    <div className='md:h-[70vh] my-10 relative container mx-auto shadow-lg rounded-lg bg-blue-50'>

      <div className='w-full h-full overflow-hidden md:flex items-center'>
        <div className='flex-1 flex flex-col lg:gap-10 lg:p-20 gap-5 md:p-10 p-5 text-center md:text-start'>
          <h1 className='font-semibold leading-relaxed lg:text-7xl md:text-4xl text-2xl text-blue-700'>Book your next bus <br /> Ticket with us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nisi explicabo pariatur, suscipit ipsa optio. Atque illo quos magni fugit?</p>
        </div>
        <div className='flex-1 w-full h-full hidden md:block '>
          <img src={banner1} alt="slide1" className='object-contain w-full h-full'/>
        </div>

      </div>
        {/* <Swiper className='w-full h-full '
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
        </Swiper> */}

          <div className='md:absolute w-[90%] mx-auto inset-x-0 z-50 bottom-[-30px]'>
            <SearchInput/>
          </div>


        
    </div>
  )
}

export default Hero