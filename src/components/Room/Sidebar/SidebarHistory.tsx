import { useState, useEffect, useContext } from 'react'

import SidebarContext from '../../../utilities/context/SidebarContext'
import useSocketContext from '../../../utilities/hooks/context/useSocketContext'
import RoomContext from '../../../utilities/context/RoomContext';

const SidebarHistory = () => {
    const sidebarOption = useContext(SidebarContext);
    const socketObject = useSocketContext();
    const room = useContext(RoomContext);
    const [items, setItems] = useState<String[]>([]);

    const strings = {
        1: "user has joined the room for the first time.",
        2: "user has generated a new room code.",
        3: "user has created a new playlist object1",
        4: "user has deleted a playlist object1",
        5: "user has renamed a playlist object1 to object2",
        6: "user has changed details on a playlist object1",
        7: "user has shared their playlist object1",
        8: "user has added a track object1 to playlist object2",
        9: "user has removed a track object1 from playlist object2",
        10: "user1 has banned user user2"
    }


    useEffect(() => {
        sidebarOption.callback("History");

        const getRoomHistory = async () => {
            const res = await fetch(`http://localhost:5000/api/action/${room.id}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            })
            const json = await res.json();
            if (res.ok) {
                console.log(json);
                for (let i in json.items) {
                    // console.log(strings[json.items[i].stringTemplate]);
                }
            }
            else {
                console.error(json.error);
            }
        }
        getRoomHistory();

    }, [sidebarOption, room.id]);

    return (
        <div className="h-[calc(h-full_-_[40px])]">
            
        </div>
    )
}

export default SidebarHistory