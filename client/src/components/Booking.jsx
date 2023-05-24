import React,{useState} from 'react'
import Ticket from './Ticket'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import axios from 'axios'



function Booking() {
    const [ticket,setTicket] = useState([])
    const [ticketId,setTicketID] = useState('')


    const handleTicketSubmit= async(e)=>{
        e.preventDefault()
        await axios.post('https://myrydgh.onrender.com/booking/book',{pin:ticketId})
        .then((resp)=>{
            setTicket(resp.data)
        })
        .catch(err=>console.log(err))
        
    }

    const ticketDownload=()=>{
            const captureScreen = document.querySelector('.tickets')
            //CAPTURE SCREEN
            html2canvas(captureScreen).then((canvas)=>{
                const imgData = canvas.toDataURL('img/png')

            // CALCULATE ASPECT RATIO
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const aspectRatio = imgWidth / imgHeight;


            // CALCULATE SCALED DIMENSIONS
            const maxPdfWidth = 210; // Maximum width in mm
            const maxPdfHeight = 297; // Maximum height in mm (A4 height)
            const pdfWidth = Math.min(maxPdfWidth, maxPdfHeight * aspectRatio);
            const pdfHeight = pdfWidth / aspectRatio;


            //CREATING PDF FILE
            const doc = new jsPDF({
                orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
                unit: 'mm',
                format: [pdfWidth, pdfHeight],
            });

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth , pdfHeight)
            doc.save('ticket.pdf')

        })
    }



  return (
    <div className='h-[80vh] md:p-10 p-5 flex flex-wrap'>
        <div className='md:w-1/2 w-full mb-5 static'>
            <form onSubmit={handleTicketSubmit}>
                {ticket.price}
                <label htmlFor="" className='font-bold'>Enter booking Number</label> <br />
                <input type="text" 
                value={ticketId}
                className='lg:w-1/2 w-full p-2 shadow border-blue-400 border-2 my-1' 
                onChange={(e)=>setTicketID(e.target.value)}
                
                /> <br />

                <button type="submit" className='md:w-40 w-full rounded font-semibold shadow-md p-2 bg-blue-400 my-1 text-white'>Search</button>
            </form>
        </div>

        {
            ticket.length > 0 && (
                <div className='md:w-1/2 w-full md:p-5'>

                    <div className='flex justify-between items-center my-2'>
                        <p className='font-bold'>TICKETS</p>
                        <button 
                        className='bg-blue-400 text-white p-2 rounded-md text-center'
                        onClick={ticketDownload}
                        >
                            Download Ticket
                        </button>
                    </div>

                    <div className='border-dashed border-2 md:p-5 p-2 rounded-lg tickets'>
                        <div className='flex flex-wrap md:gap-10 gap-x-10 gap-y-7'>
                            <div>
                                <p>Booking # </p>  
                                <span className='font-bold text-blue-500'>{ticket[0].booking_number}</span> 
                            </div>

                            <div>
                                <p>Status  : </p> 
                                <span 
                                className='font-bold text-blue-500 capitalize'>
                                    {ticket[0].booking_status}
                                </span>
                            </div>


                            <div>
                                <p>Bus # :</p>
                                <span className='font-bold text-blue-500'>{ticket[0].bus_id.bus_number}</span>
                            </div>


                            <div>
                                <p>Station Name :</p>
                                <span className='font-bold text-blue-500'>{ticket[0].bus_id.station_name}</span>
                            </div>
                        
                        </div>
                        <div className='my-5 overflow-auto'>
                            {
                                ticket[0].passengers.map((passenger,index)=>(
                                    <Ticket passenger={passenger} ticket={ticket}/>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>

            )
        }

        
        
        

    </div>
  )
}

export default Booking