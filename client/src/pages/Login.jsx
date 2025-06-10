import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppContent } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const login = () => {

  const navigate = useNavigate()

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

  //console.log(backendUrl)

  const location = useLocation(); 
  const [state, setState] = useState(location.state?.action || 'Sign Up');  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();

      axios.defaults.withCredentials = true

      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register', 
          {name, email, password}) 

          if(data.success){
            toast.success('Registration Successful. Please Login to continue')
            navigate('/')
          }  else{
            toast.error(data.message)
          }
      } else{
        const {data} = await axios.post(backendUrl + '/api/auth/login', 
          {email, password}) 

          if(data.success){
            setIsLoggedin(true)
            getUserData()
            navigate('/')
          }else{
            toast.error(data.message)
          }
      }
    } catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0'>
      <div className='bg-[#2E5E4E] p-10 rounded-lg shadow-lg w-full sm:w-96 text-[#2E5E4E] text-sm'>
        <h2 className='text-3xl font-semi-bold text-[#F5E3C7] text-center mb-3'>
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </h2>

        <p className='text-center text-small mb-6 text-[#F5E3C7]'>
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#D1E7D4]'>
            <FontAwesomeIcon icon={faUserCircle} />
            <input 
              onChange={e => setName(e.target.value)} 
              value={name} 
              className='bg-transparent outline-none' 
              type="text" 
              placeholder='Full Name' required>
            </input>
          </div>
          )}
        
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#D1E7D4]'>
            <FontAwesomeIcon icon={faEnvelope} />
            <input 
              onChange={e => setEmail(e.target.value)} 
              value={email} 
              className='bg-transparent outline-none' 
              type="email" 
              placeholder='Email' required>
            </input>
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#D1E7D4]'>
            <FontAwesomeIcon icon={faLock} />
            <input 
              onChange={e => setPassword(e.target.value)} 
              value={password} 
              className='bg-transparent outline-none' 
              type="password" 
              placeholder='Password' required>
            </input>
          </div>

          {state === 'Login' && (
            <p onClick={() => navigate('/reset-password')} className='mb-4 text-[#F5E3C7] cursor-pointer'>Forgot Password?</p>
          )}
          

          <button className='w-full py-2.5 rounded-full bg-[#D1E7D4] text-[#2E5E4E] font-medium'>
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-[#F5E3C7] text-center text-xs mt-4'>
          Already have an account?{' '}
          <span onClick={()=> setState('Login')} className='text-blue-400 cursor-pointer underline'>
            Login
          </span>
          </p>
          ) 
          : (<p className='text-[#F5E3C7] text-center text-xs mt-4'>
          Don't have an account?{' '}
          <span onClick={()=> setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>
            Sign up
          </span>
          </p>
        )}
        
      </div>
    </div>
  )
}

export default login
