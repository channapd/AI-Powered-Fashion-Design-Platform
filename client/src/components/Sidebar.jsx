import React, { useContext, useState, useEffect } from 'react';
import { FaHome, FaPlus, FaSearch } from 'react-icons/fa';
import icon from '../assets/icon.png';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const {designs, setIsViewHistory, setSelectedDesign, setIsImageLoaded} = useContext(AppContent)

  const [collapsed, setCollapsed] = useState(false);

  const [showSearch, setShowSearch] = useState(false)

  const [searchContent, setSearchContent] = useState("")

  const [filteredDesigns, setFilteredDesigns] = useState([])

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSearchbar = async () => {
    if(showSearch){
      setShowSearch(false)
      setSearchContent("")
      setFilteredDesigns(designs)
    } else {
      setShowSearch(true)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    setFilteredDesigns(designs);
  }, [designs]);

  const showHistory = (design) => {
    setIsViewHistory(true)
    setSelectedDesign(design)
  }

  const hideHistory = () => {
    setIsViewHistory(false)
    setIsImageLoaded(false)
  }

  const handleSearch = (e, searchContent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if(searchContent === ""){
        setFilteredDesigns(designs)
      } else {
        const keyword = searchContent.toLowerCase().trim();
        const matches = designs.filter((design) =>
          design.designName.toLowerCase().includes(keyword)
        );
        setFilteredDesigns(matches); 
      }
    }
  }
  

  return (
    <div className={`h-screen bg-[#2E5E4E] transition-all ease-in-out duration-300 overflow-y-scroll scrollbar-hide ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-between items-center p-4">
        <div onClick={toggleSidebar} className="w-14 min-w-[2rem]">
          <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
        </div>
        <div className='ml-4 mr-2 flex'>
          <button className={`bg-transparent mr-4 text-[#D1E7D4] font-bold text-2xl ${collapsed ? 'hidden' : 'block'}`} onClick={toggleSearchbar}>
            <FaSearch></FaSearch>
          </button>
          <button className={`bg-transparent mr-4 text-[#D1E7D4] font-bold text-2xl ${collapsed ? 'hidden' : 'block'}`} onClick={hideHistory}>
            <FaPlus></FaPlus>
          </button>
            
          <button className={`text-[#D1E7D4] text-2xl ${collapsed ? 'hidden' : 'block'}`} onClick={() => navigate('/')}>
            <FaHome />
          </button>
        </div>
      </div>

      <div className={`text-[#D1E7D4] ${collapsed ? 'hidden' : 'block'}`}>
        
        <div className={`flex justify-center items-center mt-3 ml-3 mr-3 ${!showSearch ? 'hidden' : 'block'}`}>
          <form className="max-w-md mx-auto">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <input 
                    type="search" 
                    value={searchContent}
                    onChange={(e) => setSearchContent(e.target.value)}
                    onKeyDown={(e) => handleSearch(e, searchContent)}
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search" 
                    required 
                    />
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
              </div>
          </form>
        </div>

        <div className="flex justify-center font-bold mt-3">
          <h1 className='text-[#F5E3C7] text-2xl mt-5'>Your Designs</h1>
        </div>
        <div className="mt-3">
          {designs.length === 0 ? null : (
            filteredDesigns.length > 0 ? (
              filteredDesigns.map((design) => (
                <div
                  key={design._id}
                  className="hover:bg-[#3b7d6a] p-4 cursor-pointer"
                  onClick={() => showHistory(design)}
                >
                  {design.designName}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-200 mt-4">No matching results</div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
