import React, { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles, faMagicWandSparkles, faSprayCanSparkles, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


const Header = () => {

  const {userData} = useContext(AppContent)
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-[#3A3A3A]'>
      <h1 className='flex items-center gap-2 text-[#3A3A3A] text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Designer'}!</h1>
      <h2 className='text-3xl sm:text-5xl text-[#3A3A3A] font-semibold mb-4'>Welcome to Larana</h2>
      <p className='mb-8 max-w-md'>Design your dream outfit with AI-powered precision. Customize styles, fabrics, and patterns — fashion at your fingertips.</p>
      <button onClick={() => navigate('/result')} className='sm:text-lg text-[#D1E7D4] bg-[#2E5E4E] hover:bg-[#1E4638] w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
        Generate Designs
        <FontAwesomeIcon className='h-6' icon={faMagicWandSparkles}></FontAwesomeIcon>
      </button>
    </div>
  )
}

export default Header
