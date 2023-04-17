import React from 'react'
import Card from './Card'

function Features({title}) {
  return (
    <div className=' mt-40 container mx-auto'>
       <h1 className='text-center text-5xl font-bold'>{title}</h1>
       <div className='md:flex gap-5 p-5 md:mt-16'>

            <Card title='Best Guide' content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusamus porro accusantium a quia optio, magnam deserunt fuga? Cumque doloremque velit eum esse sint praesentium.'/>
            <Card title='Best Guide' content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusamus porro accusantium a quia optio, magnam deserunt fuga? Cumque doloremque velit eum esse sint praesentium.'/>
            <Card title='Best Guide' content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusamus porro accusantium a quia optio, magnam deserunt fuga? Cumque doloremque velit eum esse sint praesentium.'/>
            <Card title='Best Guide' content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusamus porro accusantium a quia optio, magnam deserunt fuga? Cumque doloremque velit eum esse sint praesentium.'/>

       </div>
    </div>
  )
}

export default Features