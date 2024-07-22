const baseUrl = "http://localhost:5000/api/playlist";

export const getRoomPlaylists = async (id: string) => {
    const res = await fetch(`${baseUrl}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    if (res.ok) { return json.items; }
    else { console.error(json.error); }
}

export const createPlaylist = async (name: string, description: string, roomID: string, userID: string, image: string) => {
    const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, roomID, userID, image })
    });
    const json = await res.json();
    if (res.ok) { return json.items; }
    else { console.error(json.error); }
}

export const editPlaylist = async (playlistID: string, name: string, description: string, image: string) => {
    const res = await fetch(`${baseUrl}/${playlistID}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image })
    });
    const json = await res.json();
    if (res.ok) { return json; }
    else { console.error(json.error); }
}

export const updatePlaylistTrackCount = async (id: string, tracks: number) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracks })
    });
    const json = await res.json();
    if (res.ok) { console.log(json); }
    else { console.error(json.error); }
}

export const deletePlaylist = async (id: string) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    if (res.ok) { return true; }
    else {
        console.error(json.error);
        return false;
    }
}