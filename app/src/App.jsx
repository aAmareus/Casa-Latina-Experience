import { Routes, Route }  from 'react-router-dom'
import Logo from './assets/icons/logotipo-wobg.png'
// import Index from './components/pages/index.jsx'


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

      {/* <Routes>
        <Route path='/' element={<Index />}/>
      </Routes> */}
    </>
  )
}

export default App
