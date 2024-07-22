import Token from "../../../../interfaces/Token";

const baseUrl = "https://api.spotify.com/v1/playlists"

// returns id: string, snapshot_id: string
export const createPlaylist = async (userID: string, token: Token, name: string, description: string) => {
    const res = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: "POST", headers: { Authorization: `Bearer ${token.access_token}`},
        body: JSON.stringify({name, public: false, collaborative: false, description})
    });
    const json = await res.json();
    if (res.ok) { return { ok: res.ok, id: json.id, snapshot_id: json.snapshot_id } }
    else { return { ok: res.ok, id: "", snapshot_id: "" } }
}

export const editPlaylist = async (userID: string, token: Token) => {
    const res = await fetch(`${baseUrl}/${userID}`, {
        method: "PUT", headers: { Authorization: `Bearer ${token.access_token}`},
        body: JSON.stringify({})
    });
    const json = await res.json();
    if (res.ok) { console.log(json); }
    else { console.log(json.error); }
}

export const addCustomPlaylistCoverImage = async (playlistID: string, image: string, token: Token) => {
    image = image.substring("data:image/png;base64,".length);
    const res = await fetch(`${baseUrl}/${playlistID}/images`, {
        method: "PUT", headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'image/jpeg' },
        body: image
    });
    if (res.ok) { console.log(res.ok); }
    else { console.error(res.ok); }
}

// returns snapshot_id: string
export const addItemsToPlaylist = async (playlistID: string, token: Token, uris: string[]) => {
    const res = await fetch(`${baseUrl}/${playlistID}/tracks`, {
        method: "POST", headers: { Authorization: `Bearer ${token.access_token}`},
        body: JSON.stringify({uris})
    });
    const json = await res.json();
    if (res.ok) { return { ok: res.ok, snapshot_id: json.snapshot_id }; }
    else { return { ok: res.ok, snapshot_id: "" }; }
}