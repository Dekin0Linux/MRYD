import React from 'react'
import {Link} from 'react-scroll'

function ExploreCard({picUrl}) {
  return (
    <div className='shadow-lg bg-red-500 w-[100%] my-3 md:my-0 relative hover:overflow-hidden overflow-hidden rounded-lg text-center' id='searchBox'>
        <img src={picUrl} alt="tm" className='object-cover w-full h-full'/>
        {/* <div className='bg-yellow-500 absolute top-0 left-0 w-full h-full opacity-[0.4]'></div> */}
        <Link className='absolute top-1/2 md:right-[40%] left-[40%] font-bold text-xl text-white bg-blue-400 p-4 rounded-xl shadow-xl hover:bg-black hover:text-yellow-400 transition-all' 
        to="searchBox"
        smooth={true}
        duration={500}
        offset={-100}
        >Book Now</Link>
    </div>
  )
}

export default ExploreCard