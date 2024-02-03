import React, { useState, useEffect } from 'react'
import '../assets/styles/SignUpPage.css'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import useRequest from '../hooks/useRequest'
import useFetch from '../hooks/useFetch'

function SignUpPage() {
    const navigate = useNavigate()
    const {loading, sendRequest} = useRequest()
    const {data} = useFetch({url: 'https://crudapi.co.uk/api/v1/doggoUsers'})

    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false,
        repeatPassword: false,
      })
      
    const [userData, setuserData] = useState({
      email: '',
      password: '',
    })
    
    const [signupError, setSignupError] = useState({
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
    })
  
    const handleFocus = (el) => {
        setIsFocused((prev) => ({ ...prev, [el]: true }))
      }
    
      const handleBlur = (el) => {
        setIsFocused((prev) => ({ ...prev, [el]: false }))
      }
      
  
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  
      if(email ===  null || email === ''){
        setSignupError(prev => ({...prev, emailError: 'Please enter email'}))
        return false
      }else if(!email.match(emailRegex)){
        setSignupError(prev => ({...prev, emailError: 'Email is invalid'})) 
        return false
      }else if(data?.some(user => user.email === email)){
        setSignupError(prev => ({...prev, emailError: 'This email already exists'})) 
        return false
      }
    
      setSignupError(prev => ({ ...prev, emailError: '' }))
      return true
    }
  
    const validatePassword = (password) => {
      const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  
      if(password ===  null || password === ''){
        setSignupError(prev => ({...prev, passwordError: 'Please enter password'}))
        return false
      }else if(!password.match(passRegex)){
        setSignupError(prev => ({...prev, passwordError: 'Password must be 6-16 characters long and contain at least one digit and one special character'}))
        return false
      }
  
      setSignupError(prev => ({ ...prev, passwordError: '' }))
      return true
    }
  
    const validateRepeatPassword = (password, repeatPassword) => {
        if(password !== repeatPassword){
            setSignupError(prev => ({...prev, repeatPasswordError: "Passwords don't match"}))
            return false
        }

        setSignupError(prev => ({ ...prev, repeatPasswordError: '' }))
        return true
    }
    const handleSignUp = (e) => {
      e.preventDefault()
  
      let isValidEmail = validateEmail(userData.email)
      let isValidPassword = validatePassword(userData.password)
      let isPassMatched = validateRepeatPassword (userData.password, userData.repeatPassword)
  
  
      if(isValidEmail && isValidPassword && isPassMatched){
        sendRequest([userData])
        localStorage.setItem('logged', JSON.stringify(true))
        navigate('/allBreeds')
      }
    }


  
    useEffect(() => {
      localStorage.setItem('displayedBreedsNum', 10)
      if(localStorage.getItem('logged') === "true") navigate('/allBreeds')
    }, [])

  return (
    <div className='signup-form-container'>
        <form action="">
            <h1>Sign up to see cute doggos</h1>
            <div className="input-container">
                <div className="input-field-container">
                    <label htmlFor="email" className={isFocused.email || userData.email ? 'focused' : ''}>Email</label>
                    <input 
                        type="email" 
                        id='email'
                        className={isFocused.email || userData.email ? 'focused' : ''}
                        onChange={(e) => setuserData({...userData, email: e.target.value})}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                    />
                </div>
                <div className="errorMessage">{signupError.emailError}</div>
            </div>
            <PasswordInput 
                setData={setuserData}
                data={userData}
                errorMessages={signupError}
                handleBlur={handleBlur}
                handleFocus={handleFocus}
                isFocused={isFocused}
                id={'password'}
            />
            <PasswordInput 
                setData={setuserData}
                data={userData}
                errorMessages={signupError}
                handleBlur={handleBlur}
                handleFocus={handleFocus}
                isFocused={isFocused}
                id={'repeatPassword'}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <p style={{width: '100%', textAlign: 'center', marginTop: '30px'}}>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </form>
    </div>
  )
}

export default SignUpPage