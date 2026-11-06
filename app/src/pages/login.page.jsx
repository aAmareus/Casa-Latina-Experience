import React from 'react'
import Navbar from "../components/navigation/navbar.nav.jsx"

import SignForm from "../components/forms/sign.form.jsx"

import "./login.css"

const Login = () => {
  return (
    <div className='w-full max-h-dvh'>

        <Navbar />

        <div className='mx-auto my-25 w-[70%] max-[570px]:w-full max-[570px]:my-0'>
          <SignForm />
        </div>
    </div>
  )
}

export default Login