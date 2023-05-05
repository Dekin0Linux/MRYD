import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Logo from '../assets/MyRydWebLogo.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from '../states/cart/cartReducer'




function SignupComponent() {
    const [error,setError] = useState(null)
    const [isActive,setIsActive] = useState(false)
    const booking = useSelector(state=>state.booking.book) // user selected bus global state
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = Cookies.get('login')

    const signUp = useFormik({
        initialValues:{
            firstname : '',
            lastname : '',
            email : '',
            phone : '',
            address : '',
            password : ''
        },

        validationSchema: Yup.object({
            firstname :Yup.string().required("Firstname field is required"),
            lastname : Yup.string().required("Lastname is required"),
            email :Yup.string().required("email is required").email('Enter a Valid Email'),
            phone :Yup.string().required("phone is required").min(10,'Phone number must be 10 digits').max(10,'Phone number must be 10 digits'),
            address :Yup.string().required("Address is required"),
            password :Yup.string().required("Password is required").min(8,'Password must be at least 8 characters'),
        }),

        onSubmit:async (v)=>{
            const data = {
                firstname : v.firstname,
                lastname : v.lastname,
                email : v.email,
                phone : v.phone,
                address : v.address,
                password : v.password
            }

            await axios.post('http://localhost:4000/user/register',data,
            {withCredentials: true,},
            {headers: {Authorization: `Bearer ${token}`}}).then(response=>{
                const userID = response.data._id;
                const user = {
                    ...booking,
                    customerId : userID
                }
                dispatch(addToCart(user))
                navigate('/seat') 
            }).catch(err=>{
                setIsActive(true)
                setError(err)
            })
        }


    })
    
  return (
    <div className=' w-full flex justify-center items-center'>
       <div className='bg-white min-w-sm md:flex  shadow-md lg:w-[70%] w-full mx-2 my-5 md:mx-5 border-blue-400 border-2 rounded-lg'>
            <div className='md:w-1/2 md:py-15 md:px-10 px-5 py-10'>
                <div className='inline-flex items-center w-full justify-center'>
                    <img src={Logo} alt="" className='w-40'/>
                </div>
                <p className='font-bold text-3xl md:mb-3'>Sign Up</p>
                <small className='md:mb-3'>Sign up for an account </small>

                <form onSubmit={signUp.handleSubmit} className='mt-5'>
                    <div className='md:flex justify-between gap-5'>
                        <div className='md:w-1/2'>
                            {signUp.touched.firstname && signUp.errors.firstname ? <p className='text-red-600'>{signUp.errors.firstname}</p> : null}
                            <input type="text" placeholder='First name' name='firstname' onChange={signUp.handleChange} value={signUp.values.firstname} onBlur={signUp.handleBlur}  className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded'/>
                        </div>

                        <div className='md:w-1/2'>
                        {signUp.touched.lastname && signUp.errors.lastname ? <p className='text-red-600'>{signUp.errors.lastname}</p> : null}
                        <input type="text" placeholder='Last name' name='lastname'  onChange={signUp.handleChange} value={signUp.values.lastname} onBlur={signUp.handleBlur} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded'/>
                        </div>
                    

                    

                    </div>
                    

                    {signUp.touched.email && signUp.errors.email ? <p className='text-red-600'>{signUp.errors.email}</p> : null}
                    <input type="email" placeholder='Email' name='email' onChange={signUp.handleChange} value={signUp.values.email} onBlur={signUp.handleBlur} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded'/>

                    {signUp.touched.phone && signUp.errors.phone ? <p className='text-red-600'>{signUp.errors.phone}</p> : null}
                    <input type="phone" placeholder='Phone' name='phone' onChange={signUp.handleChange} value={signUp.values.phone} onBlur={signUp.handleBlur} maxLength={10} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded'/>

                    {signUp.touched.address && signUp.errors.address ? <p className='text-red-600'>{signUp.errors.address}</p> : null}
                    <input type="text" placeholder='Address' name='address' onChange={signUp.handleChange} value={signUp.values.address} onBlur={signUp.handleBlur} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded'/>

                    {signUp.touched.password && signUp.errors.password ? <p className='text-red-600'>{signUp.errors.password}</p> : null}
                    <input type="password" placeholder='Password' name='password' onChange={signUp.handleChange} value={signUp.values.password} onBlur={signUp.handleBlur} className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded' minLength={6}/>

                    <button type="submit" placeholder='Email' className='px-3 my-3 py-1 border border-gray-300 w-[100%] outline-0 rounded bg-blue-800 text-white'>Register</button>
                </form>

                <Link to={'/login'}> <small> Already have an account? Login</small></Link>
            </div>
            <div className='md:w-1/2 hidden md:block bg-green-400'>
                <img src="https://images.unsplash.com/photo-1543838244-8c6ca03cb689?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className='object-cover h-full' />
            </div>
        </div>

    </div>
  )
}

export default SignupComponent