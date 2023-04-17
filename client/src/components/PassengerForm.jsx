import React from 'react'

function PassengerForm({num}) {
    const title = ['Mr','Mrs','Miss','Dr']
  return (
    <div className='border my-5 shadow'>
        <p className='my-2 font-bold'>Passenger No. {num+1}</p>
        <div className='md:flex flex-wrap gap-5 mb-5 mx-2 '>
            <div className='my-2'>
                <label htmlFor="">Title</label> <br />
                <select name="" id="" className='my-1 border md:w-60 w-full px-4 py-2 border-slate-400 bg-white'>
                    <option value="">Select</option>
                    {
                        title.map((user,index)=>(
                            <option value={user} key={index}>{user}</option>
                        ))
                    }
                </select>
            </div>
            <div className='my-2'>
                <label htmlFor="">First Name</label><br />
                <input type="text" placeholder='Enter' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize'/>
            </div>
            <div className='my-2'>
                <label htmlFor="">Last Name</label><br />
                <input type="text" placeholder='Enter' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize'/>
            </div>
            <div className='my-2'>
                <label htmlFor="">Age</label><br />
                <input type="number" placeholder='Enter' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize'/>
            </div>
            <div className='my-2'>
                <label htmlFor="">Phone</label><br />
                <input type="number" max={'10'} placeholder='Enter' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize'/>
            </div>
        
        </div>
    </div>
  )
}

export default PassengerForm