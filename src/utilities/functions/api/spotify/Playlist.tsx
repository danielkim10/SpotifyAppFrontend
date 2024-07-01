const baseUrl = "https://api.spotify.com/v1/playlists"

// returns id: string, snapshot_id: string
export const createPlaylist = async (userID: string, accessToken: string, name: string, description: string) => {
    const res = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: "POST", headers: { Authorization: `Bearer ${accessToken}`},
        body: JSON.stringify({name, public: false, collaborative: false, description})
    });
    const json = await res.json();
    if (res.ok) { return { ok: res.ok, id: json.id, snapshot_id: json.snapshot_id } }
    else { return { ok: res.ok, id: "", snapshot_id: "" } }
}

export const editPlaylist = async (userID: string, accessToken: string) => {
    const res = await fetch(`${baseUrl}/${userID}`, {
        method: "PUT", headers: { Authorization: `Bearer ${accessToken}`},
        body: JSON.stringify({})
    });
    const json = await res.json();
    if (res.ok) { console.log(json); }
    else { console.log(json.error); }
}

export const addCustomPlaylistCoverImage = async (playlistID: string, image: string, accessToken: string) => {
    const res = await fetch(`${baseUrl}/${playlistID}/images`, {
        method: "PUT", headers: { Authorization: `Bearer ${accessToken}`},
        body: JSON.stringify({ image })
    });
    const json = await res.json();
    if (res.ok) { console.log(json); }
    else { console.error(json.error); }
}

// returns snapshot_id: string
export const addItemsToPlaylist = async (playlistID: string, accessToken: string, uris: string[]) => {
    const res = await fetch(`${baseUrl}/${playlistID}/tracks`, {
        method: "POST", headers: { Authorization: `Bearer ${accessToken}`},
        body: JSON.stringify({uris})
    });
    const json = await res.json();
    if (res.ok) { return { ok: res.ok, snapshot_id: json.snapshot_id }; }
    else { return { ok: res.ok, snapshot_id: "" }; }
}