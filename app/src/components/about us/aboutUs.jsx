import React from 'react'

import AboutIcon from '../../assets/img/sections/about-us.png'
import Logo from '../../assets/icons/logotipo-wobg.png'
import './about.css'

const AboutUs = () => {
  return (
    <>
        <div className="container">
            <div className="text">
                <h2 className='about-title'>
                    ¿Quienes somos?
                </h2>

                <p className='about-txt'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis praesentium provident amet distinctio corrupti, ea consectetur error culpa sint, id velit at a, dolor cum sequi qui quas. Deserunt architecto officia quaerat odio mollitia illo assumenda ex nostrum, beatae fuga.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis praesentium provident amet distinctio corrupti, ea consectetur error culpa sint, id velit at a, dolor cum sequi qui quas. Deserunt architecto officia quaerat odio mollitia illo assumenda ex nostrum, beatae fuga.
                </p>
            </div>
            <div className="img">
                <img 
                src={Logo} 
                alt=""
                className='img-about img' />
            </div>
        </div>     
    </>
  )
}
export default AboutUs