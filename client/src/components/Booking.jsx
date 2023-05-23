import React,{useState} from 'react'
import Ticket from './Ticket'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'



function Booking() {

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
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = pdfWidth / aspectRatio;
        const scale = 1.0; // Adjust the scale factor as needed




            //CREATING PDF FILE
            const doc = new jsPDF('p','mm','a4')
            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth*scale , pdfHeight*scale)
            doc.save('ticket.pdf')

        })
    }



  return (
    <div className='h-[80vh] md:p-10 p-5 flex flex-wrap'>
        <div className='md:w-1/2 w-full mb-5'>
            <form>
                <label htmlFor="" className='font-bold'>Enter booking Number</label> <br />
                <input type="text" className='lg:w-1/2 w-full p-2 shadow border-blue-400 border-2 my-1' /> <br />
                <button type="button" className='md:w-40 w-full rounded font-semibold shadow-md p-2 bg-blue-400 my-1 text-white'>Search</button>
            </form>
        </div>

        
        
        <div className='md:w-1/2 w-full md:p-3'>
            <div className='flex justify-between items-center my-2'>
                <p className='font-bold'>TICKETS</p>
                <button 
                className='bg-blue-400 text-white p-2 rounded-md text-center'
                onClick={ticketDownload}

                >
                    Download Ticket
                </button>
            </div>

            <div className='border-dashed border-2 p-2 rounded-lg tickets'>
                <div className='flex flex-wrap md:gap-10 gap-x-5 gap-y-2'>

                    <p>Booking # : <span className='font-bold text-blue-500'>OMI2g2My</span> </p>
                    <p>Status  : <span className='font-bold text-blue-500'>Succes</span></p>
                    <p>Bus # : <span className='font-bold text-blue-500'>AG-2033-23</span></p>
                    <p>Station Name : <span className='font-bold text-blue-500'>VVIP</span></p>
                
                </div>
                <div className='my-5 overflow-auto h-[65vh]'>
                    
                    
                    <Ticket/>
                    <Ticket/>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default Booking