import React, { useEffect, useState } from 'react'
import { clipboardCopy } from 'clipboard-copy';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'
import gif from '../assets/gifSuccess.gif'

function Success() {
  const [getbooked,setGetBooked] = useState('')
  const [isCopied,setIsCopied] = useState(false)
  const [loading,setLoading] = useState(true)

  const getData= async()=>{
    let data = await sessionStorage.getItem('bookingID')
    data=JSON.parse(data)
    console.log(data)
    setGetBooked(data)
    setLoading(false)
  }

  const handleCopy = async(txt)=>{
    try{
      await navigator.clipboard.writeText(txt) //copies text
      setIsCopied(true)
    }catch(err){
      console.log(err)
    }
  }



  useEffect(()=>{
    getData()
  },[])

  const navigate = useNavigate()
  return (
    <div className=' flex justify-center w-full'>
      <div className='md:flex lg:gap-10 gap-y-20 py-5'>
        <div className='text-center px-2'>
          <img src={gif} alt="" className='w-[100%]'/>
          <p className='font-semibold text-xl text-green-600'>Booking Successful</p>
          <div className='my-5 font-bold text-lg'>
            <span>Booking # : </span>
            <span>{getbooked != '' ? getbooked : 'No Booking'} </span>
            <button onClick={()=>handleCopy(getbooked)} className={`${isCopied ? 'bg-green-400':'bg-blue-400'} px-3 py-1 mx-2 text-white rounded-md`}>{isCopied ?  'Copied' : 'Copy'}</button>
          </div>
          <small className='text-green-400 text-lg'>Copy the Booking number and download your ticket </small>
          <Link to={'/mybooking'}>Here</Link> 
          <p>Your ticket detail would be sent to your email !</p>
          <hr className='my-5'/>
          <div>
            <button onClick={()=>navigate('/',{replace:true})} className='bg-blue-400 text-white p-2 shadow-xl'>Back to Home</button>
          </div>
        </div>

  
      </div>
    </div>
  )
}

export default Success