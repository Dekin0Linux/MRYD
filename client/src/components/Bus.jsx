import React from 'react'
import {FaStar} from 'react-icons/fa'
import {MdOutlineAirlineSeatReclineExtra} from 'react-icons/md'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from '../states/cart/cartReducer'
import { useNavigate } from 'react-router-dom'

function Bus({bus,index}) {
    const booking = useSelector(state=>state.booking.book)
    const search = useSelector(state=>state.search.data) //users search data
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const enterBooking = ()=>{
        const newBooking = {
            ...booking,
            busId: bus._id,
            depature : bus.depature_loc,
            arrival_loc:bus.arrival_loc,
            fare : bus.fare * search.persons,
            depature_date : search.date,
            depature_time : bus.depature_time,
            totalSeats : bus.total_seats,
            station_name : bus.station_name,
            seats_perRow : bus.seats_perRow,
            persons : search.persons
        }
        dispatch(addToCart(newBooking))
        if(booking){
            navigate('/passenger')
        }
    }


  return (
    <div className='md:flex justify-between bg-white p-5 shadow-lg md:my-8 my-4 rounded-lg md:mx-0 border-blue-400 border-[3px]'>
        <div className='flex-1 '>
            <div className='md:flex gap-5'>
                <div className='w-32'>
                    <img src={`https://myrydgh.onrender.com/images/${bus.bus_name.logo}`} alt={bus.id} className='w-full'/>
                </div>
                <div >
                    <p className='font-bold text-2xl text-blue-600 mb-5'>{bus.bus_name ? bus.bus_name.company_name : ''} | {bus.station_name}</p>
                    <div className='flex items-center gap-5 flex-wrap'>
                        <span className='inline-flex items-center bg-orange-400 gap-2 px-2 rounded-lg text-white text-semibold'><FaStar color='white'/> {bus.rating}</span>
                        <span className='inline-flex items-center' >{bus.bus_type}  |</span>
                        <span className='inline-flex items-center gap-2 font-bold text-red-700'><MdOutlineAirlineSeatReclineExtra/>{bus.available_seats} seats left</span>
                    </div>
                    <small className='font-bold'>Bus Number : {bus.bus_number}</small>
                </div>
            </div>
            <div className='flex gap-5 md:my-6 my-4 flex-wrap md:flex-nowrap'>
                <div>
                    <small>Depature</small>
                    <p className="font-bold">{bus.depature_time}</p>
                </div>
                <div>
                    <small>Arrival</small>
                    <p className="font-bold">{bus.arrival_time}</p>
                </div>

                <div>
                    <small>Date</small>
                    <p className="font-bold text-green-600">{search.date}</p>
                </div>
                <div>
                    <small>Amenities</small>
                    <p className="font-semibold text-blue-500">{bus.amenities && bus.amenities.map((item,index)=>(<small className='mr-2' key={index}>{item} </small>))}</p>
                </div>
            </div>
        </div>

        <div className='bg-slate-100 p-2 rounded'>
            <div className='flex flex-col justify-between md:items-center h-full'>
                <div>
                    <p>FARE</p>
                    <p className='font-bold text-3xl text-green-500'>{bus.fare} GHC</p>
                </div>

                <button className='px-4 py-2 mt-2 font-semibold bg-green-500 rounded text-white' onClick={()=>enterBooking()}>Book Ticket</button>
            </div>
        </div>
    
    </div>
  )
}

export default Bus