import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Logout from '../components/Logout'
import useLogout from '../hooks/useLogout'
import BreedDetailsBox from '../components/BreedDetailsBox'
import '../assets/styles/BreedDetailsPage.css'
import { RiArrowGoBackFill } from "react-icons/ri";
import Loader from '../components/Loader'

function BreedDetailsPage() {
    const {breedName} = useParams()
    const navigate = useNavigate()
    const {data, loading} = useFetch({url: `https://dog.ceo/api/breed/${breedName}/images/random`})
    const handleLogout = useLogout()

    const goBack = () => {
      navigate('/allBreeds')
    }
  return (
    <div className='breed-page-container'>
      <Logout onLogout={handleLogout}/>
      <div className="breed-details-container">
        <div id='goback' onClick={goBack}><RiArrowGoBackFill /> Go Back</div>
        <h1><span>{breedName}</span> is the cutest doggo you will ever see</h1>
        {loading
          ? <Loader />
          : <BreedDetailsBox breedImg={data}/>
        }
      </div>
    </div>
  )
}

export default BreedDetailsPage