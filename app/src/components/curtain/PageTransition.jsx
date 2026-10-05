import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children, curtainContent }) => {

    const location = useLocation()

    return (
        <>
            {children}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={location.pathname}
                    className="fixed inset-0 z-50 flex intems-center justify-center"
                    initial={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1}}
                    animate={{ clipPath: 'circle(0% at 50% 50%)', opacity: 1}}
                    exit={{ clipPath: 'circle(150% at 50% 50%)', opacity: 0}}
                    transition={{ duration: 2, delay: 1, ease: [0.65, 0, 0.35, 1] }}>
                    
                    {curtainContent}

                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default PageTransition
