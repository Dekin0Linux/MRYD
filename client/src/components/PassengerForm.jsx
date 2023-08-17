import React, { useState } from 'react'
import { nanoid } from 'nanoid'


function PassengerForm({num,handlePassengerData}) {
    const titles = ['Mr','Mrs','Miss','Dr'] //title

     //STATES
    const [title,setTitle] = useState('')
    const [fullname,setFullname] = useState('')
    const [phone,setPhone] = useState('')
    const [pickup,setPickup] = useState('')
    const [luggage,setLuggage] = useState([])

    const Luggage = [
        { name: 'Ghana Must go(Big)', price: 30, quantity: 1 },
        { name: 'Big Bag(40)', price: 20, quantity: 1 },
        { name: 'Tv', price: 25, quantity: 1 },
        { name: 'Small bag', price: 10, quantity: 1 },
        { name: 'Mini Bag', price: 12 , quantity: 1 }
    ];

    const pickUpLocation = [
        'Achimota(New Station)',
        "Suhum (Over-head)"
    ]

    // const [selectCount, setSelectCount] = useState(0);
    // const [selectedOptions, setSelectedOptions] = useState([]);




    //HANDLE INPUT CHANGE
    const handleFormChange=(e,index)=>{
        const {name,value} = e.target
        // update state based on input name attribute
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "fullname":
                setFullname(value);
                break;
            case "pickup":
                setPickup(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "luggage":
                const newItem = JSON.parse(value)
                setLuggage([...luggage,newItem]);
                break;
                
            default:
                break;
        }


        handlePassengerData(num, {
            title,
            fullname,
            pickup,
            phone,
            luggage : luggage,
            ticketId : nanoid(6)
        });

    }

     // update parent state with passenger data
     


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
                <label htmlFor="">Full Name </label><br />
                <input type="text" name='fullname' value={fullname} onChange={handleFormChange} placeholder='Enter' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize' required/>
            </div>

            <div className='my-2'>
                <label htmlFor="">Pick me at</label><br />
                <select name="pickup" value={pickup} id="" onChange={handleFormChange} className='my-1 border md:w-60 w-full px-4 py-2 border-slate-400 bg-white'>
                    <option value="">Station</option>
                    {
                        pickUpLocation.map((locationName,index)=>(
                            <option value={locationName} key={index}>{locationName}</option>
                        ))
                    }
                </select>
            </div>

            <div className='my-2'>
                <label htmlFor="">Phone (Optional)</label><br />
                <input type="number" name='phone' value={phone} onChange={handleFormChange} maxLength={'10'} placeholder='XXXXXXXXXX' className='my-1 border border-slate-400 md:w-60 w-full px-4 py-2 capitalize' />
            </div>

            {/* handling luggage */}

            {/* end of luggage handle */}
            

        </div>
    </div>
  )
}

export default PassengerForm