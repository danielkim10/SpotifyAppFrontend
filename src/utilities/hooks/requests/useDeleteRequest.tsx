import { useEffect } from 'react';

const useDeleteRequest = (url: string) => {
    useEffect(() => {
        const deleteData = async() => {
            const res = await fetch(url, {
                method: "DELETE", headers: { "Content-Type": "application/json" }
            });
            const json = await res.json();
            if (res.ok) {
                console.log(json);
            }
            else {
                console.log(json.error);
            }
        }
        deleteData();
    }, [url]);
}

export default useDeleteRequest;