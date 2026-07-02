import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Counter from '../../5-useeffect/src/Counter'
import LoginForm from './LoginForm'

function App() {
  return (
    <>
      <br />
      <Counter />
      <br />
      <LoginForm />
    </>
  )
}

export default App
