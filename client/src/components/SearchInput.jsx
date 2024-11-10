import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../states/searchReducer/reducer';
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Loading from './Loading';
import Select from 'react-select';
import { BASE_URL } from '../apiUrl';

function SearchInput() {
  const [fromLocation, setFromLocation] = useState([])
  const [toLocation, setToLocation] = useState([])
  const [loading, setLoading] = useState(true)

  const currentDate = new Date().toISOString().split('T')[0]; //currentdate

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getLocations = async () => {
    await axios.get(`${BASE_URL}/bus`)
      .then(resp => {
        if (resp.status == 200) {
          let fromStations = (resp.data.map(station => station["depature_loc"]))
          let arrivalStations = (resp.data.map(station => station["arrival_loc"]))
          let filterFromLoc = [...new Set(fromStations)]
          let filterToLoc = [...new Set(arrivalStations)]
          setFromLocation(filterFromLoc)
          setToLocation(filterToLoc)
          setLoading(false)

          // const SearchFromArray = filterFromLoc.map((arr, index) => {
          //   return { value: arr, label: arr }
          // })
          // const SearchToArray = filterFromLoc.map((arr, index) => {
          //   return { value: arr, label: arr }
          // })

          // setFromLocation(SearchFromArray)
          // setToLocation(SearchToArray)

        }
      }).catch(err => console.log(err))
  }



  //notifications
  const notify = (msg, type) => {
    if (type == 'invalid') {
      toast.warning(msg, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  // formik
  const formik = useFormik({
    //field states
    initialValues: {
      from: '',
      to: '',
      date: '',
      persons: 1
    },

    validationSchema: Yup.object({
      from: Yup.string().required("This field is required"),
      to: Yup.string().required("This field is required"),
      date: Yup.string().required("This field is required"),
      persons: Yup.number().required("This field is required"),
    }),

    onSubmit: (values) => {
      if (values.from === values.to) {
        notify('Invalid location', 'invalid')
        return
      } else {
        dispatch(setSearch(values))
        navigate('/buses')
      }
    }
  });


  useEffect(() => {
    getLocations()
  }, [])




  return (
    <div id='searchBox' className=' backdrop-blur-sm shadow-2xl shadow-blue-100  bg-white/80 container mx-auto p-5 rounded-lg  z-50'>
      <ToastContainer />
      <form className='grid lg:grid-cols-5 md:grid-cols-2 lg:gap-5 md:gap-6 gap-4 grid-cols-1' onSubmit={formik.handleSubmit} >

        <div className='w-auto'>

          <label htmlFor="from">From</label> <br />
            <select name="from" id="from" className='md:py-3 rounded-md bg-white border-blue-300 border-2 py-2 px-4 w-full outline-none'
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
              <option>From Station</option>
              {
                fromLocation.map((city, index) => (
                  <option value={city} key={index} className='capitalize '>{city}</option>
                ))
              }
            </select>
            {
              formik.touched.from &&
                formik.errors.from ?
                <p className='text-red-700 font-light'>{formik.errors.from}</p> :
                null
            }
        </div>

        <div className=''>
          <label htmlFor="to">To</label> <br />
          <select name="to" id="to" className='md:py-3 rounded-md bg-white border-blue-300 border-2 py-2 px-4 w-full outline-none'
            value={formik.values.to}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>
            <option >To Station</option>
            {
              toLocation.map((city, index) => (
                <option value={city} key={index} className='captialize'>{city}</option>
              ))
            }
          </select>
          {
            formik.touched.to &&
              formik.errors.to ?
              <p className='text-red-700 font-light'>{formik.errors.to}</p> :
              null
          }
        </div>

        <div className=''>
          <label htmlFor="to">Date</label> <br />
          <input type='date'
            className='md:py-3 outline-none w-full rounded-md bg-white border-blue-300 border-2 py-2 px-4'
            id='date'
            min={currentDate}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.date &&
              formik.errors.date ?
              <p className='text-red-700 font-light'>{formik.errors.date}</p> :
              null
          }
        </div>

        <div className=''>
          <label htmlFor="to">No. of Person/s</label> <br />
          <input type="text"
            className='px-4 outline-none rounded-md w-full border-blue-300 border-2 py-2 md:py-3 '
            placeholder='0'
            id='persons'
            min={1}
            value={formik.values.persons}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.persons &&
              formik.errors.persons ?
              <p className='text-red-700 font-light'>{formik.errors.persons}</p> :
              null
          }
        </div>


        <div className=''>
          <label htmlFor="to"></label> <br />
          <input type="submit"
            className='bg-blue-500 text-white px-10 py-3 outline-none rounded shadow-xl shadow-blue-100 w-full'
            placeholder='0'
            value={'Search Bus'}
          />
        </div>

      </form>

      {loading ? <Loading message='Loading buses' /> : ''}
    </div>
  )
}

export default SearchInput