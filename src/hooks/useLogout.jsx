import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function useLogout() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.setItem('logged', JSON.stringify(false))
        localStorage.setItem('displayedBreedsNum', 10)
        navigate('/login')
    }

    useEffect(() => {
        if(localStorage.getItem('logged') === 'false') navigate('/login')
    }, [])

    return handleLogout
}

export default useLogout