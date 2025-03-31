import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';


const Navbar = () => {

  const navigate = useNavigate();
  const {userData, backendUrl, setUserData, setIsLoggedin, credit} = useContext(AppContent)

  const handleLoginClick = () => {
    navigate('/login', { state: { action: 'Login' } });
  }

  const handleRegisterClick = () => {
    navigate('/login', { state: { action: 'Sign Up' } });
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true

      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-between px-4 sm:px-4 py-4'>
      {userData ? (
        <div className='flex items-center gap-2 sm:gap-3'>
          <button onClick={()=>navigate('/buy')}
            className='flex items-center gap-2 bg-[#AACBAF] px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
            <FontAwesomeIcon className='text-yellow-600' icon={faStar} />
            <p className='text-xs sm:text-sm font-medium text-[#3A3A3A]'>Credits left: {credit}</p>
          </button>
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-[#2E5E4E] text-[#D1E7D4] relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-[#AACBAF] text-sm'>
                {!userData.isAccountVerified &&  <li onClick = {sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
                <li onClick={logout} className='py-1 px-2 hover:bg-[#96BFA1] cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
          </div>
        </div>
        
      ) : (
          <div className='flex items-center justify-between px-4 sm:px-4 py-4'>
            <div className='flex items-center gap-2 sm:gap-5'>
              <p onClick={()=>navigate('/buy')} className='cursor-pointer text-[#3A3A3A]'>Pricing</p>
              <button onClick={handleLoginClick} 
                className='bg-[#2E5E4E] hover:bg-[#1E4638] text-[#D1E7D4] font-bold py-2 px-4 rounded-full'>Login
              </button>

              <button 
                onClick={handleRegisterClick} 
                className='bg-transparent border-2 border-[#2E5E4E] text-[#2E5E4E] font-bold py-2 px-4 rounded-full hover:bg-[#D1E7D4] transition-all duration-300'>
                Register
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Navbar
