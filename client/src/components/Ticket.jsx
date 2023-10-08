import React from 'react'

function Ticket({passenger,ticket}) {
    console.log(ticket)
  return (
    <div className='p-2 py-5 shadow-lg border-blue-400 border-2 my-10 rounded bg-white'>
        <div className='flex flex-wrap justify-between items-center mx-1 gap-y-5'>
            <p className='font-semibold'>Name : {passenger.fullname}</p>
            <p className='font-bold text-red-500'>Ticket ID: {passenger.ticketId}</p>
            <p className='font-bold text-red-500'>SEAT No.: {passenger.seat}</p>
        </div>
        <div className='flex flex-wrap md:gap-10 gap-x-12 gap-y-10 mt-5 bg-slate-100 p-8 rounded'>
            <div>
                <p className='font-semibold'>Depature Date</p>
                <p>{ticket[0].depature_date}</p>
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

            {/* <div>
                <p className='font-semibold'>Arrival Date</p>
                <p>{ticket[0].bus_id.arrival_date}</p>
            </div> */}

            <div>
                <p className='font-semibold'>Arrival Time</p>
                <p>{ticket[0].bus_id.arrival_time}</p>
            </div>

        </div>
    </div>
  )
}

export default Ticket