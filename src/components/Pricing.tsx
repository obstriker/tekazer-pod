import React from 'react'
import PriceCard from './PriceCard'
import { PLANS } from '@/config/stripe'

const Pricing = () => {
  return (
        <div className="flex flex-col justify-center py-16 space-y-16">
            <div className="flex flex-col items-center space-y-6 lg:space-y-0 justify-center lg:flex-row lg:space-x-4">
                <PriceCard plan={PLANS[0]} />
                <PriceCard plan={PLANS[1]} />
                <PriceCard plan={PLANS[2]} />
        </div>
        </div>
    )
    }

export default Pricing
