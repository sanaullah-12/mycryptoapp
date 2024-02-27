import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Exchange from './Components/Exchange'
import CoinDetail from './Components/CoinDetail'
import Coin from './Components/Coin'


export default function App() {
  return (
   
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins' element={<Coin/>}/>
        <Route path='/exchange' element={<Exchange/>}/>
        <Route path="/coindetail/:id" element={<CoinDetail />} />
      
      </Routes>
    
    </BrowserRouter>
  )
}
