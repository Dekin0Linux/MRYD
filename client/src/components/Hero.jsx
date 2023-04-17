import React from 'react'
import bus1 from '../assets/bus1.png'


function Hero() {
  return (
    <div className=''>
        <div className='w-full md:h-[65vh] h-[50vh] bg-blue-200 px-4 md:px-0 relative'>
            <div className='md:w-2/3 mx-auto'>
                <img src={bus1} alt="bus" className='object-cover'/>
            </div>

        </div>
        
    </div>
  )
}

export default Hero