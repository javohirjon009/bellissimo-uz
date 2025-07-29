import React from 'react'
import Header from './components/Header'
import Carousel from './components/Carousel'
import Products from "./components/Products"
import Footer from './components/Footer'

const page = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <Products />
      <Footer />
    </div>
  )
}

export default page