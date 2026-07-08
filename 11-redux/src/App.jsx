import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { increment, decrement } from './redux/counterSlice'
import UserList from './UserList'

function App() {
  // useSelector hook'u ile store'daki state'i okuyabiliriz.
  const { value } = useSelector((store) => store.counter)

  // useDispatch hook'u ile action'ı dışardan gidip getirebiliriz.
  const dispatch = useDispatch();

  console.log('Value', value)

  return (
    <div className="App">
      {/* <h1>Counter: {value}</h1>
      <div><button onClick={() => dispatch(increment())}>Increment</button></div>
      <div><button onClick={() => dispatch(decrement())}>Decrement</button></div> */}
      <UserList />
    </div>
  )
}

export default App
