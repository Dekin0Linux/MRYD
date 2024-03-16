import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import SearchInput from '../components/SearchInput'
import Popolar from '../components/Popolar'
import Explore from '../components/Explore'

function Homepage() {
  return (
    <div className=''>
        <Hero/>
        {/* <SearchInput/> */}
        <Features title='Our Features'/>
        <Explore/>
        <Popolar/>
    </div>
  )
}

export default Homepage