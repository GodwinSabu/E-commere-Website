import React from 'react'
import Footer from '../components/Layout/Footer'
import Header from './Layout/Header'
import Checkout from '../components/Checkout/Checkout'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'

const ChecekoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout/>
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default ChecekoutPage