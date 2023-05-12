import React from 'react'
// import ticket from '../assets/busticket.png'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import gif from '../assets/gifSuccess.gif'

function Success() {

  const navigate = useNavigate()
  return (
    <div className=' flex justify-center w-full'>
      <div className='md:flex lg:gap-10 gap-y-20 py-5'>
        <div className='text-center'>
          <img src={gif} alt="" />
          <p className='font-semibold text-xl text-green-600'>Booking Successful</p>
          <p>Your ticket info would be sent to your email</p>
          <hr className='my-5'/>
          <div>
            {/* <p>Booking # : </p> */}
            <button onClick={()=>navigate('/',{replace:true})} className='bg-blue-400 text-white p-2 shadow-xl'>Back to Home</button>
          </div>
        </div>

  
      </div>
    </div>
  )
}

export default Success