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

export const deleteMemberByUser = async (userID: string, roomID: string) => {
    const res = await fetch(`${baseUrl}/user/${userID}/room/${roomID}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" },
    });
    
    return res.ok;
}

export const deleteMembersForRoom = async (roomID: string) => {
    const res = await fetch(`${baseUrl}/room/${roomID}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" },
    });

    return res.ok;
}