import { useState, useEffect, useContext } from 'react'
import Button from '../../../common/Button';

import useGetRequest from '../../../../utilities/hooks/requests/useGetRequest';
import RoomMember from '../../../../interfaces/member';
import SidebarContext from '../../../../utilities/context/SidebarContext';
import useSocketContext from '../../../../utilities/hooks/context/useSocketContext';
import { generateRoomCode } from '../../../../utilities/random';
import EditRoomDetails from './EditRoomDetails';
import MemberHistory from './MemberHistory';
import DeleteRoomDialog from './DeleteRoomDialog';
import { deleteRoom } from '../../../../utilities/functions/api/local/Room';
import UserContext from '../../../../utilities/context/UserContext';

const SidebarSettings = () => {
    const [deleteRoomDialogOpen, setDeleteRoomDialogOpen] = useState(false);

    const sidebarContext = useContext(SidebarContext);
    const socketObject = useSocketContext();
    const user = useContext(UserContext);

    useEffect(() => {
        const getRoomDetails = async () => {
            const res = await fetch(`http://localhost:5000/api/room/${socketObject.roomID}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });
            const json = await res.json();
            if (res.ok) {
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
        <div id="sidebar-settings" className="h-[calc(h-full_-_[40px])]">
            <EditRoomDetails />
            {/*<MemberHistory />*/}
            <Button label="Delete room" bgColorScheme="red" handleClick={() => setDeleteRoomDialogOpen(true)}/>
            <DeleteRoomDialog open={deleteRoomDialogOpen} roomID={socketObject.roomID!!} onClose={() => setDeleteRoomDialogOpen(false)}/>
        </div>
    )
}

export default SidebarSettings