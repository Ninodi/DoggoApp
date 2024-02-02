import { useCallback, useEffect, useState } from 'react'

function useFetch({url}) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
  
    const onFetch = useCallback(async () => {
      let isDoggoUrl = url.includes('doggoUsers')

      try {
        const res = await fetch(url, 
          isDoggoUrl 
          ? {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
            },
          }
          : null
        )
        const result = await res.json()
        
        setData(isDoggoUrl ? result.items : result.message)
        setError(false)
        setLoading(false)
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
  
    return { data, error, loading }
  }
  
  export default useFetch;