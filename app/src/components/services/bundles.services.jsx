import React from 'react'
import { Link } from 'react-router-dom'
import './services.css'

// Importing files from img to detail bundles
import dmn from '../../assets/img/bundles/diamond_pattern.png'
import gld from '../../assets/img/bundles/gold_pattern.png'
import slv from '../../assets/img/bundles/silver_pattern.png'

const Bundles = () => {
    return (
        <div className="grid grid-cols-3 gap-5 w-full p-10 justify-items-center">

            {/* NORMAL BUNDLE */}
            <div className="bundle bundle-silver flex flex-wrap justify-between items-center rounded-2xl w-xs h-max overflow-hidden border border-mist-500">
                <div className="bundlecard-title overflow-hidden relative">
                    <h3
                        className="w-full text-center font-extrabold text-2xl relative"
                    >
                        Classic Bundle
                    </h3>
                </div>
                <div className="bundlebody p-5 flex flex-wrap w-full">
                    <div className="content-list p-4 w-full ">
                        <ul className='list-disc'>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                        </ul>
                    </div>
                    <button className='w-full text-center cursor-pointer rounded p-1 bundlebutton'>¡Lo quiero!</button>
                </div>
            </div>

            {/* PRO BUNDLE */}
            <div className="bundle bundle-gold flex flex-wrap justify-between items-center rounded-2xl w-xs h-max overflow-hidden border border-mist-500">
                <div className="bundlecard-title overflow-hidden relative">
                    <h3
                        className="w-full text-center font-extrabold text-2xl relative"
                    >
                        Pro Bundle
                    </h3>
                </div>
                <div className="bundlebody p-5 flex flex-wrap w-full">
                    <div className="content-list p-4 w-full ">
                        <ul className='list-disc'>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                        </ul>
                    </div>
                    <button className='w-full text-center cursor-pointer rounded p-1 bundlebutton'>¡Lo quiero!</button>
                </div>
            </div>

            {/*  PLUS BUNDLE */}
            <div className="bundle bundle-diamond flex flex-wrap justify-between items-center rounded-2xl w-xs h-max overflow-hidden border border-mist-500">
                <div className="bundlecard-title overflow-hidden relative">
                    <h3
                        className="w-full text-center font-extrabold text-2xl relative"
                    >
                       VIP Bundle
                    </h3>
                </div>
                <div className="bundlebody p-5 flex flex-wrap w-full">
                    <div className="content-list p-4 w-full ">
                        <ul className='list-disc'>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                            <li className=''>Experiência do praia.</li>
                        </ul>
                    </div>
                    <button className='w-full text-center cursor-pointer rounded p-1 bundlebutton'>¡Lo quiero!</button>
                </div>
            </div>

        </div>
    )
}

export default Bundles