import React from 'react'
import pic from '../assets/929280.jpg'



import ExploreCard from './ExploreCard'

function Explore() {
  return (
    <div className=' md:mt-40 mt-10 md:container md:mx-auto'>
       <h1 className='text-5xl font-bold text-center md:text-start my-5'>Explore Ghana</h1>
       <div className='md:grid grid-cols-4 md:grid-cols-2 md:gap-5 md:mt-16 px-5 md:px-0'>
            <ExploreCard picUrl={pic}/>
            <ExploreCard picUrl={pic}/>
            <ExploreCard picUrl={pic}/>
            <ExploreCard picUrl={pic}/>
       </div>
    </div>
  )
}

export default Explore