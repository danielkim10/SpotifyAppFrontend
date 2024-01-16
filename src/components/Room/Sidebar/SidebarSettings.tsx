// modules
import { useState, useEffect, useContext } from 'react'

import useGetRequest from '../../../utilities/hooks/requests/useGetRequest';

// helpers
import RoomMember from '../../../interfaces/roommember';
import SidebarContext from '../../../utilities/context/SidebarContext';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';

const SidebarSettings = () => {
    const [roomCode, setRoomCode] = useState("");

    const sidebarContext = useContext(SidebarContext);
    const socketObject = useSocketContext();

    // useEffect(() => {
    //     const getRoomMembers = async () => {
    //         const res = await fetch(`http://localhost:5000/api/member/room/${roomID}`, {
    //             method: "GET", headers: { "Content-Type": "application/json" }
    //         });
    //         const json = await res.json();
    //         if (res.ok) {
    //             console.log(json);
    //         }
    //         else {
    //             console.log(json.error);
    //         }
    //     }
        
    //     getRoomMembers();
    // }, [roomID, sidebarContext])

    const roomMembers: RoomMember[] = useGetRequest(`http://localhost:5000/api/member/room/${socketObject.roomID}`, { "Content-Type": "application/json" });

    return (
        <div className="sidebar">
            {roomCode}
            <div>Generate room code</div>
            <div>Edit room details</div>
            {
                // roomMembers.map((rm) => {
                //     return <div>{rm.user.name}</div>
                // })
            }
            <div>Check member history</div>
            <div>Delete room</div>
        </div>
    )
}

export default SidebarSettings