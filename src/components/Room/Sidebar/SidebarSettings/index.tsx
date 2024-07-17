import { useState, useEffect, useContext } from 'react'
import Button from '../../../common/Button';

import useSocketContext from '../../../../utilities/hooks/context/useSocketContext';
import { generateRoomCode } from '../../../../utilities/random';
import EditRoomDetails from './EditRoomDetails';
import DeleteRoomDialog from './DeleteRoomDialog';
import UserContext from '../../../../utilities/context/UserContext';

const SidebarSettings = () => {
    const [deleteRoomDialogOpen, setDeleteRoomDialogOpen] = useState(false);
    const [roomOwner, setRoomOwner] = useState("");

    const socketObject = useSocketContext();
    const user = useContext(UserContext);

    useEffect(() => {
        const getRoomDetails = async () => {
            const res = await fetch(`http://localhost:5000/api/room/${socketObject.roomID}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });
            const json = await res.json();
            if (res.ok) {
                setRoomOwner(json.owner.name);
                console.log(json.owner.name);
                // setRoomName(json.name);
                // setRoomDescription(json.description);
                // setRoomCode(json.password);
            }
            else {
                console.log(json.error);
            }
        }
        getRoomDetails();
    }, [socketObject.roomID]);

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
            <Button label="Delete room" bgColorScheme="red" handleClick={() => setDeleteRoomDialogOpen(true)}/>
            <DeleteRoomDialog open={deleteRoomDialogOpen} roomID={socketObject.roomID!!} onClose={() => setDeleteRoomDialogOpen(false)}/>
        </div>
    )
}

export default SidebarSettings