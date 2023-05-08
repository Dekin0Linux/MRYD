import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../assets/MyRydWebLogo.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from '../states/cart/cartReducer'

function LoginComponent() {
    const [error,setError] = useState(null)
    const [isActive,setIsActive] = useState(false)
    const booking = useSelector(state=>state.booking.book) // user selected bus global state

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const token = Cookies.get('login')

    const Login = useFormik({
    initialValues:{
        email : '',
        password : ''
    },
        validationSchema: Yup.object({
            email :Yup.string().required("Email is required").email('Enter a Valid Email'),
            password :Yup.string().required("Password is required").min(8,'Password must be at least 8 characters'),
        }),

        onSubmit: async (v)=>{
            if(v.email == ''  && v.password == ''){
                return ;
            }
            const data = {
                email : v.email,
                password : v.password
            }
            await axios.post('https://myrydgh.onrender.com/user/login', data ,
            {withCredentials: true,},
            // {headers:{Authorization: `Bearer ${token}`}}
            )
            .then(response =>{
                if(response.data === 'Incorrect Password'){
                    setError('Incorrect Password')
                    setIsActive(true)
                    return
                }else{
                    localStorage.setItem('user',JSON.stringify(response.data)) //set user to local storage
                     //Cookies.get('login') //getting cookie
                    const userID = response.data._id; //gets logged in customer id
                    const userEmail = response.data.email //gets registed customer email
                    //adding to out global state
                    const user = {
                        ...booking,
                        customerId : userID,
                        email : userEmail
                    }
                    dispatch(addToCart(user)) //dispatch data to state
                    navigate('/seat',{replace:true})
                }
            }).catch(err=>{console.log(err) })
            
        }
    })

  return (
    <div className=' w-full flex justify-center items-center'>
       <div className='bg-white min-w-sm md:flex  shadow-md lg:w-[70%] w-full mx-2 my-5 md:mx-5 border-blue-400 border-2 rounded-lg'>
            <div className='md:w-1/2 md:py-20 px-10 py-10'>
                <div className='inline-flex items-center w-full justify-center'>
                    <img src={Logo} alt="" className='w-40'/>
                </div>
                <p className='font-bold text-3xl md:mb-3'>Login</p>
                <small className='md:mb-3'>Sign in to your account </small>
                {isActive ? <p className='text-red-500 font-bold  text-center'>{error}</p> : null}
                <form onSubmit={Login.handleSubmit}>
                {Login.touched.email && Login.errors.email ? <p className='text-red-600'>{Login.errors.email}</p> : null}
                    <input type="email" placeholder='Email' name='email' onChange={Login.handleChange} onClick={()=>setIsActive(false)} value={Login.values.email} onBlur={Login.handleBlur} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded'/>

                    {Login.touched.password && Login.errors.password ? <p className='text-red-600'>{Login.errors.password}</p> : null}
                    <input type="password" placeholder='Password' name='password' onChange={Login.handleChange} value={Login.values.password} onBlur={Login.handleBlur} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded' minLength={6}/>

                
                    <div className='flex justify-between my-3'>
                        <div>
                            <input type="checkbox" name="rm" id="" className='mr-2'/>Remember me
                        </div>
                        
                        <Link to={'/'}> <small> Forgot Password</small></Link>
                    </div>

                    <input type="submit" value={'Login'} placeholder='Email' className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded bg-blue-800 text-white'/>
                </form>

                <Link to={'/signup'}> <small> Dont have an account? Sign up</small></Link>
            </div>
            <div className='md:w-1/2 hidden md:block '>
                <img src="https://images.unsplash.com/photo-1636865266989-58043bceaa71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80" alt="" className='h-full object-cover' />
            </div>
        </div>

    </div>
  )
}

export default LoginComponent