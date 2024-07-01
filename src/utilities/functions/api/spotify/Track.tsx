export const getSeveralTracks = async (accessToken: string, trackIDs: string) => {
    const res = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIDs}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}`}
    });
    const json = await res.json();
    if (res.ok) { return json.tracks; }
    else { console.error(json.error); }
}