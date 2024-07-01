const baseUrl = "http://localhost:5000/api/action";

export const recordAction = async (users: String[], objects: String[], stringTemplate: Number, roomID: String) => {
    const res = await fetch(`${baseUrl}/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({users: users, objects: objects, stringTemplate: stringTemplate, room: roomID})
    });
    const json = await res.json();
    if (res.ok) { console.log(json); }
    else { console.error(json.error); }
}