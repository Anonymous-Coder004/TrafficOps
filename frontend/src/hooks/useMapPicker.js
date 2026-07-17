import {useState} from "react"

export default function useMapPicker(){

    const [selectedLocation,setSelectedLocation]=useState(null)

    const selectLocation=(coords)=>{
        setSelectedLocation(coords)
    }

    const clearLocation=()=>{
        setSelectedLocation(null)
    }

    return {
        selectedLocation,
        selectLocation,
        clearLocation
    }
}