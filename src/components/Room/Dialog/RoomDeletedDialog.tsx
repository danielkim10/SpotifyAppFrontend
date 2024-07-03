import Button from "../../common/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RoomDeletedDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Room Deleted</DialogTitle>
            <DialogContent>
                <DialogContentText>{`This room has been deleted. You will be redirected to the lobby.`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Confirm" bgColorScheme="green" handleClick={onClose}/>
            </DialogActions>
        </Dialog>
    )
}

export default RoomDeletedDialog;