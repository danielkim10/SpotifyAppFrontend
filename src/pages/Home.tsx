import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import RoomMemberInterface from '../interfaces/member';

import useHeaderCallback from '../utilities/hooks/context/useHeaderCallback';
import CreateRoomDialog from '../components/Home/CreateRoomDialog';
import JoinRoomDialog from '../components/Home/JoinRoomDialog';
import RoomList from '../components/Home/RoomList';
import useGetRequest from '../utilities/hooks/requests/useGetRequest';
import useUserContext from '../utilities/hooks/context/useUserContext';

const Home = () => {
    const [createRoomDialogOpen, setCreateRoomDialogOpen] = useState(false);
    const [joinRoomDialogOpen, setJoinRoomDialogOpen] = useState(false);
    // const navigate = useNavigate();
    const user = useUserContext();

    document.title = "Home"

    useHeaderCallback("Socketfy");
    const rooms: RoomMemberInterface[] = useGetRequest(`http://localhost:5000/api/member/user/${user.id}`, { "Content-Type": "application/json" });
    
    return (
        <div className="flex min-h-default-page-height max-h-default-page-height p-5">
            <div className="bg-black w-1/2 m-2 p-2">
                <div id="create-room-button" className="h-1/2">
                    <Button label="Create Room" bgColorScheme="grey" handleClick={() => setCreateRoomDialogOpen(true)}/>
                </div>
                <div id="join-room-button" className="h-1/2">
                    <Button label="Join Room" bgColorScheme="grey" handleClick={() => setJoinRoomDialogOpen(true)}/>
                </div>
                {/*<div id="view-library-button" className="h-1/3">
                    <Button label="View Library" bgColorScheme="grey" handleClick={() => navigate("/library")}/>
                </div>*/}
            </div>
            <div className="bg-black w-1/2 m-2 p-2">
                <RoomList rooms={rooms}/>
            </div>
            <CreateRoomDialog open={createRoomDialogOpen} onClose={() => setCreateRoomDialogOpen(false)} />
            <JoinRoomDialog open={joinRoomDialogOpen} onClose={() => setJoinRoomDialogOpen(false)} />
        </div>
    );
}

export default Home;