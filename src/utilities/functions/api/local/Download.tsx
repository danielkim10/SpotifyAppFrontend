const baseUrl = "http://localhost:5000/api/download";

export const getDownloadsByUser = async(user_id: string, playlist_ids: string) => {
    const res = await fetch(`${baseUrl}/${user_id}/${playlist_ids}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    return { ok: res.ok, json: json }
}

export const createDownload = async(user_id: string, playlist_id: string, snapshot_id: string) => {
    const res = await fetch(`${baseUrl}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, playlist_id, snapshot_id})
    });
    const json = await res.json();
    if (res.ok) { return json.items; }
    else { console.error(json.error); }
}