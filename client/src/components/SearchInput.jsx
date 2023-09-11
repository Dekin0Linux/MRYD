import React from 'react'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { setSearch } from '../states/searchReducer/reducer';
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Loading from './Loading';

function SearchInput() {
  const [fromLocation,setFromLocation] = useState([])
  const [toLocation,setToLocation] = useState([])
  const [loading,setLoading] = useState(true)

  const currentDate = new Date().toISOString().split('T')[0]; //currentdate
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getLocations=async()=>{
    await axios.get('https://myrydgh.onrender.com/bus')
    .then(resp => {
      if(resp.status == 200){
        let fromStations = (resp.data.map(station=>station["depature_loc"]))
        let arrivalStations = (resp.data.map(station=>station["arrival_loc"]))
        let filterFromLoc = [...new Set(fromStations)]
        let filterToLoc = [...new Set(arrivalStations)]
        setFromLocation(filterFromLoc)
        setToLocation(filterToLoc)
        setLoading(false)

        // console.log(location)
      }
    }).catch(err=>console.log(err))
  }

  useEffect(()=>{
    getLocations()
  },[])

  //notifications
  const notify = (msg,type) => {
    if(type=='invalid'){
        toast.warning(msg,{
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
};

  // formik
  const formik = useFormik({
    //field states
    initialValues:{
      from: '',
      to:'',
      date : '',
      persons : 1
    },

    validationSchema: Yup.object({
      from :Yup.string().required("This field is required"),
      to : Yup.string().required("This field is required"),
      date:Yup.string().required("This field is required"),
      persons:Yup.number().required("This field is required"),
    }),

    onSubmit:(values)=>{
      if(values.from === values.to){
        notify('Invalid location','invalid')
        return
      }else{
        dispatch(setSearch(values))
        navigate('/buses')
      }
    }
  })

  
  return (
    <div id='searchBox' className=' backdrop-blur-sm bg-white/30 shadow-2xl md:absolute  md:bottom-[10%] bottom-[2%] p-2 mx-5 mt-3 inset-x-0 md:mx-10 lg:mx-40 rounded-lg  z-50'>
{/*       
    <h3 className='font-semibold text-xl p-3 text-blue-800'>Get Ticket</h3>
    <hr /> */}
    <div className='my-5'>
      {/* md:flex flex-wrap md:gap-x-7 md:gap-y-5 */}
        <form className='md:flex flex-wrap ' onSubmit={formik.handleSubmit} >
          <ToastContainer/>
            <div className=' mb-5 md:mb-0 md:ms-5 '>
                <label htmlFor="from">From</label> <br />
                <select name="from" id="from" className='md:py-3 rounded-md bg-white border-blue-300 border-2 py-2 px-4 md:w-60 w-full outline-none' 
                value={formik.values.from} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}>
                    <option>From Station</option>
                    {
                      fromLocation.map((city,index) => (
                        <option value={city} key={index} className='capitalize '>{city}</option>
                      ))
                    }
                </select>
                {/* handling errors */}
                {
                  formik.touched.from &&
                  formik.errors.from?
                  <p className='text-red-700 font-semibold'>{formik.errors.from}</p> :
                  null
                }
                
            </div>

            <div className=' mb-5 md:mb-0 md:ms-5'>
                <label htmlFor="to">To</label> <br />
                <select name="to" id="to" className='md:py-3 rounded-md bg-white border-blue-300 border-2 py-2 px-4 md:w-60 w-full outline-none' 
                value={formik.values.to} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}>
                    <option >To Station</option>
                    {
                      toLocation.map((city,index) => (
                        <option value={city} key={index} className='captialize'>{city}</option>
                      ))
                    }
                </select>
                {
                  formik.touched.to &&
                  formik.errors.to ?
                  <p className='text-red-700 font-semibold'>{formik.errors.to}</p> :
                  null
                }
            </div>

            <div className=' mb-5 md:mb-0 md:ms-5'>
              <label htmlFor="to">Date</label> <br />
              <input type='date' 
              className='md:py-3 outline-none md:w-60 w-full rounded-md bg-white border-blue-300 border-2 py-2 px-4'
              id='date'
              min={currentDate}
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
                {
                  formik.touched.date &&
                  formik.errors.date ?
                  <p className='text-red-700 font-semibold'>{formik.errors.date}</p> :
                  null
                }
            </div>

            <div className=' mb-2 md:mb-0 md:ms-5'>
              <label htmlFor="to">No. of Person/s</label> <br />
              <input type="text" 
              className='px-4 outline-none md:w-60 rounded-md w-full border-blue-300 border-2 py-2 md:py-3 '
              placeholder='0'
              id='persons'
              min={1}
              value={formik.values.persons}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              {
                formik.touched.persons &&
                formik.errors.persons?
                <p className='text-red-700 font-semibold'>{formik.errors.persons}</p> :
                null
              }
            </div>


            <div className=' md:ms-5'>
              <label htmlFor="to"></label> <br />
              <input type="submit" 
              className='bg-blue-500 text-white px-10 md:py-3 py-5 outline-none rounded shadow w-full md:w-60'
              placeholder='0'
              value={'Search Bus'}
              />
            </div>
            
        </form>
    </div>
    {loading ? <Loading message='Loading buses'/> : ''} 
</div>
  )
}

export default SearchInput