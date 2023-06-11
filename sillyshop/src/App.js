import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Shop } from './pages/shop/Shop'
import { Cart } from './pages/Cart/Cart'
import { Shopstate } from './context/Shopcontext'
import Payment from './pages/payment/Payment'
import {Bank} from './pages/Bank/bank'
import {Admin} from './pages/ShopAdmin/Admin'
import {Loading} from './pages/payment/Loading'
import {Details} from './pages/ShopAdmin/Details'
import {Login} from './pages/Login/Login'
import {Signup} from './pages/Signup/Signup'
import {Supplier} from './pages/supplier/Supplier'


function App () {
  return (
    <div>
      <Shopstate>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/supplier' element={<Supplier/>}></Route>
          
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/payment' element={<Payment/>}></Route>
            <Route path='/bank' element={<Bank/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/loading' element={<Loading/>}></Route>
            <Route path='/admin/details' element={<Details/>}></Route>
          </Routes>
        </Router>
      </Shopstate>
    </div>
  )
}

export default App
