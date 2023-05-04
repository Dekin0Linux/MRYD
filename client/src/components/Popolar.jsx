import React from 'react'
import bus from '../assets/bus3.png'
import ticket from '../assets/busticket.png'

function Popolar() {
  return (
    <div className='bg-blue-500 p-10 md:my-48 my-24 '>
        <div className="container md:mx-auto ">
            <div className="md:flex items-center gap-10 text-white ">
                <div className='md:w-1/2 '>
                    <h1 className='md:text-5xl text-2xl font-extrabold md:leading-relaxed '>Book your next Bus<br />ticket with us</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere sequi dolorum nulla impedit quaerat.</p>
                    <div className='md:my-10'>
                        <img src={bus} alt="bus" />
                    </div>
                </div>

                <div className='md:w-1/2 animate-pulse'>
                    <img src={ticket} alt="busticket" className='drop-shadow-xl object-cover'/>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default Popolar