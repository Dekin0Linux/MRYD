import React,{useEffect, useState} from 'react'
import Bus from '../components/Bus'
// import buses from '../components/buses'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { setSearch } from '../states/searchReducer/reducer';

function Buses() {
  const [buses,setBuses] = useState([]) // array to keep available buses
    
  const search = useSelector(state=>state.search.data)
  const navigate = useNavigate()

  //fucntion to run out search 
  const userSearch = async ()=> {
      await axios.get('http://localhost:4000/bus/search',
        {params:{
            depature : search.from,
            arrival : search.to,
            dep_date : search.date
          }
        }
        
      ).then(resp => {setBuses(resp.data)} )
      .catch(err=>console.log('Invalid Query'))
  }

  useEffect(()=>{
    userSearch()
    //checking if form is empty is true redirect user to homepage
    const values = Object.values(search)
    const isEmpty = values.every(value => !value);
    if(isEmpty){
      navigate('/home')
    }
  },[])
  
  

  return (
    <div className='bg-blue-100 '>
      <div className='container md:mx-auto pb-10 px-5'>
          <div>
            <div className='flex justify-between md:mx-0 mb-2'>
              <div>
                <p className='font-bold md:text-3xl text-xl mt-5 text-amber-900 capitalize'>{search.from} - {search.to}</p>
                <p className='font-bold text-xl text-amber-900 md:my-1 '>{search.date} | No. of Persons {search.persons}</p>
              </div>
            </div>
            <p className='font-semibold '>Departing Bus {search.from} - {search.to}</p>
          </div>
        {/* show buses */}

        {
          buses.length > 0  ? buses.map((bus,index)=>(
            <Bus key={index} bus={bus}/>
          )):(<div className='text-center'>
              <p className='text-center font-bold p-5 text-3xl text-red-600'>Sorry No Buses Found !!!</p>
              <button className='px-3 py-1 bg-blue-700 text-white rounded' onClick={()=>navigate('/home')}>Search Again</button>
            </div>)
        }
      </div>
    </div>

  )
}

export default Buses