import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Buses from './pages/Buses'
import PassengerDetails from './pages/PassengerDetails'
import SeatSelect from './pages/SeatSelect'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BookBusPage from './pages/BookBusPage'


function App() {

  return (
    <div className="h-full">
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/buses' element={<Buses/>}/>
          <Route path='/passenger' element={<PassengerDetails/>} />
          <Route path='seat' element={<SeatSelect/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/mybooking' element={<BookBusPage/>}/>
        </Routes>
      </Router>
    
      
    </div>
  )
}

export default App
