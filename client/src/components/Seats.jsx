import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {MdEventSeat} from 'react-icons/md'
import {GiSteeringWheel} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import { customAlphabet } from 'nanoid'
import Cookies from 'js-cookie'
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../apiUrl'


//SEAT INFORMATION COMPOENENT
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
    const booking = useSelector(state=>state.booking.book) //GETS BOOKING STATE
    const [busData,setBusData] = useState([]) //ARRAY FOR GETTING BUS DATA FROM DB
    const navigate = useNavigate()

    //const token = Cookies.get('login') //getting login token from cookie
    const getUser = JSON.parse(localStorage.getItem('user')) //geting logged in user form localstorage

    const totalSeats = booking && booking.totalSeats //totals seats of bus
    const person = booking && booking.persons //number of persons user entered
    let seatsPerRow = booking && booking.seats_perRow

    const [availSeat,setAvailSeat] = useState(0) //number of available seat numbers gotten from db
    const [bookedSeats,setBookedSeats] = useState() //array of booked seat numbers gotten from db
    const [chosen,setChosen] = useState([]) // array to keep the user's selected seat
    const [loading, setLoading] = useState(false); //loading state of payment gateway

    // alert(bookedSeats.length)

    //getting bus by id from database
    const getBus = async(id) => {
        let busResponse = await axios.get(`${BASE_URL}/bus/${id}`)
        setBusData(busResponse.data)
        setAvailSeat(busResponse.data.available_seats)
        setBookedSeats(busResponse.data.booked_seats)
        setAvailSeat(totalSeats - bookedSeats.length)
    }

    // Mary Menash

    useEffect(()=>{
        getBus(booking.busId)
        //IF OUR GLOBAL STATES HAVE EMPTY KEYS
        const isEmptyValues = Object.values(booking).every((value)=>value)
        if(Object.keys(booking).length <= 0 || isEmptyValues == false){
            navigate('/',{replace:true})
        }
    },[availSeat])    

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
        }else if(type == 'failed'){
            toast.error(msg,{
                position : toast.POSITION.TOP_LEFT
            })
        }
    };

 //number of seats per row

    //SEAT SELECTING FUNCTION
    const handleSeatSelect=(seatNumber)=>{
        //check if seat is already selected
        if (bookedSeats.includes(seatNumber)) {
            notify('Seat Not Available','occupied')
            return;
        }
        //if seats is choosen by user and user clicks again remove the chosen seat
        if(chosen.includes(seatNumber)){
            const updatedChosen = chosen.filter((chosenSeat) => chosenSeat !== seatNumber); //NEW ARRAY WITH REMOVED SEAT
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
    }

    //UPDATING PASSENGERS DATA WITH CHOSEN SEATS
    let currentPassenger = booking.passenger ? booking.passenger.map((passenger,index)=>{
        return {...passenger, seat: chosen[index]} //ADDING SEAT KEY WITH VALUE
    }):(navigate('/',{replace:true}))



    //update bdseats function
    const dbSeatUpdates = async(seatArray,total)=>{
        const seatUpdate = {
            seat : seatArray,
            currentSeat : total - seatArray.length
        }
        await axios.patch(`${BASE_URL}/bus/updateSeats/${busData._id}`,seatUpdate)
        .then(resp=>(resp.data))
        .catch(err=>(err))
    }

    //ADDING NEW BOOKING TO DB
    const addNewBooking = async(response)=>{
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const nanoid = customAlphabet(alphabet, 6) //GENERATES 6

        const bookingData = {
            bus_id:busData._id,
            customer_id : booking.customerId,
            passengers: currentPassenger,
            booking_status:response.status,
            price: booking.fare ,
            depature_date: booking.depature_date,
            booking_number: nanoid()
        }

        localStorage.setItem('bookingID',JSON.stringify(bookingData.booking_number))

        await axios.post(`${BASE_URL}/booking`,bookingData)
            .then(resp=>{
                console.log('booked')
                
            }) 
            .catch(err=>console.log(err))
    }

    //ADDING PAYMENT INFO TO DB
    const addPaymentInfo = async(response)=>{
        const data = {
            customer_id: booking.customerId,
            amount : booking.fare, 
            paymentStatus : response.status, 
            refNumber : response.reference,
            date : new Date()
        }
        await axios.post(`${BASE_URL}/payment`, data)
        .then(resp=>(resp.data))
        .catch(err=>(err))
    }


    //PAYMENT GATEWAY
    const handlePayment = async () => {
            if(!getUser){
                navigate('/login');
                return;
            }
            setLoading(true);
            // Initialize the Paystack popup with the payment information
            const handler = window.PaystackPop.setup({
                key: import.meta.env.VITE_REACT_APP_SECRET_KEY, 
                email: getUser.email,
                amount: booking.fare * 100,
                currency: 'GHS',
                callback: (response) => {
                        if(response.status == 'success' && response.message == 'Approved'){
                            const myseat = chosen;
                            const allSeats = totalSeats


                            dbSeatUpdates(myseat,allSeats) // run seat update
                            addNewBooking(response) //run adding new booking
                            addPaymentInfo(response) //run payment addition

                            setLoading(false)
                            
                            navigate('/success', { replace: true })
                        }else{
                            setLoading(false);
                            notify('Error Occured During Payment','failed')
                        }
                },
                onClose: () => {
                    notify('Payment Processing Cancelled','failed')
                    setLoading(false);
                    return
                    
                }
        });
        // Open the Paystack popup
        handler.openIframe();
    }
            
            

    //creating seats for bus 
    const seatComponents = [];
    for (let i = 1; i <= totalSeats; i++) {
        const seatNumber = `A${i}`;
        const isBooked = bookedSeats && bookedSeats.includes(seatNumber);//
        const isChosen = chosen.includes(seatNumber)

        seatComponents.push(
        <span
            key={seatNumber}
            className={`p-4  text-center flex flex-wrap justify-center items-center gap-2 shadow-md rounded-md ${isBooked ? 'bg-red-500' : 'bg-slate-100'} ${isChosen?'bg-yellow-400':''} font-semibold `}
            onClick={() => handleSeatSelect(seatNumber)}
        >
            <MdEventSeat size={28} color='black'/>{seatNumber}
        </span>
        );
    }

    return (
        <>
         {/* md:flex justify-center */}
            <div className='container md:mx-auto lg:w-[60%] md:p-5' >
                <ToastContainer/>
                
                <div className='flex md:gap-5 md:mx-5 mx-1 flex-wrap'>
                    
                    {/* seats */}
                    <div className='flex-1 mb-5 mt-1 border p-4 order-2 md:order-2'>

                        {/* DRIVER */}
                        <button className='border w-full p-2'>
                            <GiSteeringWheel size={40} color='green'/>
                        </button>

                        <div className={`grid gap-4 ${seatsPerRow == 3 ? 'grid-cols-3': 'grid-cols-4'} my-5 text-center`}>
                            {seatComponents}
                        </div>

                    </div>

                    {/* seats info */}
                    <div className='w-[100%] md:w-auto '>
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
                                <button onClick={handlePayment} className='bg-green-400 px-12 py-2 rounded shadow-lg text-white font-bold hover:bg-green-600 w-full md:w-auto'>{loading ? 'Processing payment...' : 'Pay now'}</button> : ""
                            }
                        </div>
                    </div>
                    
                    
                </div>
                
                
            </div>
            
        </>
    )
}

export default Seats