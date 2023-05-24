import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import PassengerForm from '../components/PassengerForm'
import { addToCart } from '../states/cart/cartReducer'
import { useNavigate } from 'react-router-dom'

export const PriceBar = ({booking,userSearch,cost})=>{
  
  return(
        <div className='p-5 mx-auto border shadow rounded lg:w-3/12'>
          <div className='flex justify-between flex-wrap lg:mb-10'>
            <div>
              <p>Fare</p>
              <p className='font-semibold text-xl text-green-500'>GHC {booking.fare + cost}</p>
            </div>

            <div>
              <p>Date</p>
              <p className='font-semibold text-xl text-green-500'>{booking.depature_date}</p>
            </div>
          </div>

          <div className='flex justify-between flex-wrap my-10'>
            <div>
              <p>Depature</p>
              <p className='font-semibold text-xl text-green-500 capitalize'>{booking.depature}</p>
              <p>{booking.depature_time}</p>
            </div>

            <div>
              <p>Arrival</p>
              <p className='font-semibold text-xl text-green-500 capitalize'>{booking.arrival_loc}</p>
              {/* <p>{booking.depature_time}</p> */}
            </div>
          </div>
          <div className='my-5'>
              <p>Station</p>
              <p className='font-semibold text-xl text-green-500 capitalize'>{booking.station_name}</p>
              <p>{booking.depature_time}</p>
          </div>
        </div>
  )
}


function PassengerDetails() {

  const booking = useSelector(state=>state.booking.book) // user selected bus global state
  const search = useSelector(state=>state.search.data) //users search data global state
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //STATE TO HAVE ARRAY OF PASSENGERS
  const [passengersData,setPassengersData] = useState([])
  const [luggageCost,setLuggageCost] = useState(0)  

  useEffect(()=>{    
    //IF OUR GLOBAL STATES HAVE EMPTY KEYS
    const isEmptyValues = Object.values(booking).every((value)=>value)
    if(Object.keys(booking).length <= 0 || isEmptyValues == false){
        navigate('/',{replace:true})
    }
},[passengersData])

  //HANDLE PASSENGER FORM INPUT 
  const handlePassengerData = (num, data) => {
    //num is the index of the passenger
    //data is an object of passengers data
    const updatedPassenger = [...passengersData] //copy exisiting passenger data 
    updatedPassenger[num] = data //setting a user with index to the new data user enters
    setPassengersData(updatedPassenger) //update the state with pasengers data

  };


  // function outputting the number of forms depending on number of persons
  const renderForm = ()=>{
    const forms = [] //ARRAY TO HOLD EACH PASSENGER FORM FIELDS 
    for(let i = 0; i < search.persons ; i++){
      //PUSHING FORM FIELD INTO ARRAY 
      forms.push(<PassengerForm num={i} key={i} handlePassengerData={handlePassengerData}/>)
    }
    return forms
  }


  
  //WHEN FORM  IS SUBMITTED 
  const handleFormSubmit=(e)=>{
    e.preventDefault()
    //UPDATE GLOBAL STATE WITH PASSENGERS DATA
    const passengers = {
      ...booking, //spreading everything in the prev object
      passenger: passengersData //adding the passenger data field
    }
    dispatch(addToCart(passengers)) //disptach to our global state
    navigate('/seat')
  }

  

  return (
    <div className='container mx-auto'>
      <div className='my-5 lg:flex items-start'>
        {/* PRICE BAR  */}
        <PriceBar booking={booking} userSearch={search} cost={luggageCost}/>

        <div>
          <p className='text-center my-5 font-bold text-xl'>Passenger details</p>
          <p className='text-center'>Fill in the passenger/s details</p>

          <form className='md:px-10 px-4' onSubmit={handleFormSubmit} >
            {
              renderForm() //user form fields
            }
            
            <button type='submit' className='bg-green-400 w-full md:w-60 py-4 rounded-lg text-white font-semibold'>Continue</button>
          </form>

        </div>
      </div>            
    </div>
  )
}

export default PassengerDetails