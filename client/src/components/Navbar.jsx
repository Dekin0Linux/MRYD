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

//LOGOUT FUNCTION
const logOut = async ()=>{
  // axios.post('https://myrydgh.onrender.com/user/logout').then(res=>{
  //   if(res.statusText == "OK"){
  //     // Cookies.remove('login') // delete cookie
  //     localStorage.removeItem('user') //user storage
  //     setLoggedIn(false)
  //     console.log(res)
  //     window.location.href='/'
  //     console.log('loogedout')
  //   }
  // }).catch(err=>console.log(err))
  localStorage.removeItem('user') //user storage
  window.location.href='/'
}

useEffect(()=>{
if(getUser){
  setLoggedIn(true)
  return
  // console.log(token)
  // console.log("LoggedIN user")
  }
})

  const clicked = ()=>{
    setSelected(!selected)
  }

  return (
    <div className='bg-white w-full md:sticky md:top-0 shadow-md  z-[100]'>
        <div className='container mx-auto text-black font-light px-5 md:text-lg md:px-0'>
            <nav className='md:flex justify-between items-center md:py-5 py-1'>
                <Link to={'/'}> <img src={logo} alt="logo" className='w-28 animate-bounce no-underline' style={{textDecorationLine:'none'}}/></Link>

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
                <ul className={'md:flex items-center justify-between md:gap-10 hidden gap-y-10'}>
                    <li className='font-bold '><Link href="tel:+233558628473" className='no-underline hover:no-underline'>Toll free</Link></li>
                    <Link to={'/'} className='no-underline hover:no-underline'><li className='font-bold no-underline hover:no-underline'>Home</li></Link>
                    <Link to={'/mybooking'} className='no-underline hover:no-underline'><li className='font-bold no-underline hover:no-underline'>My Booking</li></Link>
                    {
                      loggedIn ? <Link to="/" className='no-underline hover:no-underline'><li className='font-bold px-2 bg-red-500 py-1 rounded text-white shadow-2xl' onClick={logOut}>Logout</li></Link> : ""
                    }
                </ul> )
                : (
                <ul className={'flex flex-wrap md:flex-row justify-between gap-3 md:gap-10 gap-y-4'}>
                  <li className='font-bold '><a href="tel:+233558628473">Toll free</a></li>
                  <Link to={'/'} onClick={()=>setSelected(false)} className='no-underline hover:no-underline'><li className='font-bold no-underline'>Home</li></Link>
                  <Link to={'/mybooking'} className='no-underline hover:no-underline' onClick={()=>setSelected(false)} ><li className='font-bold no-underline hover:no-underline'>My Booking</li></Link>
                  {
                      loggedIn ? <Link to="/" onClick={()=>setSelected(false)} className='no-underline hover:no-underline'><li className='font-bold no-underline px-2 w-fit  md:w-auto bg-red-500 py-1 rounded text-white shadow-xl' onClick={logOut}>Logout</li></Link> : ""
                  }
                </ul>  
                )
              }       
            </nav>
        
        </div>
    </div>
    
  )
}

export default Navbar