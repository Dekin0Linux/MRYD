import React from 'react'
import bus from '../assets/bus3.png'

function Popolar() {
  return (
    <div className='bg-blue-700 p-10 md:my-48 my-24 '>
        <div className="container mx-auto">
            <div className="flex text-white">
                <div className='md:w-1/2'>
                    <h1 className='md:text-5xl text-2xl font-extrabold md:leading-relaxed '>Book your next Bus<br />ticket with us</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere sequi dolorum nulla impedit quaerat.</p>
                    <div className='md:my-10'>
                        <img src={bus} alt="bus" />
                    </div>
                </div>
               
            </div>
        </div>

    </div>
  )
}

export default Popolar