import React from 'react'

function ExploreCard({picUrl}) {
  return (
    <div className='shadow-lg bg-red-500 w-[100%] my-3 md:my-0 relative hover:overflow-hidden overflow-hidden rounded-lg text-center'>
        <img src={picUrl} alt="tm" className='object-contain '/>
        <div className='bg-yellow-500 absolute top-0 left-0 w-full h-full opacity-[0.4]'></div>
        <button className='absolute top-1/2 right-[40%] font-bold text-xl text-black bg-yellow-400 p-4 rounded-xl shadow-xl hover:bg-black hover:text-yellow-400'>Book Now</button>
    </div>
  )
}

export default ExploreCard