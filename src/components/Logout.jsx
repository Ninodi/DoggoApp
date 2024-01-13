import React from 'react'

function Logout({onLogout}) {
  return (
    <>
        <button 
        onClick={onLogout}
        id='logout-btn'
        >Log Out</button>
    </>
  )
}

export default Logout