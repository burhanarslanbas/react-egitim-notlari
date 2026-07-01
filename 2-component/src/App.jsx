import { useState } from 'react'
import './App.css'
import Login from './Login'

// Login compponentinin içerisindeki users arrayini import ettik. Bu sayede App componenti içerisinde kullanıcı bilgilerini kullanabiliriz.
import { users } from './Login'

function App() {
  console.log(users);
  return (
    <div>
      <Login />
      <hr />
      <Login />
    </div>
  )
}

export default App
