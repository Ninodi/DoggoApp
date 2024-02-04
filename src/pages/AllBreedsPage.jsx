import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { v4 as uuidv4 } from 'uuid';
import Logout from '../components/Logout';
import DogBreed from '../components/DogBreed';
import '../assets/styles/AllBreedsPage.css'
import useLogout from '../hooks/useLogout';
import Loader from '../components/Loader';
import useSetGridItems from '../hooks/useSetGridItems';

function AllBreedsPage() {
  const {itemNum, itemStep} = useSetGridItems()
  const {data, error, loading} = useFetch({url: 'https://dog.ceo/api/breeds/list/all'})
  const displayedBreedsNum = +localStorage.getItem('displayedBreedsNum')
  const handleLogout = useLogout()
  const [breeds, setBreeds] = useState([])
  const [displayedBreeds, setDisplaydBreeds] = useState(displayedBreedsNum)
  let slicedData = breeds.slice(0, displayedBreeds)



  const loadMore = () => {
    setDisplaydBreeds(prev => {
      const newDisplayedBreeds = Math.min(prev + itemStep, breeds.length)
      localStorage.setItem('displayedBreedsNum', newDisplayedBreeds)
      return newDisplayedBreeds
    })
  }

  useEffect(() => {
      if (data) {
        setBreeds(Object.keys(data))
      }
    }, [data])

  useEffect(() => {
      setDisplaydBreeds(Math.min(itemNum, breeds.length))
  }, [itemNum, breeds.length])
    

  return (
    <div className='breeds-page-container'>
      
      <Logout onLogout={handleLogout}/>
      <h1>Here are all the breeds</h1>
      {
        loading 
        ? <Loader />
        : <div className="breeds-container">
            {error 
              ?  <h1>No doggos found</h1>
              : slicedData.map(breed => (
                <DogBreed 
                  key={uuidv4()}
                  breedName={breed}
                />
            ))}
      </div>
      }
      {
        !loading && !(displayedBreeds >= breeds?.length)
        ? <button id='load-more' onClick={loadMore}>Load more</button>
        : null
      }
    </div>
  )
}

export default AllBreedsPage