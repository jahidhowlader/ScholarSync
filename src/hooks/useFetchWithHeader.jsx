import axios from "axios";
import { useEffect, useState } from "react";


const useFetchWithHeader = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    useEffect(() => {

        fetch(`https://scholarsync-server-production.up.railway.app/api${url}`, {
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {

                setData(data)
                if (data?.length > 0) {

                    setLoading(false)
                }

                if (data?.length === 0) {

                    setLoading(false)
                }

            })
            // .catch(e => {
            //     setLoading(false)
            //     console.log(e);
            // })

    }, [token, url])

    const reFetch = async () => {

        setLoading(true);
        try {
            const res = await axios.get(`https://scholarsync-server-production.up.railway.app/api${url}`, {
                headers: {
                    authorization: token
                }
            });

            setData(res.data);

        } catch (err) {

            setError(err);
        }

        setLoading(false);
    }

    return { data, loading, setLoading, error, reFetch };
};

export default useFetchWithHeader;