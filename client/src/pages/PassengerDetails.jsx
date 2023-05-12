import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import PassengerForm from '../components/PassengerForm'
import { addToCart } from '../states/cart/cartReducer'
import { useNavigate } from 'react-router-dom'

export const PriceBar = ({booking,userSearch})=>{
  return(
        <div className='flex justify-between p-5 mx-2 bg-blue-500 shadow rounded text-white'>
          <div>
              <p className='font-semibold text-brown-600 capitalize text-xl'>{booking && booking.depature} - {booking && booking.arrival_loc}</p>                                
              <p>Date | {userSearch.date}</p>
          </div>
          <div>
          <p>TOTAL PRICE</p>
            <p className='font-bold text-2xl'>{booking.fare } GHS</p>
            
          </div>
        </div>
  )
}


function PassengerDetails() {


  const booking = useSelector(state=>state.booking.book) // user selected bus global state
  const search = useSelector(state=>state.search.data) //users search data global state
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{    
    //IF OUT GLOBAL STATES HAVE EMPTY KEYS
    const isEmptyValues = Object.values(booking).every((value)=>value)
    
    if(Object.keys(booking).length <= 0 || isEmptyValues == false){
        navigate('/',{replace:true})
    }
},[])



  const [passengersData,setPassengersData] = useState([])
  
  //Passenger form
  const handlePassengerData = (num, data) => {
    //num is the index of the passenger
    // is an object of passengers data
    const updatedPassenger = [...passengersData] //copy exisiting passenger data 
    updatedPassenger[num] = data //setting the index of the item to the new data user enters
    setPassengersData(updatedPassenger) //update the state with pasengers data
  };

  const handleFormSubmit=(e)=>{
    e.preventDefault()
    const passengers = {
      ...booking,
      passenger: passengersData
    }
    console.log(passengersData)
    dispatch(addToCart(passengers))
    navigate('/seat')
  }

  // function outputting the number of forms depending on number of persons
  const renderForm= ()=>{
    const forms = []
    for(let i = 0; i < search.persons ; i++){
      forms.push(<PassengerForm num={i} key={i} handlePassengerData={handlePassengerData}/>)
    }
    return forms
  }

  

  return (
    <div className='container mx-auto'>
      <div className='my-5'>

        <PriceBar booking={booking} userSearch={search}/>

        <div>
          <p className='text-center my-5 font-bold text-xl'>Fill in your details</p>
          <form className='md:px-10 px-4' onSubmit={handleFormSubmit} >
            {
              renderForm() //user form
            }
            
            <button type='submit' className='bg-green-400 w-full md:w-60 py-4 rounded-lg text-white font-semibold'>Continue</button>
          </form>
        </div>
      </div>            
    </div>
  )
}

export default PassengerDetails