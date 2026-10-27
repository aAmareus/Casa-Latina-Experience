import React from 'react'
import Navbar from "../navigation/navbar.nav.jsx"

import SignForm from "../forms/sign.form.jsx"

import "./login.css"

const Login = () => {
  return (
    <div className='w-full max-h-dvh'>

        <Navbar />

        <div className='mx-auto my-25 w-[70%]'>
          <SignForm />
        </div>
    </div>
  )
}

export default Login