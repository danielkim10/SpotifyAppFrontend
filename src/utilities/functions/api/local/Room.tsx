const baseUrl = "http://localhost:5000/api/room";

export const getRoom = async (roomID: string) => {
    const res = await fetch(`${baseUrl}/${roomID}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    })
    const json = await res.json()
    if (res.ok) { return json }
    else { return undefined; }
}

export const createRoom = async (name: string, description: string, password: string, id: string): Promise<string | undefined> => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, description: description, owner: id, password: password })
    })
    const json = await res.json()
    if (res.ok) { return json.items._id; }
    else { return undefined; }
}

export const joinRoom = async (password: string): Promise<string | undefined> => {
    const res = await fetch(`${baseUrl}/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    });
    const json = await res.json();
    if (res.ok) { return json[0]._id; }
    else { return undefined; }
}

export const deleteRoom = async (id: string): Promise<boolean> => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    
    return res.ok;
}