import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { generateRoomCode } from '../../utilities/random';
import useUserContext from '../../utilities/hooks/context/useUserContext';
import { createRoom } from '../../utilities/functions/api/local/Room';
import { updateMember } from '../../utilities/functions/api/local/Member';

const CreateRoomDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const user = useUserContext();

    const attemptCreateRoom = async (name: string, description: string, password: string, owner: string) => {
        const id = await createRoom(name, description, password, owner);
        console.log(id)
        if (id) {
            const member = await updateMember(id, user.id);
            navigate({ pathname: "/room", search: createSearchParams({ id }).toString() });
        }
        else {}
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Room</DialogTitle>
            <DialogContent>
                <TextField id="name" label="Room Name" variant="standard" className="w-full" required onChange={(e) => setName(e.target.value)}/>
                <TextField id="description" label="Description" variant="standard" className="w-full" multiline rows={3} onChange={(e) => setDescription(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label="Create" bgColorScheme="green" handleClick={() => { attemptCreateRoom(name, description, generateRoomCode(6), user.id) }}/>
            </DialogActions>
        </Dialog>
    );
}

export default CreateRoomDialog