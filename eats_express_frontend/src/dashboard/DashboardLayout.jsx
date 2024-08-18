import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from "flowbite-react";
import { SideBar } from './SideBar';
import NavbarComp from '../Components/NavbarComp';

const DashboardLayout = () => {
  return (

    <>
      <NavbarComp />
      <div className='mt-6 h-screen flex gap-4 flex-col md:flex-row'>
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}

export default DashboardLayout