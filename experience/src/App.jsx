import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './global.css'

import Index from './components/pages/index.jsx'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Index />}/>
      </Routes>
    </>
  )
}

export default App
