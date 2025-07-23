import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png';
import Navbar from '../components/Navbar';
import { AppContent } from '../context/AppContext';

const Settings = () => {
  const {userData, updateUserData, getUserData} = useContext(AppContent)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onUpdateHandler = async (e, name, password) => {
    e.preventDefault();

    if(name || password){
        await updateUserData(name, password)
    }

    await getUserData()
  }

  useEffect(() => {
    if (userData.name) setName(userData.name);
  }, [userData]);

  return (
    <div className='relative h-screen flex items-center justify-center px-4'>
        
        <div className='absolute top-6 left-4'>
            <Link to='/'>
                <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
            </Link>
        </div>

        <div className="fixed top-4 right-4 z-50">
            <Navbar />
        </div>
        
        
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#2E5E4E] mb-6 text-center">User Settings</h2>
            <form className="space-y-5">
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                <input 
                type="email" 
                value={userData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Name</label>
                <input 
                type="text" 
                value={name || userData.name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-1">Password</label>
                <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-[#2E5E4E] text-white font-semibold py-2 rounded-md hover:bg-[#244b3d] transition duration-200"
                onClick={(e) => onUpdateHandler(e, name, password)}
            >
                Save Changes
            </button>
            </form>
        </div>
    </div>
  )
}

export default Settings
