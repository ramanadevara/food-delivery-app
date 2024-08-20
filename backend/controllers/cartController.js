import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId })

    let cartData = await userData.cartData

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1
    } else {
      cartData[req.body.itemId] += 1
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData })

    res.json({ success: true, message: "Added to cart" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error occured" })
  }
}

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId })

    let cartData = userData.cartData

    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1
    } else {
      delete cartData[req.body.itemId]
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData })
    res.json({ success: true, message: "Removed item from cart" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error occured" })
  }
}

const viewCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId })

    let cartData = userData.cartData

    res.json({
      success: true,
      message: "Cart fetched successfullt",
      cartData: cartData,
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error occured" })
  }
}

export { addToCart, removeFromCart, viewCart }
