import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Button from '../common/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { joinRoom } from '../../utilities/functions/api/local/Room';
import { updateMember } from '../../utilities/functions/api/local/Member';
import useUserContext from '../../utilities/hooks/context/useUserContext';

const JoinRoomDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;

    const [code, setCode] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const user = useUserContext();

    const attemptJoinRoom = async (password: string) => {
        const id = await joinRoom(password);
        console.log(id);
        if (id) {
            const member = await updateMember(id, user.id);
            navigate({ pathname: "/room", search: createSearchParams({ id }).toString() });
        }
        else {
            setError(true);
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Join Room</DialogTitle>
            <DialogContent>
                <TextField id="password" label="Password" variant="standard" error={error} helperText="Invalid password" onChange={(e) => setCode(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label="Join" bgColorScheme="green" handleClick={() => attemptJoinRoom(code)}/>
            </DialogActions>
        </Dialog>
    );
}

export default JoinRoomDialog;