import React,{useEffect} from 'react'
import Bus from '../components/Bus'
import buses from '../components/buses'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { object } from 'yup'
// import { setSearch } from '../states/searchReducer/reducer';

function Buses() {
    
  const search = useSelector(state=>state.search.data)
  const navigate = useNavigate()

  // const values = Object.values(search)
  // const isEmpty = values.every(value => !value);
  useEffect(()=>{
    //checking if form is empty is true redirect user to homepage
    const values = Object.values(search)
    const isEmpty = values.every(value => !value);
    if(isEmpty){
      navigate('/')
    }
  },[])
  
  

  return (
    <div className='bg-blue-100 '>
      <div className='container mx-auto'>
          <div>
            <div className='flex justify-between md:mx-0 mb-2'>
              <div>
                <p className='font-bold md:text-3xl text-xl mt-5 text-amber-900'>{search.from} - {search.to}</p>
                <p className='font-bold text-xl text-amber-900 md:my-1 '>{search.date} | No. of Persons {search.persons}</p>
              </div>
            </div>
            <p className='font-semibold '>Departing Bus {search.from} - {search.to}</p>
          </div>
        {/* show buses */}
        {
          buses.length > 0 ? buses.map((bus,index)=>(
            <Bus key={index} bus={bus}/>
          )) : <h1 className='text-5xl font-bold text-center'>No Buses</h1>
        }
      </div>
    </div>

  )
}

export default Buses