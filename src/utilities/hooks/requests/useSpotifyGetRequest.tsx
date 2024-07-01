import { useState, useEffect } from 'react';
import SpotifyProfile from '../../../interfaces/SpotifyProfile';

const useSpotifyGetRequest = (url: string, token: string) => {
    const [data, setData] = useState<SpotifyProfile | undefined>(undefined);
    useEffect(() => {
        const getData = async() => {
            const res = await fetch(url, {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            });
            const json = await res.json();
            if (res.ok) {
                setData(json);
            }
            else {
                console.log(json.error);
            }
        }
        getData();
    }, [url, token]);
    return data;
}

export default useSpotifyGetRequest;