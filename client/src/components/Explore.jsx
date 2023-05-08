import React from 'react'
import pic from '../assets/929280.jpg'



import ExploreCard from './ExploreCard'

function Explore() {
  return (
    <div className=' md:mt-40 mt-10 md:container md:mx-auto'>
       <h1 className='text-5xl font-bold text-center md:text-start my-5'>Explore Ghana</h1>
       <div className='md:grid grid-cols-4 md:grid-cols-2 md:gap-5 md:mt-16 px-5 md:px-0'>
            <ExploreCard picUrl={'https://visitghana.com/wp-content/uploads/2018/06/North-1.jpg'}/>
            <ExploreCard picUrl={'https://grassroottours.com/wp-content/uploads/2019/05/IMG_5843-830x554.jpg'}/>
            <ExploreCard picUrl={'https://grassroottours.com/wp-content/uploads/2019/05/ls-slider-5-slide-1-608x342.jpg'}/>
            <ExploreCard picUrl={'https://upload.wikimedia.org/wikipedia/commons/6/69/Elefant_Ghana.jpg'}/>
       </div>
    </div>
  )
}

export default Explore