import React from 'react'

function Ticket({passenger,ticket}) {
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
                <p>{ticket[0].bus_id.depature_time}</p>
            </div>

            <div>
                <p className='font-semibold'>Depature Time</p>
                <p>{ticket[0].bus_id.depature_time}</p>
            </div>

            <div>
                <p className='font-semibold'>FROM</p>
                <p className='capitalize'>{ticket[0].bus_id.depature_loc}</p>
            </div>

            <div>
                <p className='font-semibold'>To</p>
                <p>{ticket[0].bus_id.arrival_loc}</p>
            </div>

            <div>
                <p className='font-semibold'>Arrival Date</p>
                <p>{ticket[0].bus_id.arrival_date}</p>
            </div>

            <div>
                <p className='font-semibold'>Arrival Time</p>
                <p>{ticket[0].bus_id.arrival_time}</p>
            </div>

        </div>
    </div>
  )
}

export default Ticket