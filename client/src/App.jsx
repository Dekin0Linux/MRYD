import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Buses from './pages/Buses'
import PassengerDetails from './pages/PassengerDetails'
import SeatSelect from './pages/SeatSelect'


function App() {

  return (
    <div className="h-full">
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/buses' element={<Buses/>}/>
          <Route path='/passenger' element={<PassengerDetails/>} />
          <Route path='seat' element={<SeatSelect/>} />
        </Routes>
      </Router>
    
      
    </div>
  )
}

export default App
