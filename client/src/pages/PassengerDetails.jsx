import React from 'react'
import Bus from './Buses'
import {useDispatch,useSelector} from 'react-redux'
import PassengerForm from '../components/PassengerForm'
// import { setSearch } from '../states/searchReducer/reducer';
import { useNavigate } from 'react-router-dom'

export const PriceBar = ({booking,persons})=>{

  return(
        <div className='flex justify-between p-5 mx-2 bg-yellow-500 shadow rounded'>
          <div>
              <p className='font-semibold text-brown-600'>{booking && booking[0].from} - {booking && booking[0].to}</p>                                
              <p>Date | {booking && booking[0].from}</p>
          </div>
          <div>
          <p>TOTAL PRICE</p>
            <p className='font-bold text-2xl'>{booking[0].fare * persons } GHS</p>
            
          </div>
        </div>
  )
}


function PassengerDetails() {
  const booking = useSelector(state=>state.booking.book) // user selected bus 
  
  const search = useSelector(state=>state.search.data) //users search data
  const navigate = useNavigate()

  // outputting the number of forms depending on number of persons
  const renderForm= ()=>{
    const forms = []
    for(let i = 0; i < search.persons ; i++){
      forms.push(<PassengerForm num={i}/>)
    }
    return forms
  }

  return (
    <div className='container mx-auto'>
      <div className='my-5'>

      <PriceBar booking={booking} persons={search.persons}/>

      <div>
        <p className='text-center my-5 font-bold text-xl'>Fill in your details</p>
        <form className='md:px-10 px-4'>
          {
            renderForm()
          }
          
          <button type='submit' className='bg-green-400 w-full md:w-60 py-4 rounded-lg text-white font-semibold' onClick={()=>navigate('/seat')}>Continue</button>
        </form>
      </div>
        
        
      </div>            
    </div>
  )
}

export default PassengerDetails