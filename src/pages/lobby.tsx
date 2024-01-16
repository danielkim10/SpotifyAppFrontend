import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import useHeaderCallback from '../utilities/hooks/context/useHeaderCallback';
import CreateRoomDialog from '../components/Lobby/CreateRoomDialog';
import JoinRoomDialog from '../components/Lobby/JoinRoomDialog';
import RoomList from '../components/Lobby/RoomList';
import useUserContext from '../utilities/hooks/context/useUserContext';

const Lobby = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const navigate = useNavigate();

    useHeaderCallback("Lobby");
    
    return (
        <div className="body lobby">
            <div className="panel">
                <Button variant="outlined" className="lobby-buttons" onClick={() => setDialogOpen(true)}>Create Room</Button>
                <Button variant="outlined" className="lobby-buttons" onClick={() => setJoinDialogOpen(true)}>Join Room</Button>
                <Button variant="outlined" className="lobby-buttons" onClick={() => navigate("/library")}>View Library</Button>
            </div>
            <div className="panel">
                <RoomList/>
            </div>
            <CreateRoomDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
            <JoinRoomDialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)} />
        </div>
    );
}

export default Lobby;