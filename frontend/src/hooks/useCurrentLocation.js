import {useState} from "react"

export default function useCurrentLocation(){

    const [location,setLocation]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const getLocation=()=>{

        setLoading(true)

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocation({
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                })

                setLoading(false)
            },
            (err)=>{
                setError(err.message)
                setLoading(false)
            }
        )
    }

    return {
        location,
        loading,
        error,
        getLocation
    }
}