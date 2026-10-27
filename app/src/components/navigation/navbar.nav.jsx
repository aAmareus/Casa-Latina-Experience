import React from 'react'
import { Link } from "react-router-dom"
import "./navigation.css"

const Navbar = () => {

  return (
    <div className='w-full sticky top-0 navbar py-5 px-10 h-15 flex items-center justify-between'>

        <div className="brand">
            <Link to={"/"} className='font-semibold text-2xl'>Casa Latina Experince</Link>
        </div>

        <div className="toLogin flex gap-2">
            <Link 
                to={"/login"}
                className="second-btn btn py-1.5 px-4 rounded relative"
                >
                Ingresar
            </Link>

            <Link 
                to={"/login"}
                className='main-btn btn py-1.5 px-4 rounded relative'
                >
                Registrarse
            </Link>
        </div>
    </div>
  )
}

export default Navbar