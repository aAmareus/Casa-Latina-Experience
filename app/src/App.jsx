import { Routes, Route } from 'react-router-dom'
import Logo from './assets/icons/logotipo-wobg.png'

// pages for da web
import Index from './components/pages/index.jsx'
import Admin from "./components/pages/admin.jsx"
import Dashboard from "./components/pages/dashboard.jsx"
import RoomDetail from "./components/pages/RoomDetail.jsx"

import PageTransition from './components/curtain/PageTransition.jsx'

import './global.css'

function App() {

  return (
    <>
      <div className="workingOn"
      style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent:'center',alignItems:'center', gap: '20px', position: 'absolute'}}
      >
        <img src={Logo} alt="" 
          style={{width: '300px'}}
        />
        <p
        style={{fontFamily: 'var(--montserrat)', fontSize:'32px', textAlign:'center'}}
        >Estamos trabalhando nisso. <br /> Pedimos desculpas pelo inconveniente</p>
      </div>

      {/* <PageTransition
        curtainContent={
          <div className="workingOn bg-mist-950"
            style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', position: 'absolute' }}
          >
            <img src={Logo} alt=""
              style={{ width: '300px' }}
            />
            <p
              className="text-mist-50"
              style={{ fontFamily: 'var(--montserrat)', fontSize: '32px', textAlign: 'center' }}
            >Estamos trabalhando nisso. <br /> Pedimos desculpas pelo inconveniente</p>
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/admin/login' element={<Admin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/catalogo/rooms/:id" element={<RoomDetail />} />
        </Routes>
      </PageTransition> */}

    </>
  )
}

export default App
