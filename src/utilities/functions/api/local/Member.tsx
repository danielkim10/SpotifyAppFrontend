const baseUrl = "http://localhost:5000/api/member";

export const updateMember = async (roomID: string, userID: string) => {
    const res = await fetch(baseUrl, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomID, userID, lastAccessTime: Date.now() })
    });

    const json = await res.json();
    if (res.ok) {
        console.log(json);
    }
    else {
        console.log(json.error);
    }
}