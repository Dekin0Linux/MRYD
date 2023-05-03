import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {MdEventSeat} from 'react-icons/md'
import {GiSteeringWheel} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid'
import Cookies from 'js-cookie'

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
    const [busData,setBusData] = useState([])
    const navigate = useNavigate()

    const token = Cookies.get('login')

    const [availSeat,setAvailSeat] = useState() //number of available seat numbers gotten from db
    const [bookedSeats,setBookedSeats] = useState() //array of booked seat numbers gotten from db
    const [chosen,setChosen] = useState([]) // array to keep the user's selected seat
    const [loading, setLoading] = useState(false); //loading state of payment gateway

    //getting bus by id
    const getBus = async(id) => {
        let busResponse = await axios.get(`http://localhost:4000/bus/${id}`)
        setBusData(busResponse.data)
        setAvailSeat(busResponse.data.available_seats)
        setBookedSeats(busResponse.data.booked_seats)
        
    }

    useEffect(()=>{
        getBus(booking.busId)

    },[])

    //notifications
    const notify = (msg,type) => {
        if(type=='selected'){
            toast.success(msg,{
                position: toast.POSITION.TOP_LEFT
            });
        }else if(type == 'unselected'){
            toast.info(msg,{
                position: toast.POSITION.TOP_LEFT
            });
        }else if(type == 'occupied'){
            toast.warning(msg,{
                position: toast.POSITION.TOP_LEFT
            });
        }else if(type == 'persons'){
            toast.error(msg,{
                position: toast.POSITION.TOP_LEFT
            });
        }
        

    };

    

    const totalSeats = booking.totalSeats //totals seats of bus
    const person = booking.persons //number of persons user entered
    const seatsPerRow = booking.seats_perRow //number of seats per row

    const handleSeatSelect=(seatNumber)=>{
        //check if seat is already selected
        if (bookedSeats.includes(seatNumber)) {
            notify('Seat Not Available','occupied')
            return;
        }
        //if seats is choosen by user and user clicks again remove the chosen seat
        if(chosen.includes(seatNumber)){
            const updatedChosen = chosen.filter((chosenSeat) => chosenSeat !== seatNumber);
            setChosen(updatedChosen);
            notify('Seat Removed','unselected')
            return;
        }
            
        //check if the number of seat selected is more than passengers
        if(chosen.length >= person){
            notify("You can't choose more then "+ person +' seat', 'persons')
            return
        }

        // Add the seat to the chosen array
        const updatedChosen = [...chosen, seatNumber];
        setChosen(updatedChosen);
        notify('Seat '+ seatNumber + ' Selected','selected')
        
        // Otherwise, book the seat and update the bookedSeats state
        // const newBookedSeats = [...bookedSeats, seatNumber];
        // setBookedSeats(newBookedSeats)
        // console.log(newBookedSeats)

        //chosen seats
        // console.log(updatedChosen)
        
    }



    
    
    //PAYMENT GATEWAY
        const handlePayment = async () => {
            if(!token){
                navigate('/login');
                return;
            }
            setLoading(true);
        // Initialize the Paystack popup with the payment information
            const handler = window.PaystackPop.setup({
                key: 'pk_test_a104fcee3203b59d5d54e0de7cf1687f022e8ca2',
                email: booking.email,
                amount: booking.fare * 100,
                currency: 'GHS',
                callback: (response) => {
                    if(response.status == 'success' && response.message == 'Approved'){
                        //update the bus seats data with user seats
                        console.log('Seats added to bus paid seats', chosen)
                        //add a new booking
                        console.log('newbooking',{busid:busData._id,passengers:booking.passenger,bookinStatus:response.status,price:booking.fare,bookingNumber: nanoid(8)})
                        //add new payment to db
                        console.log('New payment added')
                        //rediect user to successful payment page
                    }
                    setLoading(false);
                },
                onClose: () => {
                    setLoading(false);
                }
        });
        // Open the Paystack popup
        handler.openIframe();
    }
            
            

    //creating seats for bus 
    const seatComponents = [];
    for (let i = 1; i <= totalSeats; i++) {
        const seatNumber = `A${i}`;
        const isBooked = bookedSeats && bookedSeats.includes(seatNumber);
        const isChosen = chosen.includes(seatNumber)
        seatComponents.push(
        <button
            key={seatNumber}
            className={`p-4 text-center flex flex-wrap justify-center items-center gap-2 shadow-md rounded-md ${isBooked ? 'bg-red-500' : 'bg-slate-100'} ${isChosen?'bg-yellow-400':''} font-semibold `}
            onClick={() => handleSeatSelect(seatNumber)}
        >
            <MdEventSeat size={28} color='black'/>{seatNumber}
        </button>
        );
    }

    return (
        <>
         {/* md:flex justify-center */}
            <div className='container mx-auto md:w-[60%] p-5' >
                <ToastContainer/>
                
                <div className='md:flex md:gap-5 mx-5'>
                    
                    {/* seats */}
                    <div className='flex-1 mb-5 border p-4'>
                        <button className='border w-full p-2'><GiSteeringWheel size={40} color='green'/></button>
                        <div className={`grid gap-4 grid-cols-${seatsPerRow} my-5`}>
                            {seatComponents}
                        </div>
                    </div>

                    {/* seats info */}
                    <div className='w-[50%] md:w-auto'>
                        <p className='font-bold mb-3'>Seat Information </p>
                        <div className='my-5 flex flex-wrap'>
                            {chosen && chosen.map((seat,index)=>(<b className='bg-green-600 p-2 text-white mr-1' key={index}> {seat} </b>))}
                        </div>
                        {/* <Selection seatType='Window Side' price={10} seatColor='bg-yellow-500'/> */}
                        {/* <Selection seatType='Aisle Side' price={5} seatColor='bg-blue-500'/> */}
                        <Selection seatType='Not Availble' price={0} seatColor='bg-red-600'/>
                        <Selection seatType='Availbable' price={0} seatColor='bg-slate-100'/>
                        <Selection seatType='selected' price={0} seatColor='bg-yellow-400'/>
                        <p className='font-bold my-5'>Available seats : {availSeat}</p>
                        <div className='text-center'>
                            {
                                chosen.length == person ?
                                <button onClick={handlePayment} className='bg-green-400 px-12 py-2 rounded shadow-lg text-white font-bold hover:bg-green-600'>{loading ? 'Processing payment...' : 'Pay now'}</button> : ""
                            }
                        </div>
                    </div>
                    
                    
                </div>
                
                
            </div>
            
        </>
    )
}

export default Seats