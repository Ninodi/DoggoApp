import { useCallback, useEffect, useState } from 'react'

function useFetch({url}) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
  
    const onFetch = useCallback(async () => {
      try {
        const res = await fetch(url)
        const result = await res.json()
  
        setData(result.message)
        setError(false)
      } catch (err) {
        console.error(err)
        setError(true)
      }
  
      return () => {
        setData(null)
      }
    }, [url])
  
    useEffect(() => {
      onFetch()
    }, [onFetch])
  
    return { data, error }
  }
  
  export default useFetch;