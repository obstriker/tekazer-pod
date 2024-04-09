import React from 'react'
import PriceCard from './PriceCard'
import { PLANS } from '@/config/stripe'

const Pricing = () => {
  return (
        <div className="flex flex-col space-y-12">
        <div className="flex justify-center">
            </div>
            <div className="flex flex-col items-start space-y-6 lg:space-y-0 justify-center lg:flex-row lg:space-x-4 bg-white">
                <PriceCard plan={PLANS[0]} />
                <PriceCard plan={PLANS[1]} />
                <PriceCard plan={PLANS[2]} />
        </div>
        </div>
    )
    }

export default Pricing
