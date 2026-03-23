import { Routes, Route }  from 'react-router-dom'

import Index from './components/pages/index.jsx'

import './global.css'

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
