import React, { useContext, useState, useEffect } from 'react';
import { FaHome, FaPlus, FaSearch } from 'react-icons/fa';
import icon from '../assets/icon.png';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const {designs, setIsViewHistory, setSelectedDesign} = useContext(AppContent)

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate()

  useEffect(() => {
    console.log(designs);
  }, [designs]);

  const showHistory = (design) => {
    setIsViewHistory(true)
    setSelectedDesign(design)
  }

  const hideHistory = () => {
    setIsViewHistory(false)
  }
  

  return (
    <div className={`h-screen bg-[#2E5E4E] transition-all ease-in-out duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-between items-center p-4">
        <div onClick={toggleSidebar} className="w-14 min-w-[2rem]">
          <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
        </div>
        <div className='ml-4 mr-2 flex'>
          <button className={`bg-transparent mr-4 text-[#D1E7D4] font-bold text-2xl ${collapsed ? 'hidden' : 'block'}`} onClick={hideHistory}>
            <FaPlus></FaPlus>
          </button>
            
          <button className={`text-[#D1E7D4] text-2xl ${collapsed ? 'hidden' : 'block'}`} onClick={() => navigate('/')}>
            <FaHome />
          </button>
        </div>
      </div>

      <div className={`text-[#D1E7D4] ${collapsed ? 'hidden' : 'block'}`}>
        <div className="flex justify-center font-bold mt-6">
          <h1 className='text-[#F5E3C7] text-2xl mt-5'>Your Designs</h1>
        </div>
        <div className='mt-3'>
          {designs.map((design) => (
            <div key={design._id} className="hover:bg-[#3b7d6a] p-4 cursor-pointer" onClick={() => showHistory(design)}>
              {design.designName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
