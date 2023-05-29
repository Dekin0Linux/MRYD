import React,{useEffect, useState} from 'react'
import Bus from '../components/Bus'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loading from '../components/Loading'

const MySwal = withReactContent(Swal)

function Buses() {
  const [buses,setBuses] = useState([]) // array to keep available buses
  const [loading,setLoading] = useState(true) 
    
  const search = useSelector(state=>state.search.data) //global state search input data
  const navigate = useNavigate()


  //fucntion to run out search 
  const userSearch = async ()=> {
      await axios.get('https://myrydgh.onrender.com/bus/search',
        {params:{
            depature : search.from,
            arrival : search.to,
            dep_date : search.date
          }
        }
      ).then(resp => {
        setBuses(resp.data)
        setLoading(false)
      })
      .catch(err=>{
        MySwal.fire({
          title : <h2>Sever Error</h2>,
          text : 'Sorry , We have trouble connection to our server',
          icon : 'error'
        })
      })
  }
  //using fetch
  

  useEffect(()=>{

    userSearch()
    //checking if form is empty is true redirect user to homepage
    const isEmpty = Object.values(search).every(value=>value)
    if(!isEmpty){
        navigate('/')
    }

  },[buses])
  
  

  return (
    <div className=''>
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
         buses.length > 0 ? 
         buses.map((bus,index)=>(
            <Bus key={index} bus={bus}/>
          ))
          :
          (<div className='text-center'>
              <p className='text-center font-bold p-5 text-3xl text-red-600'>{loading ? 'Loading !!!':'No buses for this location'}</p>
              <button className='px-3 py-1 bg-blue-700 text-white rounded' onClick={()=>navigate('/')}>Search Again</button>
            </div>
          )
        }
      </div>

      {loading ? <Loading message={'Searching Buses'}/> :''}

    </div>

  )
}

export default Buses