import React from 'react'
// import ticket from '../assets/busticket.png'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Success() {

  const navigate = useNavigate()
  return (
    <div className=''>
      <div className='container md:mx-auto mx-10 md:flex lg:gap-10 gap-y-20 py-5'>
        <div className='w-1/2 text-center'>
          <BsFillCheckCircleFill size={50} color='green' className='w-full my-5'/>
          <p className='font-semibold text-xl'>Booking Successful</p>
          <p>Your ticket would be sent your email</p>
          <hr className='my-5'/>
          <div>
            {/* <p>Booking # : </p> */}
            <button onClick={()=>navigate('/',{replace:true})}>Back to Home</button>
          </div>
        </div>

        
        
      </div>
    </div>
  )
}

export default Success