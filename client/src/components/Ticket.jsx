import React from 'react'

function Ticket() {
  return (
    <div className='p-2 shadow-lg border-blue-400 border-2 my-10 rounded'>
        <div className='flex justify-between mx-1'>
            <p>Name : Dekin Faisal</p>
            <p className='font-bold text-red-500'>Ticket ID No.: A34</p>
            <p className='font-bold text-red-500'>SEAT No.: A34</p>
        </div>
        <div className='flex flex-wrap md:gap-10 gap-x-5 gap-y-5 mt-5 bg-slate-100 p-5 rounded'>
            <div>
                <p className='font-semibold'>Depature Date</p>
                <p>2023-05-12</p>
            </div>

            <div>
                <p className='font-semibold'>Depature Time</p>
                <p>12:00AM</p>
            </div>

            <div>
                <p className='font-semibold'>FROM</p>
                <p>ACCRA</p>
            </div>

            <div>
                <p className='font-semibold'>To</p>
                <p>Tamale</p>
            </div>

            <div>
                <p className='font-semibold'>Arrival Date</p>
                <p>2023-04-12</p>
            </div>

            <div>
                <p className='font-semibold'>Arrival Time</p>
                <p>05:00AM</p>
            </div>

        </div>
    </div>
  )
}

export default Ticket