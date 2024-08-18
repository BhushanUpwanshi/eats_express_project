import React from 'react'
import { Link } from 'react-router-dom'

export const PromoBanner = () => {
  return (
    <div className='mt-16 py-12 bg-green-300 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
            <div className='md:w-1/2'>
                <h3 className='text-3xl font-bold mb-6 leading-snug' >Would you like to exolpre Organic Products ?</h3>
                <Link to="/shop" className='block'>
                <button className='font-semibold text-white bg-green-700 px-5 py-2  rounded hover:bg-black transition-all duration-300'>Explore Products</button>
                
                </Link>
            </div>
            <div>
                <img src="https://img.freepik.com/free-vector/group-food-containing-essential-vitamin-k_1308-161798.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1722902400&semt=ais_hybrid" alt='' className='w-60'/>
            </div>
        </div>
    </div>
  )
}
