import React, { useContext } from 'react'
import { plans } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';

const BuyCredit = () => {

  const navigate = useNavigate()

  const {userData} = useContext(AppContent)
  return (
    <div>
      <div className='flex items-center justify-between px-4 sm:px-4 py-4'>
        <Link to='/'>
          <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
        </Link>
        <Navbar/>
      </div>
      <div className='min-h-[80vh] text-center pt-14 mb-10'>
        <button className='border border-[#2E5E4E] px-10 py-2 text-[#3A3A3A] rounded-full mb-6'>Our Plans</button>
        <h1 className='text-center text-3xl text-[#3A3A3A] font-medium mb-6 sm:mb-10'>Choose Plan</h1>
        
        <div className='flex flex-wrap justify-center gap-6 text-left'>
          {plans.map((item, index)=>(
            <div key={index}
            className='bg-[#2E5E4E] drop-shadow-sm border rounded-lg py-12 px-8 text-[#F5E3C7] hover:scale-105 transition-all duration-500'>
              <p className='mt-3 mb-1 text-[#D1E7D4] font-semibold'>{item.id}</p>
              <p className='text-sm'>{item.desc}</p>
              <p className='mt-6'>
                <span className='text-3xl font-medium'>$ {item.price} </span> / {item.credits} credits
              </p>
              {!userData ? ( 
                  <button onClick={()=> navigate('/login')} className='w-full bg-[#D1E7D4] text-[#2E5E4E] mt-8 text-sm rounded-md py-2.5 min-w-52'>
                    Get Started
                  </button>
                ) :
                (
                  <button className='w-full bg-[#D1E7D4] text-[#2E5E4E] mt-8 text-sm rounded-md py-2.5 min-w-52'>
                    Make Payment
                  </button>
                )
              } 
            </div> 
          ))}
        </div>
      </div>
    </div>
  )
}

export default BuyCredit
