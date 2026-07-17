import { useState } from "react";
import { searchLocation } from "../api/maps";

export default function useLocationSearch() {

    const [results,setResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const search = async(query) => {

        if(!query.trim()){
            setResults([]);
            return;
        }

        try{

            setLoading(true);
            setError(null);

            const data =
                await searchLocation(query);

            setResults(data);

        }catch(err){

            console.error(err);
            setError("Failed to search location");

        }finally{

            setLoading(false);
        }
    };

    const clearResults = () => {
        setResults([]);
    };

    return {
        results,
        loading,
        error,
        searchLocation: search,
        clearResults
    };

}