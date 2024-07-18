import { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '../../../common/Button';
import Tooltip from '@mui/material/Tooltip';

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useSocketContext from '../../../../utilities/hooks/context/useSocketContext';
import RoomContext from '../../../../utilities/context/RoomContext';
import UserContext from '../../../../utilities/context/UserContext';

const EditRoomDetails = () => {
    const [editMode, setEditMode] = useState(false);

    const [roomName, setRoomName] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const socketObject = useSocketContext();
    const user = useContext(UserContext);
    const room = useContext(RoomContext);

    const cancelEdits = () => {
        setEditMode(false);
    }

    const saveEdits = () => {
        setEditMode(false);
    }

    return (
        <div className="flex flex-col my-5">
            {
                user.id === room.owner ?
                <IconButton onClick={() => setEditMode(true)}>
                    <Tooltip title="Edit"><EditRoundedIcon className="text-white"/></Tooltip>
                </IconButton> : <></>
            }
            <TextField label="Room Name" value={room.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                InputProps={{
                    sx: {
                        '& .MuiInputBase-input': {
                            color: 'white'
                        },
                        
                    },
                }}
                sx={{
                    '& .MuiInputLabel-root': {
                        color: 'white'
                    },
                }}
                />
            <div>
                <TextField label="Password" value={roomCode} type="text"
                    InputProps={{
                        sx: {
                            '& .MuiInputBase-input': {
                                color: 'white'
                            },
                        },
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'white'
                        },
                    }}
                />
                <IconButton>
                    <Tooltip title="Copy" placement="bottom"><ContentCopyRoundedIcon className="text-white"/></Tooltip>
                </IconButton>
            </div>
            {
                editMode ?
                <div>
                    <Button label="Cancel" bgColorScheme="red" handleClick={cancelEdits}/>
                    <Button label="Save" bgColorScheme="green" handleClick={saveEdits}/>
                </div> : 
                <></>
            }
        </div>
    );
}

export default EditRoomDetails;