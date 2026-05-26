import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
    return (
        <footer className="py-5 sm:px-10 px-5">
            <div className="screen-max-width">
                <div>
                    <h3 className="font-semibold text-gray text-xs">This is a fan-made clone for portfolio purposes. Not affiliated with Apple Inc.</h3>
                    
                </div>

                <div className="bg-neutral-700 my-5 h-[1px] w-full" />

                
            </div>
        </footer>
    )
}

export default Footer