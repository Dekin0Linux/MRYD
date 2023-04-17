import React from 'react'
import {MdEventSeat} from 'react-icons/md'

export const Selection=({seatType,price,seatColor})=>{
    return(
        <div className='flex gap-2 border border-green-300 p-3'>
            <div className={`w-10 h-10 ${seatColor} rounded-full`}></div>
            <div>
                <p>{seatType}</p>
                <p className='text-green-500 font-bold'>{price} GHS </p>
            </div>
        </div>
    )
}

function Seats() {
  return (
    <div className=' md:flex justify-center items-center'>
        <div className='md:flex gap-5 mx-5'>
            {/* seats */}
            <div className='flex-1 mb-5 order-2'>
                <div className='grid gap-4 grid-cols-5 '>
                    {/* row 1 */}
                    <div className={` bg-gray-200 rounded-md items-center w-full h-auto md:p-6 p-5 `}><MdEventSeat size={24} /></div>
                    <div className=" bg-gray-200 rounded-md ">Seat 2</div>
                    <div className="w-full bg-yellow-100"></div>
                    <div className=" bg-gray-200 rounded-md">Seat 3</div>
                    <div className=" bg-gray-200 rounded-md">Seat 4</div>

                    {/* row 2 */}
                    <div className="p-4 bg-gray-200 rounded-md">Seat 1</div> 
                    <div className="p-4 bg-gray-200 rounded-md">Seat 2</div>
                    <div className="w-4"></div>
                    <div className="p-4 bg-gray-200 rounded-md">Seat 3</div>
                    <div className="p-4 bg-gray-200 rounded-md">Seat 4</div>

                    <div className="p-4 bg-gray-200 rounded-md">Seat 1</div>
                    <div className="p-4 bg-gray-200 rounded-md">Seat 2</div>
                    <div className="w-4"></div>
                    <div className="p-4 bg-gray-200 rounded-md">Seat 3</div>
                    <div className="p-4 bg-gray-200 rounded-md">Seat 4</div>
                </div>
                
            </div>
            {/* seats info */}
            <div className='w-[50%] md:w-auto'>
                <p>Seat Information</p>
                <Selection seatType='Window Side' price={10} seatColor='bg-yellow-500'/>
                <Selection seatType='Aisle Side' price={5} seatColor='bg-blue-500'/>
                <Selection seatType='Not Availble' price={0} seatColor='bg-red-600'/>
                <Selection seatType='selected' price={0} seatColor='bg-green-500'/>
                
                
            </div>

        </div>
    </div>
  )
}

export default Seats