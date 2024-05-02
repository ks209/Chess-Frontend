import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './screens/Landingpage.jsx'
import Game from './screens/Game.jsx'

const App = () => {
  return (<div className='h-screen bg-slate-950 overflow-hidden'>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>}></Route>
      <Route path='/game' element={<Game/>}></Route>
    </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App