import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AppContent = createContext();



export const AppContextProvider = (props) => {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const [credit, setCredit] = useState(false)

    const [isVerified, setIsVerified] = useState(false)

    const [designs, setDesigns] = useState([])

    const [isViewHistory, setIsViewHistory] = useState(false)

    const [selectedDesign, setSelectedDesign] = useState({})


    const getAuthState = async () => {
        try{
            const {data} = await axios.get(backendUrl + '/api/auth/is-authenticated')

            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }

        } catch(error) {
            toast.error(error.message)
        }
    }

    const getVerificationState = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-verified')

            if(data.success){
                setIsVerified(true)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            console.log("Data: " + data)
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error){
            toast.error(error.message)
        }
    }

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits')
            if(data.success){
                setCredit(data.credits)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (designName, formData) => {
        try {

            if(!isLoggedin){
                toast.error("Please Login")
                return
            }

            if(!isVerified){
                toast.error("Your account is not verified. Please verify your account using the OTP sent to your registered email")
                return
            }

            const { category, material, pattern, neckline, sleeves, fit, color } = formData;

            const isDetailed = category === 'Gowns' || category === 'Tops';
            const prompt = `Generate a women's ${category} with a ${fit} fit, ${material} material, ${pattern} pattern${isDetailed ? `, ${neckline} neckline, ${sleeves} sleeves` : ''}, ${color} color.`;
            
            const desc = `A women's ${category} with a ${fit} fit, ${material} material, ${pattern} pattern${isDetailed ? `, ${neckline} neckline, ${sleeves} sleeves` : ''}, ${color} color.`;
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {designName, desc, prompt})

            if(data.success){
                loadCreditsData()
                return data.resultImage
            }
            else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const retrieveDesigns = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/user/retrieve-designs')
            if (data.success) {
                console.log(data)
                setDesigns(data.designs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        loadCreditsData();
        getAuthState();
        retrieveDesigns();
    }, [])


    useEffect(() => {
        if (isLoggedin) {
            getVerificationState();
        }
    }, [isLoggedin]);


    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        isVerified, setIsVerified,
        userData, setUserData, 
        getUserData,
        credit, setCredit,
        loadCreditsData,
        generateImage,
        designs,
        isViewHistory, setIsViewHistory,
        selectedDesign, setSelectedDesign
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}