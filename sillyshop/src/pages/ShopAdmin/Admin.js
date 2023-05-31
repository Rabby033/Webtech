import React from 'react'

export const Admin = () => {
  return (
    <div>
      <h3>Order List</h3>
      <table>
        <thead>
          <th>Order id</th>
          <th>UserEmail</th>
          <th>TotalCost($)</th>
          <th>OrderDate</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr>
            <td>005</td>
            <td>Alex@gmail.com</td>
            <td>500</td>
            <td>31/05/23</td>
            <td>
              <button>Aprove</button>
              <button>Cancel</button>
            </td>
          </tr>
          <tr>
            <td>006</td>
            <td>Bob@gmail.com</td>
            <td>700</td>
            <td>30/05/23</td>
            <td>
              <button>Aprove</button>
              <button>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
