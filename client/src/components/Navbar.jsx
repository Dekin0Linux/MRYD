import React,{useEffect, useState} from 'react'
import logo from '../assets/MyRydWebLogo.png'
import {FaBars} from 'react-icons/fa'
import {GrClose} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [selected,setSelected] = useState(false)
  const [loggedIn,setLoggedIn] = useState(false)
  const navigate = useNavigate()

  const token = Cookies.get('login')
 const getUser = JSON.parse(localStorage.getItem('user'))

 useEffect(()=>{
  if(token && getUser){
    setLoggedIn(true)
    console.log("LoggedIN user")
   }
 })


 //LOGOUT FUNCTION
 const logOut= async ()=>{
  axios.post('https://myrydgh.onrender.com/user/logout',{}).then(res=>{
    if(res.statusText == "OK"){
      Cookies.remove('login')
      localStorage.removeItem('user')
      setLoggedIn(false)
      window.location.href='/'
      console.log('loogedout')
    }
  }).catch(err=>console.log(err))
 }


  const clicked = ()=>{
    setSelected(!selected)
  }

  return (
    <div className='bg-blue-100 w-full sticky top-0 z-[100]'>
        <div className='container mx-auto text-blue-900 px-10 md:px-0'>
            <nav className='md:flex justify-between items-center md:py-5 py-2'>
                <Link to={'/'}> <img src={logo} alt="logo" className='w-28 animate-bounce'/></Link>

              {/* hamburger */}
                {
                  selected 
                  ? <div className='absolute right-5 top-5 md:hidden' onClick={clicked}><GrClose/></div>
                  : <div className='absolute right-5 top-5 md:hidden' onClick={clicked}><FaBars/></div>
                }
                {/* Hamburger */}

                {
                  !selected ?
                  (
                <ul className={'md:flex justify-between md:gap-10 hidden'}>
                    <li className='font-bold '><a href="tel:+233558628473">Toll free</a></li>
                    <Link to={'/'}><li className='font-bold'>Home</li></Link>
                    <Link to={'/mybooking'}><li className='font-bold'>My Booking</li></Link>
                    {
                      loggedIn == true ? <Link to="/signup"><li className='font-bold px-2 bg-red-500 py-1 rounded text-white shadow-2xl' onClick={logOut}>Logout</li></Link> : ""
                    }
                </ul> )
                : (
                <ul className={'md:flex justify-between md:gap-10'}>
                  <li className='font-bold '><a href="tel:+233558628473">Toll free</a></li>
                  <Link to={'/'}><li className='font-bold'>Home</li></Link>
                  <Link to={'/mybooking'}><li className='font-bold'>My Booking</li></Link>
                  {
                      loggedIn == true ? <Link to="/signup"><li className='font-bold px-2 bg-red-500 py-1 rounded text-white shadow-xl' onClick={logOut}>Logout</li></Link> : ""
                  }
                  {/* <Link to="/signup"><li className='font-bold'>Create New Account</li></Link> */}
                  {/* <Link to="/login"><li className='font-bold'>Login</li></Link> */}

                </ul>  )

                }       
            </nav>
        
        </div>
    </div>
    
  )
}

export default Navbar