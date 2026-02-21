import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from '../axiosConfig.js'

function Profile() {

    const [info, setInfo] = useState({
        firstName:'',
        lastName:'',
        email:''
    })

 useEffect(async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/profile");
        console.log(response.data);
        setInfo(response.data);
    } catch (error) {
        console.log("Error fetching data", error)
    }
  
 }, [])

 const handleLogout = () => {
    localStorage.removeItem("token");
 }
  return (
    <div>
        <h1>Profile Details:</h1>
        <h4>Name: {info.firstName} {info.lastName}</h4>
        <h4>E-mail Id: {info.email}</h4>

        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile