import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/LogInPage.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function LogInPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  
  const [errorMessages, setErrorMessages] = useState({
    emailError: '',
    passwordError: '',
  })

  

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if(email ===  null || email === ''){
      setErrorMessages(prev => ({...prev, emailError: 'Please enter email'}))
      return false
    }else if(!email.match(emailRegex)){
      setErrorMessages(prev => ({...prev, emailError: 'Email is invalid'})) 
      return false
    }
  
    setErrorMessages(prev => ({ ...prev, emailError: '' }))
    return true
  }

  const validatePassword = (password) => {
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

    if(password ===  null || password === ''){
      setErrorMessages(prev => ({...prev, passwordError: 'Please enter password'}))
      return false
    }else if(!password.match(passRegex)){
      setErrorMessages(prev => ({...prev, passwordError: 'Password must be 6-16 characters long and contain at least one digit and one special character'}))
      return false
    }

    setErrorMessages(prev => ({ ...prev, passwordError: '' }))
    return true
  }

  const handleLogin = (e) => {
    e.preventDefault()

    let isValidEmail = validateEmail(loginData.email)
    let isValidPassword = validatePassword(loginData.password)


    if(isValidEmail && isValidPassword){
      localStorage.setItem('logged', JSON.stringify(true))
      navigate('/allBreeds')
    }
  }

  const toggleShowPass = () => {
    setShowPass(prev => !prev)
  }

  const passType = () => {
    if(showPass) return 'text'
    return 'password'
  }

  useEffect(() => {
    if(localStorage.getItem('logged') === "true") navigate('/allBreeds')
  }, [])

  return (
    <div className='login-form-container'>
      <form action="">
        <h1>Welcome to Doggo App</h1>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id='email'
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
          />
          <div className="errorMessage">{errorMessages.emailError}</div>
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <div className="pass-container">
            <input 
              type={passType()}
              id='password'
              maxlength="16"
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <div className="togglePass" onClick={toggleShowPass}>
              {showPass ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
          <div className="errorMessage">{errorMessages.passwordError}</div>
        </div>
        <button onClick={handleLogin}>Log In</button>
      </form>
    </div>
  )
}

export default LogInPage