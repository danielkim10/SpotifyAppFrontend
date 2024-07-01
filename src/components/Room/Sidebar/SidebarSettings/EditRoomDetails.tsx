import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '../../../common/Button';
import Tooltip from '@mui/material/Tooltip';

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useSocketContext from '../../../../utilities/hooks/context/useSocketContext';

const EditRoomDetails = () => {
    const [editMode, setEditMode] = useState(false);
    const [codeVisible, setCodeVisible] = useState(false);

    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const socketObject = useSocketContext();

    useEffect(() => {
        const getRoomDetails = async () => {
            const res = await fetch(`http://localhost:5000/api/room/${socketObject.roomID}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });
            const json = await res.json();
            if (res.ok) {
                setRoomName(json.name);
                setRoomDescription(json.description);
                setRoomCode(json.password);
            }
            else {
                console.log(json.error);
            }
        }
        getRoomDetails();
    }, [socketObject.roomID]);

    const cancelEdits = () => {
        setEditMode(false);
    }

    const saveEdits = () => {
        setEditMode(false);
    }

    return (
        <div>
            <div>
                Room Details
            </div>
            {
                !editMode ?
                <IconButton onClick={() => setEditMode(true)}>
                    <Tooltip title="Edit"><EditRoundedIcon className="text-white"/></Tooltip>
                </IconButton> : <></>
            }
            <TextField className="text-white" value={roomName} disabled={!editMode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}/>
            <TextField value={roomDescription} disabled={!editMode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomDescription(e.target.value)}/>
            
            
            <div>
                <TextField value={roomCode} type={!codeVisible ? "password" : "text"}/>
                <IconButton>
                    <Tooltip title="Copy" placement="bottom"><ContentCopyRoundedIcon className="text-white"/></Tooltip>
                </IconButton>
                
                <IconButton onClick={() => setCodeVisible(!codeVisible)}>
                    <Tooltip title={!codeVisible ? "Show" : "Hide"} placement="bottom">
                    {
                        !codeVisible ? <VisibilityOffRoundedIcon className="text-white"/> : <VisibilityRoundedIcon className="text-white"/>
                    }
                    </Tooltip>
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