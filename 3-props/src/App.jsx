import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Product from './Product'
import Container from './Container'

function App() {

  const productName = "Buzdolabı", productPrice = "15000 TL";
  return (
    <>
      {/* <Product productName="Laptop" productPrice="17000 TL" />
      <hr />
      <Product productName="Telefon" productPrice="10000 TL" />
      <hr />
      <Product productName={productName} productPrice={productPrice} /> */}

      <Container>
        <Product productName={productName} productPrice={productPrice} />
      </Container>
    </>
  )
}

export default App
