import { useState, useContext } from 'react'

import Button from '../../../common/Button';
import EditRoomDetails from './EditRoomDetails';
import DeleteRoomDialog from './DeleteRoomDialog';
import LeaveRoomDialog from './LeaveRoomDialog';
import UserContext from '../../../../utilities/context/UserContext';
import RoomContext from '../../../../utilities/context/RoomContext';

const SidebarSettings = () => {
    const [deleteRoomDialogOpen, setDeleteRoomDialogOpen] = useState(false);
    const [leaveRoomDialogOpen, setLeaveRoomDialogOpen] = useState(false);

    const user = useContext(UserContext);
    const room = useContext(RoomContext);

    // const generateCode = async () => {
    //     const newCode = generateRoomCode(6);

    //     const res = await fetch(`http://localhost:5000/api/room/`, {
    //         method: "PATCH", headers: { "Content-Type": "application/json" }
    //     });
    //     const json = await res.json();
    //     if (res.ok) {
    //         console.log(json);
    //     }
    //     else {
    //         console.log(json.error);
    //     }
    // }

    return (
        <div id="sidebar-settings" className="flex-auto">
            <EditRoomDetails />
            <Button label={user.id === room.owner ? "Delete room" : "Leave room"} bgColorScheme="red" 
                handleClick={() => user.id === room.owner ? setDeleteRoomDialogOpen(true) : setLeaveRoomDialogOpen(true)}
            />

            <DeleteRoomDialog open={deleteRoomDialogOpen} roomID={room.id} onClose={() => setDeleteRoomDialogOpen(false)}/>
            <LeaveRoomDialog open={leaveRoomDialogOpen} userID={user.id} roomID={room.id} onClose={() => setLeaveRoomDialogOpen(false)}/>
        </div>
    )
}

export default SidebarSettings