import Button from '../../../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteRoom } from '../../../../utilities/functions/api/local/Room';
import { deleteMembersForRoom } from '../../../../utilities/functions/api/local/Member';

const DeleteRoomDialog = (props: { open: boolean, roomID: string, onClose: () => void }) => {
    const { open, roomID, onClose } = props;

    const onSubmit = async () => {
        const res2 = await deleteMembersForRoom(roomID);
        if (res2) {
            const res = await deleteRoom(roomID);
            if (res) {
                window.location.replace("http://localhost:3000/lobby")
            }
            else {
                console.error("error");
            }
        }
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to delete room? This action cannot be undone.`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label="Delete" bgColorScheme="green" handleClick={onSubmit}/>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteRoomDialog;