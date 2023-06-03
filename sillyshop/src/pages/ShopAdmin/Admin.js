import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../axios'

export const Admin = () => {
  const [retriveorder, setretriveorder] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('order/details')
      setretriveorder(response.data)
    }
    fetchdata()
    console.log(retriveorder)
  }, [])

  return (
    <div>
      <h3>Order List</h3>
      <table>
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
              <td>{index+1}</td>
              <td>{order.email}</td>
              <td>{order.amount}</td>
              <td>{order.date}</td>
              <td>
                <button>Aprove</button>
                <button>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
