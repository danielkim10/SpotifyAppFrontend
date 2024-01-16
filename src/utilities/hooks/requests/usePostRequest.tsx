import { useEffect } from 'react';

const usePostRequest = (url: string, data: string) => {
    useEffect(() => {
        const postData = async() => {
            const res = await fetch(url, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: data
            });
            const json = await res.json();
            if (res.ok) {
                console.log(json);
            }
            else {
                console.log(json.error);
            }
        }
        postData();
    }, [url, data])
}

export default usePostRequest;