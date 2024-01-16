import { useState, useEffect } from 'react';

const useGetRequest = (url: string, headers: HeadersInit) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async() => {
            const res = await fetch(url, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });
            const json = await res.json();
            if (res.ok) {
                setData(json.items);
            }
            else {
                console.log(json.error);
            }
        }
        getData();
    }, [url]);
    return data;
}

export default useGetRequest;