import Button from "../../common/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PlaylistDeletedDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Playlist Deleted</DialogTitle>
            <DialogContent>
                <DialogContentText>{`This playlist has been deleted.`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Confirm" bgColorScheme="green" handleClick={onClose}/>
            </DialogActions>
        </Dialog>
    )
}

export default PlaylistDeletedDialog;