import React, { useContext, useEffect, useState } from "react"
import "./LoginPopup.css"
import { assets } from "../../../assets/assets"
import { StoreContext } from "../../../context/StoreContext"
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login")
  const [data, setData] = useState({ name: "", email: "", password: "" })

  const { url, setToken } = useContext(StoreContext)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setData((data) => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currentState == "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>
        <div className='login-popup-inputs'>
          {currentState === "Sign up" ? (
            <input
              type='text'
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              placeholder='Your name'
              required
            />
          ) : (
            ""
          )}
          <input
            type='email'
            name='email'
            value={data.email}
            onChange={onChangeHandler}
            placeholder='Email'
            required
          />
          <input
            type='password'
            name='password'
            value={data.password}
            onChange={onChangeHandler}
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className='login-popup-condition'>
          {currentState === "Sign up" ? (
            <>
              <input type='checkbox' required />
              <p>By continuing, I agree to terms of use & privacy policy</p>
            </>
          ) : (
            <></>
          )}
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}> Click here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
