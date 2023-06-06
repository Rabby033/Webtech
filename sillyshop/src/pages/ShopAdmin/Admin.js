import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faList } from '@fortawesome/free-solid-svg-icons'
import {
  faShoppingCart,
  faUsers,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons'
import axios from '../../axios'
import './admin.css' // Import CSS file for styling

export const Admin = () => {
  const [retriveorder, setretriveorder] = useState([])
  const [selectedOption, setSelectedOption] = useState('dashboard') // Default selected option is 'dashboard'
  const [notifications, setNotifications] = useState([
    // Static notifications (replace with dynamic data later)
    {
      id: 1,
      message: 'Order id no 5 is supplied today'
    },
    {
      id: 2,
      message: 'Order id no 12 is supplied yesterday'
    },
    {
      id: 3,
      message: 'Order id no 8 is supplied yesterday'
    },
    {
      id: 4,
      message: 'Order id no 7 is supplied right now'
    },
    {
      id: 5,
      message: 'Order id no 10 is supplied 5th june'
    }
  ])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('order/details')
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
    // Implement your logic to get the total customer count
    return 100 // Example value
  }

  const getTotalRevenue = () => {
    // Implement your logic to calculate the total revenue
    return '$10,000' // Example value
  }

  return (
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
          <button
            className={selectedOption === 'pastorders' ? 'active' : ''}
            onClick={() => handleOptionChange('pastorders')}
          >
            <FontAwesomeIcon icon={faList} className='sidebar-icon' />
            Past Orders
          </button>
        </div>
        <div className='content'>
          {selectedOption === 'dashboard' ? (
            <div>
              <div className='dashboard-cards'>
                <div className='card order-card'>
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
                      <th>Customer Name</th>
                      <th>Product Name</th>
                      <th>Order Date</th>
                      <th>Total Cost</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>alex</td>
                      <td>Bob</td>
                      <td>12 June, 2023</td>
                      <td>1344</td>
                      <td>pending</td>
                    </tr>
                    <tr>
                      <td>alex</td>
                      <td>Bob</td>
                      <td>12 June, 2023</td>
                      <td>1344</td>
                      <td>pending</td>
                    </tr>
                    <tr>
                      <td>alex</td>
                      <td>Bob</td>
                      <td>12 June, 2023</td>
                      <td>1344</td>
                      <td>pending</td>
                    </tr>
                    <tr>
                      <td>alex</td>
                      <td>Bob</td>
                      <td>12 June, 2023</td>
                      <td>1344</td>
                      <td>pending</td>
                    </tr>
                    <tr>
                      <td>alex</td>
                      <td>Bob</td>
                      <td>12 June, 2023</td>
                      <td>1344</td>
                      <td>pending</td>
                    </tr>
                  </tbody>
                </table>

                <div className='notification-container'>
                  <div className='notification-card'>
                    <h3 className='notification-title'>Recent Notification</h3>
                    <ul className='notification-list'>
                      {notifications.slice(0, 5).map(notification => (
                        <li key={notification.id} className='notification-item'>
                          {notification.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) :selectedOption==='pastorders'?((
            <div>this is past order</div>
          ))
          : selectedOption === 'customers' ? (
            <h3>Customers</h3>
          ) : 
           ((
              <div>
                <h3>Pending order</h3>
                <table className='recentorder'>
                  <thead>
                    <tr>
                      <th>Order id</th>
                      <th>UserEmail</th>
                      <th>TotalCost($)</th>
                      <th>OrderDate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retriveorder.map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order.email}</td>
                        <td>{order.amount}</td>
                        <td>{order.date}</td>
                        <td>
                          <button className='approve-button'>Approve</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )
          }
        </div>
      </div>
    </div>
  )
}
