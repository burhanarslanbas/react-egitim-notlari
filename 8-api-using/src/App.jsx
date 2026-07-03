import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'

const BASE_URL = "http://localhost:3005"

function App() {
  // GET ALL
  const getAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data)
  }

  // GET BY ID
  const getUserById = async (userId) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}`)
    console.log(response.data);
  }

  // POST
  const createUser = async (user) => {
    const response = await axios.post(`${BASE_URL}/users`, user);
    console.log('response', response.data)
  }

  // PUT
  const updateUser = async (userId, updatedUser) => {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      }
    })
  }

  // DELETE BY ID
  const deleteUser = async (userId) => {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`)
    console.log(response.data)
  }

  useEffect(() => {
    // getAllUsers();
    // getUserById(1);
    // const user = {
    //   "username": "Hakan",
    //   "password": "pwd"
    // }
    // createUser(user)
    updateUser("dffdfd", {
      "username": "hakan 2",
      "password": "updatedPWD"
    })
    // deleteUser("nb6knQegs2Y")
    // deleteAllUser();
  });

  return (
    <div></div>
  )
}

export default App
