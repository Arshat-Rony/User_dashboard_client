import axios from "axios"
import { useEffect } from "react";


const useData = (data, setData) => {
    useEffect(() => {
        axios.get('http://localhost:8000/vouche/users/alluser')
            .then(res => setData(res.data.alluser))
    }, [setData])
    return {
        data,
        setData
    }
}



export default useData;