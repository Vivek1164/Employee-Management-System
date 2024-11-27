import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSideBar from '../components/dashBoard/AdminSideBar'
import Navbar from '../components/dashBoard/Navbar'
import AdminSummary from '../components/dashBoard/AdminSummary'
import { Outlet } from 'react-router-dom'




const AdminDashboard = () => {
    const {user} = useAuth()
    
    
  return (
    <div className=' flex'>
      <AdminSideBar/>
      <div className=' flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
