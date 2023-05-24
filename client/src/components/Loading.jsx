import React from 'react'
import { Loader } from 'rsuite';
import "rsuite/dist/rsuite.css";

function Loading() {
  return (
    <div 
    className='w-full h-screen fixed z-50 top-0 left-0 flex justify-center items-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100 text-white'>
        <Loader size="lg" content="Loading Buses" vertical/>
    </div>
  )
}

export default Loading