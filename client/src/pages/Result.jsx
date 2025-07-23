import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { AppContent } from '../context/AppContext'
import { specs } from '../assets/assets.js'
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';
import Sidebar from '../components/Sidebar.jsx';


const Result = () => {

  const [image, setImage] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [designSpecs, setDesignSpecs] = useState({ category: "", material: '', pattern: '', neckline: '', sleeves: '', fit: '', color: '' });
  
  const [designName, setDesignName] = useState('')

  const {userData, retrieveDesigns, generateImage, isViewHistory, selectedDesign, deleteImage, setIsViewHistory, setSelectedDesign, isImageLoaded, setIsImageLoaded} = useContext(AppContent)

  const [showModal, setShowModal] = useState(false)

  const getSpecsForCategory = (category) => specs[category] || {};

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    setDesignSpecs((prevData) => ({
      ...prevData,
      [name]: value,  
    }));
  };
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    console.log(designSpecs)
  
    if (designSpecs && designName) {
      const image = await generateImage(designName, designSpecs);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    
    setLoading(false);
    await retrieveDesigns();
  };


  const handleDelete = async (e, designId) => {
    e.preventDefault()
    setLoading(true)

    if(designId){
      await deleteImage(designId)
    }

    setLoading(false)
    await retrieveDesigns()
    
    if (selectedDesign._id === designId) {
      setIsViewHistory(false)
      setIsImageLoaded(false);
      setSelectedDesign({})
    }
  }

  return (
    <div className="relative h-screen flex">
      <div className='flex'>
        {userData ? 
          <Sidebar /> :
          <div className='absolute top-6 left-4 z-10'>
            <Link to='/'>
              <img src={icon} alt="" className='w-10 sm:w-12 lg:w-14'/>
            </Link>
          </div>
        }
        
        <div className="fixed top-4 right-4 z-50">
          <Navbar />
        </div>
      </div>

      <div className="flex-grow relative p-8">
        {userData && (
          <>
            <h1 className="text-3xl mt-16 font-bold text-[#2E5E4E]">Dashboard</h1>
            <hr className="mt-2 mb-4 border-t-2 border-[#2E5E4E] w-7/8" />
          </>
        )}
        {!isViewHistory ? (
        <form onSubmit={onSubmitHandler} className='flex justify-center items-center'>
          {!isImageLoaded && 
          <div className="w-full max-w-4xl">
            <div>
                {loading && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-dotted rounded-full border-[#2E5E4E] border-t-transparent animate-spin"></div>
                  </div>
                )}
            </div>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full text-sm mt-16'>
              <div className='flex justify-center items-center mb-4'>
                <h3 className='text-3xl text-[#2E5E4E]'>New Design</h3>
              </div>
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

              {designSpecs.category && (
                <div>
                  {(() => {
                    const jsx = [];
                    const specs = Object.entries(getSpecsForCategory(designSpecs.category));

                    for (let i = 0; i < specs.length; i += 3) {
                      const row = specs.slice(i, i + 3);

                      jsx.push(
                        <div key={`row-${i}`} className="flex gap-4 mb-4">
                          {row.map(([spec, values]) => (
                            <div key={spec} className="w-1/3">
                              <select
                                name={spec}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                              >
                                <option value="">Select {spec}</option>
                                {values.map((item, idx) => (
                                  <option key={idx} value={item}>{item}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      );
                    }

                    return jsx;
                  })()}

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Color</label>
                    <input
                      type="color"
                      name="color"
                      value={designSpecs.color}
                      onChange={handleChange}
                      className="w-full h-12 p-1 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>
              )}

              <button type='submit' className='flex justify-center bg-[#2E5E4E] font-bold px-10 sm:px-16 py-3 rounded-full text-white mx-auto'>
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
            <div className='flex flex-col justify-center items-center mt-16 space-y-6'>
              <div className="flex flex-col items-center bg-white border border-[#D4BFA2] rounded-lg shadow-sm md:flex-row md:max-w-2xl dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                <div className="w-full md:basis-3/5 md:flex-shrink-0 h-64 md:h-auto">
                  <img 
                    src={selectedDesign.image.data} 
                    alt="" 
                    className="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-s-lg" 
                  />
                </div>

                <div className="w-full md:basis-2/5 flex flex-col justify-between p-6 leading-normal">
                  <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {selectedDesign.designName}
                  </h1>

                  <p className="mb-3 text-md font-normal text-gray-700 dark:text-gray-400">
                    {selectedDesign.desc}
                  </p>

                  <div className='flex justify-center items-center gap-4 mt-4'>
                    <a 
                      href={selectedDesign.image.data} 
                      download 
                      className='bg-[#2E5E4E] px-6 py-2 rounded-full cursor-pointer text-[#D1E7D4] text-sm'>
                      Download
                    </a>

                    <button 
                      className='bg-[#2E5E4E] px-6 py-2 rounded-full cursor-pointer text-[#D1E7D4] text-sm'
                      onClick={() => setShowModal(true)}>
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )
        }
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Confirmation</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this design? This action cannot be undone.</p>
            
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={(e) => {
                  handleDelete(e, selectedDesign._id);
                  setShowModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Result
