import React, { useState } from 'react';
import axios from 'axios'
import {v4 as uuidV4} from "uuid";
import { useHistory } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    // Implement your login logic here using the credentials state
     
     try {
        const response = await axios.post("http://localhost:3000/signin", credentials);

        // console.log("Log in successful", response.data.token);
        localStorage.setItem("token", response.data.token);

        const docId = 'your_document_id'; // Replace with the actual document id
        history.push(`/doc/${uuidV4()}`);
    

     } catch (error) {
        console.error('Login failed', error.message);
     }

  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
