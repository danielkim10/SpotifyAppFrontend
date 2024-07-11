export const refreshToken = async (token: string) => {
    
    const res = await fetch(`http://localhost:5000/api/auth/refresh_token/${token}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    return { ok: res.ok, access_token: json.new_access_token };
}