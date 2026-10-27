import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Menu from "../admin/menu.jsx"
import "./admin.css"

const Dashboard = () => {
  return (
    <div className="w-full max-h-dvh flex">
        <div className="sidebar z-10 h-dvh">
            
            <div className="sidebartitle-container w-full">
            <p className="text-2xl font-bold text-center w-full sidebartitle">Administration | Panel</p>
            </div>
            {/*  */}
            <hr className='hr'/>

            <div className="sidebarOptions w-full">
                <ul className="sidebar-list w-full">
                    <li className="list-item">Usuarios</li>
                    <li className="list-item">Reservas</li>
                    <li className="list-item">Habitaciones</li>
                    <li className="list-item">Pagos</li>
                </ul>
            </div>

            <div className="sidebar-bottom">
                <Link to="/">Ir a Casa Latina Experience</Link>
            </div>
        </div>

        <Menu />
    </div>
  )
}

export default Dashboard