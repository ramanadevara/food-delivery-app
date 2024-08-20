import validator from "validator"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//User register

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
  const { name, password, email } = req.body

  try {
    //check if user exists
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({
        success: "false",
        message: "User email already exists",
      })
    }

    //check if email is valid
    if (!validator.isEmail(email)) {
      return res.json({ success: "false", message: "Enter a valid email" })
    }

    //check if password is strong
    if (password.length < 8) {
      return res.json({
        success: "false",
        message: "Please enter a strong password",
      })
    }

    //Password encryption
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      cartData: {},
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error creating user" })
  }
}

//User login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    //check if user exists
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User email does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      })
    }

    const token = createToken(user._id)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error logging in" })
  }
}

export { registerUser, loginUser }
