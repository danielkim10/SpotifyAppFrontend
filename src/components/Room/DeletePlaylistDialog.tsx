import { useContext } from 'react';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useSocketContext from '../../utilities/hooks/context/useSocketContext';

const DeletePlaylistDialog = (props: {open: boolean, name: string, onClose: () => void}) => {
    const { open, name, onClose } = props;

    const socketObject = useSocketContext();
    const deletePlaylist = () => {
        socketObject.socket.emit('sandbox:delete-playlist', name, socketObject.roomID);
        onClose();
    }
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to delete playlist ${name}?`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={deletePlaylist}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeletePlaylistDialog;