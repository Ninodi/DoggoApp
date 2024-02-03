import React from 'react'
import { BounceLoader } from 'react-spinners'

function Loader() {
  return (
    <BounceLoader className='loader' cssOverride={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} color="#fff" />
  )
}

export default Loader