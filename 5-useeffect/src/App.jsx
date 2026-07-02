import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Logger from './Logger'
import Counter from './Counter'
import LiveClock from './LiveClock'
import WindowWidth from './WindowWidth'

function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <>
      <Logger />
      <br />
      <Counter />
      <br />
      <div>
        <button onClick={() => setShowClock(!showClock)}>
          {showClock ? 'Saati Gizle' : 'Saati Göster'}
        </button>
        {showClock && <LiveClock />}
      </div>
      <br />
      <WindowWidth />
    </>
  )
}

export default App
