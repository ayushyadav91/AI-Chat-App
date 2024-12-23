import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'


const AppRoutes = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

        </Routes>
       </BrowserRouter>
    </div>
  )
}

export default AppRoutes
