import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import {FaTrash} from 'react-icons/fa'


function PassengerForm({num,handlePassengerData}) {
    const titles = ['Mr','Mrs','Miss','Dr'] //title

    const Luggage = [
        { name: 'Ghana Must go(Big)', price: 30, quantity: 1 },
        { name: 'Big Bag(40)', price: 20, quantity: 1 }
    ];

    const pickUpLocation = [
        'Achimota(New Station)',
        "Suhum (Over-head)"
    ]

    const [selectCount, setSelectCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleAddLuggage = () => {
    if(selectCount <= 2){
        setSelectCount(prevCount => prevCount + 1);
        setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions]);
    }else{
        alert("You can add 3 luggage bags");
        return
    }
    
  };

const handleDelete = (selectIndex) => {
setSelectedOptions(prevSelectedOptions => {
    const updatedSelectedOptions = [...prevSelectedOptions];
    updatedSelectedOptions.splice(selectIndex, 1);
    setSelectCount(prevCount => prevCount - 1);
    return updatedSelectedOptions;
    // setSelectedOptions(...updatedSelectedOptions)
});
};


    //STATES
    const [title,setTitle] = useState('')
    const [fullname,setFullname] = useState('')
    const [phone,setPhone] = useState('')
    const [pickup,setPickup] = useState('')



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
                const selectedName = value;
                const selectedOption = Luggage.find(item => item.name === selectedName);
                setSelectedOptions(prevSelectedOptions => {
                const updatedSelectedOptions = [...prevSelectedOptions];
                updatedSelectedOptions[index] = { ...selectedOption };
                return updatedSelectedOptions;
                });
                break;

            case "quantity":
                const quantity = parseInt(value);
                    setSelectedOptions(prevSelectedOptions => {
                    const updatedSelectedOptions = [...prevSelectedOptions];
                    updatedSelectedOptions[index].quantity = quantity;
                    return updatedSelectedOptions;
                });
                break;
            default:
                break;
        }

         // update parent state with passenger data
        handlePassengerData(num, {
            title,
            fullname,
            pickup,
            phone,
            luggage : selectedOptions,
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

            <div className='my-2'>
                <label htmlFor=""></label><br />
                <button type="button" onClick={handleAddLuggage}  className='my-1 shadow bg-blue-400 rounded text-white md:w-40 w-full px-4 py-2'> + Add Luggage</button>
            </div>


            {/* handling luggage */}
            <div>
            {[...Array(selectCount)].map((_, index) => (
                <div key={index}>
                <label htmlFor="">Luggage {index + 1}</label> <br />
                <select
                    name='luggage'
                    value={selectedOptions[index]?.name || ''}
                    onChange={event => handleFormChange(event, index)}
                    className='my-1 border md:w-60 w-40 px-30 py-1 border-slate-400 bg-white rounded'
                >
                    <option value="" className='py-2'>Select Luggage</option>
                    <hr  />
                    {Luggage.map(item => (
                    <option key={item.name} value={item.name}>
                        {item.name} --- (GH{item.price})
                    </option>
                    ))}
                </select>
                <input
                    type="number"
                    name='quantity'
                    value={selectedOptions[index]?.quantity || ''}
                    onChange={event => handleFormChange(event, index)}
                    // disabled={!selectedOptions[index]}
                    min="1"
                    required
                    className='my-1 border border-slate-400 md:w-20 w-3 px-4 py-1 rounded mx-1'
                />
                <button onClick={()=>handleDelete(selectedOptions[index])} className='my-1 border-0 md:w-10 px-3 py-1 rounded bg-red-600 text-white '>X</button>
                </div>
            ))}
            </div>

        </div>
        {
        selectCount >=1 ?
        <p className='text-red-500'>Note : Extra luggages should be reported to the bus station before boarding</p>
        : " "
        }
    </div>
  )
}

export default PassengerForm