import React from "react"
import "./Orders.css"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { assets } from "../../assets/assets.js"
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    } else {
      toast.error("Error fetching orders")
    }
  }

  const onStatusChange = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/change", {
      orderId,
      status: event.target.value,
    })

    if (response.data.success) {
      fetchOrders()
      toast.success("Order status updated")
      //setStatus(status)
    } else {
      toast.error("Could not update order status")
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='order add'>
      <h2>All orders</h2>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon} />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={order.status}
              onChange={(event) => onStatusChange(event, order._id)}
            >
              <option value='Processing Order'>Processing Order</option>
              <option value='Out for Delivery'>Out for Delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
