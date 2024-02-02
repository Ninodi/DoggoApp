import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { v4 as uuidv4 } from 'uuid';
import Logout from '../components/Logout';
import DogBreed from '../components/DogBreed';
import '../assets/styles/AllBreedsPage.css'
import useLogout from '../hooks/useLogout';
import { BounceLoader } from 'react-spinners';

function AllBreedsPage() {
    const {data, error, loading} = useFetch({url: 'https://dog.ceo/api/breeds/list/all'})
    const handleLogout = useLogout()
    const [breeds, setBreeds] = useState([])
    const [displaydBreeds, setDisplaydBreeds] = useState(10)
    let slicedData = breeds.slice(0, displaydBreeds)

    const loadMore = () => {
        setDisplaydBreeds(prev => Math.min(prev + 10, breeds.length))
    }

    useEffect(() => {
        if (data) {
          setBreeds(Object.keys(data));
        }
      }, [data]);
    
    
  return (
    <div className='breeds-page-container'>
      
      <Logout onLogout={handleLogout}/>
      <h1>Here are all the breeds</h1>
      {
        loading 
        ? <BounceLoader className='loader' cssOverride={{position: 'fixed'}} color="#fff" />
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
        !loading && !(displaydBreeds >= breeds?.length)
        ? <button id='load-more' onClick={loadMore}>Load more</button>
        : null
      }
    </div>
  )
}

export default AllBreedsPage