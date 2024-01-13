import React from 'react'
import { NavLink } from 'react-router-dom'

function DogBreed({breedName}) {
  return (
    <div className='breed-box'>
        <NavLink to={`/allBreeds/${breedName}`}>{breedName}</NavLink>
    </div>
  )
}

export default DogBreed