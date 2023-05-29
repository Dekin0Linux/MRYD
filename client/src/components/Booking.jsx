import React,{useState} from 'react'
import Ticket from './Ticket'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import axios from 'axios'
import Loading from './Loading'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


function Booking() {
    const [ticket,setTicket] = useState([])
    const [ticketId,setTicketID] = useState('')
    const [loading,setLoading] = useState(false)


    const handleTicketSubmit= async(e)=>{
        e.preventDefault()
        setLoading(true)
        await axios.post('https://myrydgh.onrender.com/booking/book',{pin:ticketId})
        .then((resp)=>{
            if(ticketId == resp.data[0].booking_number){
                setTicket(resp.data)
                setLoading(false)
            }else{
                alert('Incorrect Booking Number')
            }
        })
        .catch(err=>{
            setLoading(false)
            setTicket([])
            MySwal.fire({
                title : <h2>Invalid Booking Number</h2>,
                text : 'Please check your booking number and try again!!!',
                icon : 'error'
            })
        })
        
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
            doc.save(`${ticketId}.pdf`)
        }).catch(err=>alert('There was an error getting your ticket'))
    }

    
    const handlePrint = () => {
        const captureScreen = document.querySelector('.tickets');
        html2canvas(captureScreen)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const printWindow = window.open('', '_blank'); 
            printWindow.document.open();
            printWindow.document.write('<html><head><title>Print Ticket</title></head><body>');
            printWindow.document.write('<img src="' + imgData + '" style="width:100%;height:auto;">');
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            // Delay opening the print window
            setTimeout(() => {
                printWindow.print();
            }, 100);
        });
    };



  return (
    <div className='h-[80vh] md:p-10 p-5 flex flex-wrap'>
        <div className='md:w-1/2 w-full mb-5 static'>
            <form onSubmit={handleTicketSubmit}>
                {ticket.price}
                <label htmlFor="" className='font-bold'>Enter booking Number</label> <br />
                <input type="text" 
                value={ticketId}
                required
                className='lg:w-1/2 w-full p-2 shadow border-blue-400 border-2 my-1 font-semibold text-lg' 
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
                        <button className='bg-blue-400 text-white p-2 rounded-md text-center' onClick={handlePrint}>Print</button>

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

        { loading ? <Loading message='Searching Ticket'/> : ''}
    </div>
  )
}

export default Booking