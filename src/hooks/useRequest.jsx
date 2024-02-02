import React, { useState } from 'react'

function useRequest() {
    const [loading, setLoading] = useState(false)
    const sendRequest = async (body) => {
        const res = await fetch('https://crudapi.co.uk/api/v1/doggoUsers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        setLoading(false)

        return data
    }

    return {loading, sendRequest}
}

export default useRequest