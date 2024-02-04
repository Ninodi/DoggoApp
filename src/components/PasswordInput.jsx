import React, {useState} from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function PasswordInput({setData, data, errorMessages, id, handleFocus, handleBlur, isFocused, handleErrorReset}) {
const [showPass, setShowPass] = useState(false)

const toggleShowPass = () => {
    setShowPass(prev => !prev)
}

const passType = () => {
    if(showPass) return 'text'
    return 'password'
}

  return (
    <div className="input-container">
        <div className="input-field-container">
            <div className="pass-container">
                <input 
                    type={passType()}
                    id={id}
                    className={isFocused[id] || data[id] ? 'focused' : ''}
                    maxLength="16"
                    onKeyDown={() => handleErrorReset(id+'Error')}
                    onChange={(e) => setData({...data, [id === "password" ? "password" : "repeatPassword"]: e.target.value})}
                    onFocus={() => handleFocus(`${id}`)}
                    onBlur={() => handleBlur(`${id}`)}
                />
                <label htmlFor={id} className={isFocused[id] || data[id] ? 'focused' : ''}>{id === 'password' ? 'Password' : 'Repeat password'}</label>
                <div className="togglePass" onClick={toggleShowPass}>
                    {showPass ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
            </div>
        </div>
        <div className="errorMessage">{id === "password" ? errorMessages.passwordError : errorMessages.repeatPasswordError}</div>
    </div>
  )
}

export default PasswordInput