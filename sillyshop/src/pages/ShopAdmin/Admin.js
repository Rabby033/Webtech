import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faList } from '@fortawesome/free-solid-svg-icons'
import {
  faShoppingCart,
  faUsers,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons'
import axios from '../../axios'
 import './admin.css' // Import CSS file for styling
 import Navbar from '../../components/AdminNavbar.js'

export const Admin = () => {
  const [retriveorder, setretriveorder] = useState([])
  const [revenue,setrevenue]=useState('');
  const [retrivecustomer, setretrivecustomer] = useState([])
  const [selectedOption, setSelectedOption] = useState('dashboard') // Default selected option is 'dashboard'

  useEffect(() => {
     const fetchdata = async () => {
      const response = await axios.get('/customerinfo/retrive')
      const response2= await axios.get('/sillyshop/revenue')
      // console.log(response2.data)
      console.log(response.data)
      setretrivecustomer(response.data)
      setrevenue(response2.data.Balance)
    }
    fetchdata()
    console.log(retrivecustomer)
  }, [])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('order/details')
      console.log(response.data)
      setretriveorder(response.data)
    }
    fetchdata()
    console.log(retriveorder)
  }, [])

  const handleOptionChange = option => {
    setSelectedOption(option)
  }

  const getTotalOrderCount = () => {
    return retriveorder.length
  }

  const getTotalCustomerCount = () => {

    return retrivecustomer.length // Example value
  }

  const getTotalRevenue = () => {
    // Implement your logic to calculate the total revenue
    return  revenue// Example value
  }

  return (
    <div>
      <Navbar/>
    <div className='main-container'>
      <div className='admin-container'>
        <div className='sidebar'>
          <button
            className={selectedOption === 'dashboard' ? 'active' : ''}
            onClick={() => handleOptionChange('dashboard')}
          >
            <FontAwesomeIcon icon={faChartBar} className='sidebar-icon' />
            Dashboard
          </button>
          <button
            className={selectedOption === 'customers' ? 'active' : ''}
            onClick={() => handleOptionChange('customers')}
          >
            <FontAwesomeIcon icon={faUser} className='sidebar-icon' />
            Customers
          </button>
          <button
            className={selectedOption === 'orders' ? 'active' : ''}
            onClick={() => handleOptionChange('orders')}
          >
            <FontAwesomeIcon icon={faList} className='sidebar-icon' />
            Orders
          </button>
        </div>
        <div className='content'>
          {selectedOption === 'dashboard' ? (
            <div>
              <div className='dashboard-cards'>
                <div className='card order'>
                  <div className='card-content'>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className='card-icon'
                    />
                    <h3 className='card-name'>Order</h3>
                  </div>
                  <p className='card-value'>{getTotalOrderCount()}</p>
                </div>
                <div className='card customer-card'>
                  <div className='card-content'>
                    <FontAwesomeIcon icon={faUsers} className='card-icon' />
                    <h3 className='card-name'>Customer</h3>
                  </div>
                  <p className='card-value'>{getTotalCustomerCount()}</p>
                </div>
                <div className='card revenue-card'>
                  <div className='card-content'>
                    <FontAwesomeIcon icon={faMoneyBill} className='card-icon' />
                    <h3 className='card-name'>Revenue</h3>
                  </div>
                  <p className='card-value'>{getTotalRevenue()}</p>
                </div>
              </div>
              {/* recent order table and notification box */}
              <b className='tabletitle'>Recent Orders</b>
              <div className='tableandnot'>
                <table className='recentorder'>
                  <thead>
                    <tr>
                      <th>OrderId</th>
                      <th>Customer</th>
                      <th>Date($)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retriveorder.slice(0, 5).map((order, index) => (
                      <tr key={index}>
                        <td>{order.orderid}</td>
                        <td>{order.customername}</td>
                        <td>{order.date}</td>
                        <td
                          className={
                            order.status === 'Pending'
                              ? 'pending-status'
                              : order.status === 'Approved'
                              ? 'approved-status'
                              : order.status === 'Delivered'
                              ? 'delivered-status'
                              : ''
                          }
                        >
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : selectedOption === 'pastorders' ? (
            <div>this is past order</div>
          ) : selectedOption === 'customers' ? (
            <div>
              <table className='recentorder'>
                <thead>
                  <tr>
                    <th>Serial No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {retrivecustomer.map(
                    (
                      user,
                      index // Fixed typo in variable name
                    ) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              {/* <h3>All order</h3> */}
              <table className='recentorder'>
                <thead>
                  <tr>
                    <th>OrderId</th>
                    <th>Customer</th>
                    <th>Date($)</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {retriveorder.map((order, index) => (
                    <tr key={index}>
                      <td>{order.orderid}</td>
                      <td>{order.customername}</td>
                      <td>{order.date}</td>
                      <td
                        className={
                          order.status === 'Pending'
                            ? 'pending-status'
                            : order.status === 'Approved'
                            ? 'approved-status'
                            : order.status === 'Delivered'
                            ? 'delivered-status'
                            : ''
                        }
                      >
                        {order.status}
                      </td>
                      <td>
                        <Link to='/admin/details' state={{ order: order }}>
                          <button className='details-btn'>Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}
