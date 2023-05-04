import React, { useState } from 'react'
import { nanoid } from 'nanoid'

function PassengerForm({num,handlePassengerData}) {
    const titles = ['Mr','Mrs','Miss','Dr'] //title

    const [title,setTitle] = useState('')
    const [fullname,setFullname] = useState('')
    const [age,setAge] = useState('')
    const [phone,setPhone] = useState('')
    // const [ticketNumber,setTicketNumber] = useState('')

    const handleFormChange=(e)=>{
        const {name,value} = e.target
        // update state based on input name attribute
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "fullname":
                setFullname(value);
                break;
            case "age":
                setAge(value);
                break;
            case "phone":
                setPhone(value);
                break;
            default:
                break;
        }

        // update parent state with passenger data
        handlePassengerData(num, {
            title,
            fullname,
            age,
            phone,
            ticketId : nanoid(6)
        });

    }




  return (
    <div className='border border-blue-400 my-5 shadow rounded p-3'>
        <p className='my-2 font-bold px-2'>Passenger No. {num +1}</p>
        <div className='md:flex flex-wrap gap-5 mb-5 mx-2 '>
            <div className='my-2'>
                <label htmlFor="">Title</label> <br />
                <select name="title" value={title} id="" onChange={handleFormChange} className='my-1 border md:w-60 w-full px-4 py-2 border-slate-400 bg-white'>
                    <option value="">Select</option>
                    {
                        titles.map((user,index)=>(
                            <option value={user} key={index}>{user}</option>
                        ))
                    }
                </select>
            </div>
            <div className='my-2'>
                <label htmlFor="">Full Name</label><br />
                <input type="text" name='fullname' value={fullname} onChange={handleFormChange} placeholder='Enter' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize' required/>
            </div>
            <div className='my-2'>
                <label htmlFor="">Age</label><br />
                <input type="number" name='age' value={age} onChange={handleFormChange} placeholder='Enter' maxLength={2} className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize' required/>
            </div>
            <div className='my-2'>
                <label htmlFor="">Phone (Optional)</label><br />
                <input type="number" name='phone' value={phone} onChange={handleFormChange} maxLength={'10'} placeholder='XXXXXXXXXX' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize' />
            </div>
        </div>
    </div>
  )
}

export default PassengerForm