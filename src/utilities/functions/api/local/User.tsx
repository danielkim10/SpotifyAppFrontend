const baseUrl = "http://localhost:5000/api/user"

export const getUserProfile = async (name: string, spotify_id: string): Promise<string> => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, spotify_id })
    });
    const json = await res.json();
    return res.ok ? json.items._id : "";
}