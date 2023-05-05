import React from 'react'
import ticket from '../assets/busticket.png'
import {BsFillCheckCircleFill} from 'react-icons/bs'

function Success() {
  return (
    <div className=''>
      <div className='container md:mx-auto mx-10 md:flex lg:gap-10 gap-y-20 py-5'>
        <div className='w-1/2 text-center'>
          <BsFillCheckCircleFill size={50} color='green' className='w-full my-5'/>
          <p className='font-semibold text-xl'>Booking Successful</p>
          <hr className='my-5'/>
          <div>
            <p>Booking # : </p>
          </div>
        </div>

        <div className='md:w-1/2'>
          <img src={ticket} alt="busticket" className='object-contain drop-shadow-xl w-[0%]'/>

          <div className='shadow-xl rounded-xl overflow-hidden bg-white w-full'>
            <div className='bg-blue-600 text-right px-10 py-5 text-white font-bold text-2xl'>Bus Name : VVIP</div>
            <div className='flex bg-white h-auto'>
              <div className='flex-1 mx-10 my-5 border-r-4 border-black border-dashed'>
                <div className=''>
                  <p>Passenger Name</p>
                  <p className='font-bold'>Dekin Faisal</p>
                  <hr className='mt-6'/>
                </div>
                <div className='inline-flex flex-wrap gap-20 my-2 text-center'>
                  <div className=''>
                    <p>Depature Date</p>
                    <p className='font-semibold'>2023-05-15</p>
                  </div>

                  <div className=''>
                    <p>Depature Time</p>
                    <p className='font-semibold'>05:50 am</p>
                  </div>

                  <div className=''>
                    <p>From</p>
                    <p className='font-semibold'>ACCRA</p>
                  </div>
                </div>

                <div className='inline-flex flex-wrap gap-20 my-2 text-center'>
                  <div className=''>
                    <p>Arrival Date</p>
                    <p className='font-semibold'>2023-05-12</p>
                  </div>

                  <div className=''>
                    <p>Arrival Time</p>
                    <p className='font-semibold'>04:50 am</p>
                  </div>

                  <div className=''>
                    <p>To </p>
                    <p className='font-semibold'>KUMASI</p>
                  </div>
                </div>


                <div className='inline-flex flex-wrap gap-20 my-2 text-center'>
                  <div className=''>
                    <p>Station</p>
                    <p className='font-semibold'>Circle (Tip toe lane)</p>
                  </div>

                  <div className=''>
                    <p>Seat No.</p>
                    <p className='font-semibold'>05:50 am</p>
                  </div>

                  <div className=''>
                    <p>Bus No.</p>
                    <p className='font-semibold'>ACCRA</p>
                  </div>
                </div>
                
              </div>

              <div className='flex-2 mx-10 my-10'>
                <p>SEAT : 45</p>
              </div>
            </div>
            <div className='bg-blue-600 text-right px-10 py-2 text-white'></div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Success