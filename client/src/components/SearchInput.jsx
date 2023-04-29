import React from 'react'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { setSearch } from '../states/searchReducer/reducer';
import * as Yup from 'yup'

function SearchInput() {
  const fromCities = ['accra','kumasi', 'tamale','sunyani']
  const toCities = ['accra','Kumasi', 'tamale','sunyani']

  // const search = useSelector(state=>state.search)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // formik
  const formik = useFormik({
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
      dispatch(setSearch(values))
      if(values.from == ''){
        console.log('emptyValues')
      }else{
        navigate('/buses')
      }
    }
  })

  

  return (
    <div className='bg-white backdrop-blur-lg shadow-xl md:absolute md:bottom-[10%] bottom-[2%] inset-x-0 p-2 mx-5 mt-3  md:mx-10 lg:mx-40 rounded '>
    <h3 className='font-semibold text-lg'>Book Ticket</h3>
    <hr />
    <div className='my-5'>
        <form action="" method='get' className='p-2 md:flex flex-wrap md:gap-x-7 md:gap-y-5 ' onSubmit={formik.handleSubmit}>
            <div className=' mb-5 md:mb-0'>
                <label htmlFor="from">From</label> <br />
                <select name="from" id="from" className='md:px-4 md:py-1 bg-white border py-2 md:w-60 w-full rounded-md outline-none' value={formik.values.from} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option >From Station</option>
                    {
                      fromCities.map((city,index) => (
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

            <div className=' mb-5 md:mb-0'>
                <label htmlFor="to">To</label> <br />
                <select name="to" id="to" className='md:px-4 md:py-1 bg-white border py-2 md:w-60 w-full rounded-md outline-none' value={formik.values.to} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option>To Station</option>
                    {
                      toCities.map((city,index) => (
                        <option value={city} key={index} className='capitalize '>{city}</option>
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

            <div className=' mb-5 md:mb-0 '>
              <label htmlFor="to">Date</label> <br />
              <input type='date' 
              className='md:px-4 md:py-1 outline-none md:w-60 w-full bg-white border border-2-1 py-2'
              id='date'
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

            <div className=' mb-5 md:mb-0'>
              <label htmlFor="to">No. of Person/s</label> <br />
              <input type="text" 
              className='md:px-4 px-1 outline-none w-full border py-2'
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

            <div>
              <label htmlFor="to"></label> <br />
              <input type="submit" 
              className='bg-yellow-500 text-white px-10 md:py-2 py-5 outline-none rounded shadow w-full md:w-60'
              placeholder='0'
              value={'Search Bus'}
              
              />
            </div>

          
            {/* <Calendar/> */}
            
        </form>


    </div>
</div>
  )
}

export default SearchInput