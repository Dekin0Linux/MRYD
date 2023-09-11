import React from 'react'
import {Link} from 'react-scroll'

function ExploreCard({picUrl}) {
  return (
    <div className='shadow-lg bg-red-500 w-[100%] my-3 md:my-0 relative hover:overflow-hidden overflow-hidden rounded-lg text-center' id='searchBox'>
        <img src={picUrl} alt="tm" className='object-cover w-full h-full'/>
        <div className='absolute  left-0 bottom-0 w-full p-3 text-xl font-semibold bg-white'>
          dfgdfdfgdsf
        </div>
      
    </div>
  )
}

export default ExploreCard