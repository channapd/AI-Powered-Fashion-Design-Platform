import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { AppContent } from '../context/AppContext'
import { specs } from '../assets/assets.js'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';
import Sidebar from '../components/Sidebar.jsx';

const Result = () => {

  const [image, setImage] = useState('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ category: "", material: '', pattern: '', neckline: '', sleeves: '', fit: '', color: '' });
  
  const [designName, setDesignName] = useState('')

  const {userData, isVerified, generateImage, isViewHistory, selectedDesign} = useContext(AppContent)

  const getSpecsForCategory = (category) => specs[category] || {};

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  
    }));
  };
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    console.log(formData)
  
    if (formData && designName) {
      const image = await generateImage(designName, formData);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="relative h-screen flex">
      <div className='flex'>
        {userData ? 
          <Sidebar /> :
          <div className='absolute top-6 left-4'>
            <Link to='/'>
              <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
            </Link>
          </div>
        }
        
        <div className="fixed top-4 right-4 z-50">
          <Navbar />
        </div>
        
      </div>
      {!isViewHistory ? (
      <form onSubmit={onSubmitHandler} className='flex-grow shadow-lg flex justify-center items-center'>
        {!isImageLoaded && 
        <div>
          <div className='flex justify-center items-center mb-10'>
            <h1 className='text-4xl text-[#3A3A3A]'>New Design</h1>
          </div>
          <div>
              <div className='relative'>
                <span className={`absolute bottom-0 left-0 h-1 bg-[#2E5E4E] ${loading ? 'w-full transition-all duration-[10]' : 'w-0'}`}></span>
              </div>
              <p className={!loading ? 'hidden' : ''}>Loading...</p>
          </div>
          <div className='bg-[#2E5E4E] p-10 rounded-lg shadow-lg w-full sm:w-96 text-sm'>
            <div className="mb-4">
              <input type='text' onChange={(e) => setDesignName(e.target.value)} 
              className='w-full p-2 border border-gray-300 rounded-lg' 
              placeholder="Enter Design Name" required/>
            </div>

            <div className="mb-4">
              <select name="category" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Category" required>
                <option value="">Select Category</option>
                {Object.keys(specs).map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {formData.category && (
              <div>
                {Object.keys(getSpecsForCategory(formData.category)).map((spec) => (
                  <div key={spec} className="mb-4">
                    
                    <select 
                      name={spec} 
                      onChange={handleChange} 
                      className="w-full p-2 border border-gray-300 rounded-lg" 
                      required>
                    
                      <option value="">Select {spec}</option>
                      {getSpecsForCategory(formData.category)[spec].map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="mb-4">
                  <input 
                    type="color" 
                    name="color" 
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full h-12 p-1 border border-gray-300 rounded-lg"
                    placeholder="Select Color"
                    required 
                  />
                </div>
              </div>
            )}

            <button type='submit' className='flex justify-center bg-[#D1E7D4] font-bold px-10 sm:px-16 py-3 rounded-full text-[#2E5E4E] mx-auto'>
              Generate Design
            </button>
          </div>
        </div>
        }

        {isImageLoaded && 
        <div>
          <img src={image} alt="" className='max-w-sm rounded'/>
          <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
            <p onClick={()=>{setIsImageLoaded(false)}}
              className='bg-transparent border border-[#2E5E4E] text-[#2E5E4E] px-8 py-3 rounded-full cursor-pointer'>Generate Another
            </p>
            <a href={image} download className='bg-[#2E5E4E] px-10 py-3 rounded-full cursor-pointer text-[#D1E7D4]'>
              Download
            </a>
          </div>
        </div>
        }
      </form>
      ) : (
          <div className='flex-grow relative flex flex-col min-h-screen items-center justify-center space-y-6'>
            <div className="flex flex-col items-center bg-transparent border border-[#D4BFA2] rounded-lg shadow-sm md:flex-row md:max-w-2xl shadow-[0_4px_10px_rgba(212,191,162,0.4)] dark:bg-gray-800 dark:border-gray-700">
              <img src={selectedDesign.image.data} alt="" className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-s-lg" />
                
              <div className="flex flex-col justify-between p-8 leading-normal">
                <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{selectedDesign.designName}</h1>
                
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{selectedDesign.desc}</p>
                <div className='flex justify-center items-center'>
                  <a href={selectedDesign.image.data} download className='bg-[#2E5E4E] px-10 py-3 rounded-full cursor-pointer text-[#D1E7D4]'>
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Result
