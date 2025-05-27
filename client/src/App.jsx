import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#D1E7D4] to-[#F5E3C7]'>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/email-verify' element={<EmailVerify></EmailVerify>}></Route>
        <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/buy' element={<BuyCredit></BuyCredit>}></Route>
        <Route path='/result' element={<Result></Result>}></Route>
      </Routes>
    </div>
  )
}

export default App;

