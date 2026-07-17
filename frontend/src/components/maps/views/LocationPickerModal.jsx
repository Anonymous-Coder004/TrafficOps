import {useState} from "react"
import {X} from "lucide-react"

import MapPicker from "./MapPicker"
import useMapPicker from "../../../hooks/useMapPicker"
import useLocationSearch from "../../../hooks/useLocationSearch"

export default function LocationPickerModal({
    onClose,
    onSelect
}) {

    const [query,setQuery] = useState("")

    const {
        selectedLocation,
        selectLocation
    } = useMapPicker()

    const {
        results,
        loading,
        searchLocation,
        clearResults
    } = useLocationSearch()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="bg-white rounded-xl w-[90%] max-w-5xl h-[85vh] flex flex-col">

                {/* Header */}

                <div className="flex items-center justify-between p-4 border-b">

                    <h2 className="text-lg font-semibold">
                        Select Location
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        <X size={20}/>
                    </button>

                </div>

                {/* Search */}

                <div className="p-4 border-b">

                    <div className="flex gap-2">

                        <input
                            type="text"
                            value={query}
                            placeholder="Search location..."
                            className="flex-1 border rounded-lg px-3 py-2"
                            onChange={(e)=>{
                                setQuery(e.target.value)
                            }}
                            onKeyDown={(e)=>{

                                if(e.key==="Enter"){

                                    e.preventDefault()

                                    searchLocation(query)

                                }

                            }}
                        />

                        <button
                            type="button"
                            onClick={()=>{
                                searchLocation(query)
                            }}
                            className="
                                px-4
                                py-2
                                bg-emerald-600
                                text-white
                                rounded-lg
                                hover:bg-emerald-700
                            "
                        >
                            Search
                        </button>

                    </div>

                    {
                        results.length > 0 && (
                            <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg">

                                {
                                    results.map((result)=>(

                                        <button
                                            key={result.place_id}
                                            type="button"
                                            className="
                                                w-full
                                                text-left
                                                p-3
                                                hover:bg-gray-100
                                                border-b
                                            "
                                            onClick={()=>{

                                                selectLocation({
                                                    lat:Number(result.lat),
                                                    lng:Number(result.lon)
                                                })
                                                setQuery(result.display_name);
                                                clearResults();

                                            }}
                                        >
                                            {result.display_name}
                                        </button>

                                    ))
                                }

                            </div>
                        )
                    }

                    {
                        loading && (
                            <p className="mt-2 text-sm text-gray-500">
                                Searching...
                            </p>
                        )
                    }

                </div>

                {/* Map */}

                <div className="flex-1 p-4">

                    <MapPicker
                        value={selectedLocation}
                        onChange={selectLocation}
                        center={
                            selectedLocation
                                ? [
                                    selectedLocation.lat,
                                    selectedLocation.lng
                                ]
                                : [
                                    12.9716,
                                    77.5946
                                ]
                        }
                    />

                </div>

                {/* Selected Coordinates */}

                <div className="px-4 py-2 border-t">

                    {
                        selectedLocation && (
                            <div className="text-sm text-gray-600">

                                Latitude:
                                {" "}
                                {selectedLocation.lat.toFixed(6)}

                                <br/>

                                Longitude:
                                {" "}
                                {selectedLocation.lng.toFixed(6)}

                            </div>
                        )
                    }

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 p-4 border-t">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={!selectedLocation}
                        onClick={()=>{
                            onSelect(selectedLocation)
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                    >
                        Done
                    </button>

                </div>

            </div>

        </div>
    )
}