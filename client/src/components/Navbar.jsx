import React,{useState} from 'react'
import logo from '../assets/MyRydWebLogo.png'
import {FaBars} from 'react-icons/fa'
import {GrClose} from 'react-icons/gr'
import { useNavigate,Link } from 'react-router-dom'

function Navbar() {
  const [selected,setSelected] = useState(false)

  const navigate = useNavigate()

  const clicked = ()=>{
    setSelected(!selected)
  }

  return (
    <div className='bg-blue-200 w-full sticky top-0 z-[100]'>
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
                  !selected?
                <ul className={'md:flex justify-between md:gap-10 hidden'}>
                    <li className='font-bold '><a href="tel:+233558628473">Toll free</a></li>
                    <Link to={'/'}><li className='font-bold'>Home</li></Link>
                    <a href=""><li className='font-bold'>My Booking</li></a>
                    <a href=""><li className='font-bold'>Create Account</li></a>
                    <a href=""><li className='font-bold'>Login</li></a>
                </ul> 
                :
                <ul className={'md:flex justify-between md:gap-10'}>
                  <li className='font-bold '><a href="">Toll free</a></li>
                  <a href=""><li className='font-bold'>Home</li></a>
                  <a href=""><li className='font-bold'>My Booking</li></a>
                  <a href=""><li className='font-bold'>Create Account</li></a>
                  <a href=""><li className='font-bold'>Login</li></a>
                </ul> 

                }       
            </nav>
        
        </div>
    </div>
    
  )
}

export default Navbar