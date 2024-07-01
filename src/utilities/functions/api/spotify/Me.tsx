const baseUrl = "https://api.spotify.com/v1/me"

export const getSpotifyProfile = async (token: String) => {
    const res  = await fetch(baseUrl, {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    });
    const json = await res.json();
    if (res.ok) { return json; }
    else { console.error(json.error); }
}