import Button from '../../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useSocketContext from '../../../utilities/hooks/context/useSocketContext';
import Playlist from '../../../interfaces/playlist';
// import useUserContext from '../../../utilities/hooks/context/useUserContext';
// import { recordAction } from '../../../utilities/functions/api/local/Action';
import { deletePlaylist } from '../../../utilities/functions/api/local/Playlist';
import { useContext } from 'react';
import SnackPackContext from '../../../utilities/context/SnackPackContext';

const DeletePlaylistDialog = (props: {open: boolean, playlist: Playlist | null, onClose: () => void}) => {
    const { open, playlist, onClose } = props;

    const socketObject = useSocketContext();
    // const user = useUserContext();
    const snackPack = useContext(SnackPackContext);

    const onSubmit = async () => {
        if (playlist && socketObject.roomID) {
            const res = await deletePlaylist(playlist.id);
            if (res) {
                socketObject.socket.emit('client:delete-playlist', playlist, socketObject.roomID);
                snackPack.changeSnackPackMessage(`Playlist ${playlist.name} deleted`);
                // await recordAction([user.id], [playlist.name], 4, socketObject.roomID);
            }
        }
        onClose();
    }
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to delete playlist ${playlist?.name}?`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label="Delete" bgColorScheme="green" handleClick={onSubmit}/>
            </DialogActions>
        </Dialog>
    );
}

export default DeletePlaylistDialog;