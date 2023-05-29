import React from 'react'
import { Loader } from 'rsuite';
import "rsuite/dist/rsuite.css";

function Loading({message}) {
  return (
    <div 
    className='w-full h-full z-50 fixed top-0 left-0 flex justify-center items-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100 text-blue-500 font-semibold text-xl'>
        <Loader size="lg" content={message} vertical speed='fast'/>
    </div>
  )
}

export default Loading