import { useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import Card from '../courses/cards/card.jsx'

const Index = () => {

  const [activeCat, setActiveCat] = useState()

  const handleActiveCat = (cat) => {
    
    if (activeCat === cat) {
      setActiveCat(null)
      classList.add('active')
    }
    else {
      classList.remove('active')
    }
    }


  return (
    <>
      <div className="index_container">
        <nav className="navbar">
            <Link to='http://localhost:5173' target='_blank' className='nav-item'>Casa Latina</Link>
            <Link to='' className='nav-item'>Item 1</Link>
            <Link to='' className='nav-item'>Item 1</Link>
            <Link to='' className='nav-item nav-btn'>My account</Link>
        </nav>
      </div>

      <div className="some-figures">

        <h2 className='figure-title'>Revisa algunos de nuestros pasos básicos!</h2>
        
        <div className="cat-container">
          <span 
          className='salsa cat active'
          typeof='button'
          onClick={() => handleActiveCat('salsa')}>
            Salsa
          </span>
          <span 
          className='bachata cat'
          onClick={() => handleActiveCat('bachata')}>
            Bachata
          </span>
          <span 
          className='samba cat'
          onClick={() => handleActiveCat('samba')}>
            Samba
          </span>
        </div>

        <Card />
        <Card />
        <Card />
        
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}

export default Index
