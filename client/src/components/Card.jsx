import React from 'react'

function Card({title,content}) {
  return (
    <div className='p-7 shadow-lg rounded bg-white text-center mb-2 md:mb-0'>
        <h3 className='font-semibold text-2xl'>{title}</h3>
        <p>{content}</p>
    </div>
  )
}

export default Card