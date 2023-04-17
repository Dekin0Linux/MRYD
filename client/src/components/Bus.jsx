import React from 'react'
import {FaStar} from 'react-icons/fa'
import {MdOutlineAirlineSeatReclineExtra} from 'react-icons/md'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from '../states/cart/cartReducer'
import { useNavigate } from 'react-router-dom'

function Bus({bus,index}) {
    const busDate = new Date(bus.date)
    const booking = useSelector(state=>state.booking.book)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const enterBooking = ()=>{
        dispatch(addToCart(bus))
        if(booking){
            navigate('/passenger')
        }
    }

  return (
    <div className='md:flex justify-between bg-white p-2 shadow-lg md:my-8 my-4 rounded-lg mx-2 md:mx-0'>
        <div className='flex-1 '>
            <div className='md:flex gap-5'>
                <div className='w-32'>
                    <img src={bus.logo} alt={bus.id} className='w-full'/>
                    
                </div>
                <div >
                    <p className='font-bold text-2xl text-blue-600 mb-5'>{bus.name}</p>
                    <div className='flex items-center gap-5'>
                        <span className='inline-flex items-center bg-orange-400 gap-2 px-2 rounded-lg text-white text-semibold'><FaStar color='white'/> {bus.rating}</span>
                        <span className='inline-flex items-center' >{bus.busType}  |</span>
                        <span className='inline-flex items-center gap-2 font-bold text-red-700'><MdOutlineAirlineSeatReclineExtra/>{bus.seatsLeft} seats left</span>
                    </div>
                    <small>Bus Number</small>
                </div>
            </div>
            <div className='flex gap-5 md:my-6 my-4'>
                <div>
                    <small>Depature</small>
                    <p className="font-bold">{bus.depTime}</p>
                </div>
                <div>
                    <small>Arrival</small>
                    <p className="font-bold">{bus.Arival}</p>
                </div>

                <div>
                    <small>Date</small>
                    <p className="font-bold text-green-600">{busDate.toDateString()}</p>
                </div>
                <div>
                    <small>Amenities</small>
                    <p className="font-semibold text-blue-500">{bus.aminities.map((item,index)=>(<small className='mr-2' key={index}>{item} </small>))}</p>
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