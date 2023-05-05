import React from 'react'
import bus1 from '../assets/bus1.png'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper';


//md:w-2/3
function Hero() {
  return (
    <div className=''>
        <Swiper className='w-full md:h-[65vh] h-[40vh]  relative '
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
              <div className='w-[100%] md:h-[65vh] h-[40vh]'>
                  <img src={'https://previews.123rf.com/images/nattyblissful/nattyblissful1911/nattyblissful191100130/134201092-girl-sitting-on-the-couch-and-orders-tickets-online-airplane-bus-train-cruise-ship-railway.jpg'} alt="slide1" className='w-full h-full md:object-cover object-contain'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full md:h-[65vh] h-[40vh]'>
                  <img src={bus1} alt="slide6" className='object-conatin w-full h-[65vh]'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full md:h-[65vh] h-[40vh]'>
                  <img src={'https://previews.123rf.com/images/nattyblissful/nattyblissful1911/nattyblissful191100130/134201092-girl-sitting-on-the-couch-and-orders-tickets-online-airplane-bus-train-cruise-ship-railway.jpg'} alt="slide4" className='object-contain w-full h-[65vh]'/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='md:w-full md:h-[65vh] h-[40vh]'>
                  hello
              </div>
            </SwiperSlide>

        </Swiper>
        
    </div>
  )
}

export default Hero