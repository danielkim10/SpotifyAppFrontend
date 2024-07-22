const baseUrl = "http://localhost:5000/api/track";
const headers = { "Content-Type": "application/json" }

export const getTracksInPlaylist = async (playlistID: string) => {
    const res = await fetch(`${baseUrl}/${playlistID}?` + new URLSearchParams({
        page: "0",
        limit: "0"
    }), {
        method: "GET", headers: headers
    });
    const json = await res.json();
    if (res.ok) { return json.items; }
    else { console.error(json.error); }
}

export const addTracksToPlaylist = async (playlistID: string) => {
    const res = await fetch(`${baseUrl}/`, {
        method: "POST", headers: headers,
        body: JSON.stringify({})
    });
    const json = await res.json();
    if (res.ok) { return json; }
    else { console.error(json.error); }
}

export const removeTracksFromPlaylist = async (trackID: string) => {
    const res = await fetch(`${baseUrl}/${trackID}`, {
        method: "DELETE", headers: headers
    });
    const json = await res.json();
    if (res.ok) { return json; }
    else { console.error(json.error); }
}