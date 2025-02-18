import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'


const AppRoutes = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/project" element={<Project/>} />
        </Routes>
       </BrowserRouter>
    </div>
  )
}

export default AppRoutes
