import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { AppContent } from '../context/AppContext'
import icon from '../assets/icon.png';

const home = () => {
  const {userData} = useContext(AppContent)
  return (
    <div>
      <div className='flex items-center justify-between px-4 sm:px-4 py-4'>
        <Link to='/'>
          <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
        </Link>
        <Navbar/>
      </div>
      <Header></Header>
    </div>
  )
}

export default home
