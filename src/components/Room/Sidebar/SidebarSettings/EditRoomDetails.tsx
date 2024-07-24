import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '../../../common/Button';
import Tooltip from '@mui/material/Tooltip';

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useSocketContext from '../../../../utilities/hooks/context/useSocketContext';
import RoomContext from '../../../../utilities/context/RoomContext';
import UserContext from '../../../../utilities/context/UserContext';
import { InputAdornment } from '@mui/material';

const EditRoomDetails = () => {
    const [editMode, setEditMode] = useState(false);

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
        <div className="flex flex-col my-5 px-5">
            <div className="py-2">
                <TextField label="Room Name" value={room.name}
                    InputProps={{ 
                        sx: { '& .MuiInputBase-input': { color: 'white' }},
                        readOnly: editMode,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setEditMode(false)}>
                                    <Tooltip title="Edit" placement="bottom"><EditRoundedIcon className="text-white"/></Tooltip>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
                />
            </div>
            <div className="py-2">
                <TextField label="Password" value={room.password} type="text"
                    InputProps={{
                        sx: { '& .MuiInputBase-input': { color: 'white' }},
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => navigator.clipboard.writeText(room.password)}>
                                    <Tooltip title="Copy" placement="bottom"><ContentCopyRoundedIcon className="text-white"/></Tooltip>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
                />
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