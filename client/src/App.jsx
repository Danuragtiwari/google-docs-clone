import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {v4 as uuidV4} from "uuid";

import TextEditor from './TextEditor'
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <BrowserRouter >
      <Routes>
        <Route  path='/' element = {<Navigate to={`/doc/${uuidV4()}`}/>}/>
         
        <Route path='/doc/:id' element = {<TextEditor/>}/>
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/profile' element = {<Profile />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App