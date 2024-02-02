import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/styles/LogInPage.css'
import PasswordInput from '../components/PasswordInput';
import useFetch from '../hooks/useFetch';

function LogInPage() {
  const navigate = useNavigate()
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  })
  
  const {data} = useFetch({url: 'https://crudapi.co.uk/api/v1/doggoUsers'})


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  
  const [errorMessages, setErrorMessages] = useState({
    emailError: '',
    passwordError: '',
  })


  const handleFocus = (el) => {
    setIsFocused((prev) => ({ ...prev, [el]: true }))
  }

  const handleBlur = (el) => {
    setIsFocused((prev) => ({ ...prev, [el]: false }))
  }
  
  let emailExists

  const validateEmail = (email) => {
    emailExists = data?.some(user => user.email === email)

    if(!emailExists){
      setErrorMessages(prev => ({...prev, emailError: 'This user does not exist'}))
      return false 
    }

    setErrorMessages(prev => ({ ...prev, emailError: '' }))
    return true
  }

  const validatePassword = (password, email) => {
    let isCorrectPass = data?.some(user => user.email === email && user.password === password)

    if(emailExists && !isCorrectPass){
      setErrorMessages(prev => ({...prev, passwordError: 'Password is not correct'}))
      return false
    }

    setErrorMessages(prev => ({ ...prev, passwordError: '' }))
    return true
  }


  const handleLogin = (e) => {
    e.preventDefault()

    let isValidEmail = validateEmail(loginData.email)
    let isValidPassword = validatePassword(loginData.password, loginData.email)


    if(isValidEmail && isValidPassword){
      localStorage.setItem('logged', JSON.stringify(true))
      navigate('/allBreeds')
    }
  }

  useEffect(() => {
    if(localStorage.getItem('logged') === "true") navigate('/allBreeds')
  }, [])

  return (
    <div className='login-form-container'>
      <form action="">
        <h1>Welcome to Doggo App</h1>
        <div className="input-container">
          <div className="input-field-container">
            <input 
              type="email" 
              id='email'
              className={isFocused.email || loginData.email ? 'focused' : ''}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
            />
            <label htmlFor="email" className={isFocused.email || loginData.email ? 'focused' : ''}>Email</label>
          </div>
          <div className="errorMessage">{errorMessages.emailError}</div>
        </div>
        <PasswordInput 
          setData={setLoginData}
          data={loginData}
          errorMessages={errorMessages}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          isFocused={isFocused}
          id={'password'}
        />
        <button onClick={handleLogin}>Log In</button>
        <p style={{width: '100%', textAlign: 'center', marginTop: '30px'}}>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
      </form>
    </div>
  )
}

export default LogInPage