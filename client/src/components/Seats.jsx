import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {MdEventSeat} from 'react-icons/md'

export const Selection=({seatType,price,seatColor})=>{
    return(
        <div className='flex gap-2 border border-green-300 p-3 bg-white'>
            <div className={`w-10 h-10 ${seatColor} rounded-full`}></div>
            <div>
                <p>{seatType}</p>
                <p className='text-green-500 font-bold'>{price} GHS </p>
            </div>
        </div>
    )
}


function Seats() {
    const booking = useSelector(state=>state.booking.book)
    const search = useSelector(state=>state.search.data)
    const navigate = useNavigate

    const [availSeat,setAvailSeat] = useState(booking ? booking[0].available_seats : navigate('/buses')) //number of available seats
    const [bookedSeats,setBookedSeats] = useState(booking[0].booked_seats) //array of booked seat numbers
    const [chosen,setChosen] = useState([]) 

    const totalSeats =booking[0].total_seats //totals seats of bus
    const person = search.persons //number of persons user entered
    const seatsPerRow = booking[0].seats_perRow //number of seats per row

    // console.log(typeof(bookedSeats))

    const handleSeatSelect=(seatNumber)=>{
        //check if seat is already selected
        if (bookedSeats.includes(seatNumber)) {
            alert('Seat Not Available')
            return;
        }
        //if seats is choosen by user and user clicks again remove the chosen seat
        if(chosen.includes(seatNumber)){
            const updatedChosen = chosen.filter((chosenSeat) => chosenSeat !== seatNumber);
            setChosen(updatedChosen);
            alert('Seat Removed');
            return;
        }
            
        //check if the number of seat selected is more than passengers
        if(chosen.length >= person){
            alert('You cant choose more then '+ person +' person/s')
            return
        }

        // Add the seat to the chosen array
        const updatedChosen = [...chosen, seatNumber];
        setChosen(updatedChosen);
        
        // Otherwise, book the seat and update the bookedSeats state
        // const newBookedSeats = [...bookedSeats, seatNumber];
        // setBookedSeats(newBookedSeats)
        // console.log(newBookedSeats)
        
    }

        const [loading, setLoading] = useState(false);
        
            const handlePayment = async () => {
            setLoading(true);
        
        
            // Initialize the Paystack popup with the payment information
            const handler = window.PaystackPop.setup({
                key: 'pk_test_a104fcee3203b59d5d54e0de7cf1687f022e8ca2',
                email: 'phaisalsalif@gmail.com',
                amount: 500*100,
                currency: 'GHS',
                callback: (response) => {
                console.log(response);
                setLoading(false);
                },
                onClose: () => {
                setLoading(false);
                }
            });

            handler.openIframe();
        }
            // Open the Paystack popup
            



    const seatComponents = [];
    for (let i = 1; i <= totalSeats; i++) {
        const seatNumber = `A${i}`;
        const isBooked = bookedSeats.includes(seatNumber);
        const isChosen = chosen.includes(seatNumber)
        seatComponents.push(
        <button
            key={seatNumber}
            className={`p-4 text-center flex items-center gap-2 rounded-md ${isBooked ? 'bg-red-500' : 'bg-green-400'} ${isChosen?'bg-yellow-400':''} font-semibold`}
            onClick={() => handleSeatSelect(seatNumber)}
        >
            <MdEventSeat size={28} color='white'/>{seatNumber}
        </button>
        );
    }

    return (
        <>
         {/* md:flex justify-center */}
            <div className='container mx-auto md:w-1/2 p-5' >
                <div className='md:flex gap-5 mx-5'>
                    {/* seats */}
                    <div className='flex-1 mb-5 order-2'>
                        <div className={`grid gap-4 grid-cols-${seatsPerRow} `}>
                            {seatComponents}
                        </div>
                    </div>
                    {/* seats info */}
                    <div className='w-[50%] md:w-auto'>
                        <p className='font-bold mb-3'>Seat Information </p>
                        <div className='my-5'>
                            {chosen && chosen.map(seat=>(<b className='bg-green-600 p-1 text-white mr-1'> {seat} </b>))}
                        </div>
                        {/* <Selection seatType='Window Side' price={10} seatColor='bg-yellow-500'/> */}
                        {/* <Selection seatType='Aisle Side' price={5} seatColor='bg-blue-500'/> */}
                        <Selection seatType='Not Availble' price={0} seatColor='bg-red-600'/>
                        <Selection seatType='Availbable' price={0} seatColor='bg-green-500'/>
                        <Selection seatType='selected' price={0} seatColor='bg-yellow-400'/>
                        <p className='font-bold mb-5'>Available seats : {availSeat}</p>
                    </div>
                    
                </div>
                <div className='text-center'>
                    {
                        chosen.length == person ?
                        <button onClick={handlePayment} className='bg-green-600 px-10 py-5 rounded shadow-lg text-white font-bold hover:bg-green-900'>{loading ? 'Processing payment...' : 'Pay now'}</button> : ""
                    }
                </div>
                
            </div>
            
        </>
    )
}

export default Seats