import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSetGridItems from './useSetGridItems'
function useLogout() {
    // const {itemNum} = useSetGridItems()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.setItem('logged', JSON.stringify(false))
        localStorage.setItem('displayedBreedsNum', 10)
        navigate('/login')
        console.log('logout')
    }

    useEffect(() => {
        if(localStorage.getItem('logged') === 'false') navigate('/login')
    }, [])

    return handleLogout
}

export default useLogout