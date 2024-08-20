import React, { useContext, useState } from "react"
import "./FoodItem.css"
import { assets } from "../../../assets/assets"
import { StoreContext } from "../../../context/StoreContext"

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token } =
    useContext(StoreContext)

  const handleClick = (id) => {
    if (!token) {
      alert("Please login to add items to cart")
    } else {
      addToCart(id)
    }
  }
  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-img' src={url + "/images/" + image} />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => handleClick(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
            />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} />
        </div>
        <p className='food-item-description'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
