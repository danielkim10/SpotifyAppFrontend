import { useState, useEffect, useContext } from 'react'
import Button from '../../../common/Button';

import useSocketContext from '../../../../utilities/hooks/context/useSocketContext';
import { generateRoomCode } from '../../../../utilities/random';
import EditRoomDetails from './EditRoomDetails';
import DeleteRoomDialog from './DeleteRoomDialog';
import UserContext from '../../../../utilities/context/UserContext';
import RoomContext from '../../../../utilities/context/RoomContext';

const SidebarSettings = () => {
    const [deleteRoomDialogOpen, setDeleteRoomDialogOpen] = useState(false);
    const [leaveRoomDialogOpen, setLeaveRoomDialogOpen] = useState(false);
    const [roomOwner, setRoomOwner] = useState("");

    const socketObject = useSocketContext();
    const user = useContext(UserContext);
    const room = useContext(RoomContext);

    const generateCode = async () => {
        const newCode = generateRoomCode(6);

        const res = await fetch(`http://localhost:5000/api/room/`, {
            method: "PATCH", headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        if (res.ok) {
            console.log(json);
        }
        else {
            console.log(json.error);
        }
    }

    return (
        <div id="sidebar-settings" className="flex-auto">
            <EditRoomDetails />
            <Button label={user.id === room.owner ? "Delete room" : "Leave room"} bgColorScheme="red" handleClick={() => setDeleteRoomDialogOpen(true)}/>
            
            <DeleteRoomDialog open={deleteRoomDialogOpen} roomID={socketObject.roomID!!} onClose={() => setDeleteRoomDialogOpen(false)}/>
            {/* <LeaveRoomDialog open={leaveRoomDialogOpen} memberID={""} onClose={() => setLeaveRoomDialogOpen(false)}/> */}
        </div>
    )
}

export default SidebarSettings