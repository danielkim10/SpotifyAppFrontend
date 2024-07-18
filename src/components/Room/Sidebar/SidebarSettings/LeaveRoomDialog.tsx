import Button from '../../../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteMember } from '../../../../utilities/functions/api/local/Member';

const LeaveRoomDialog = (props: { open: boolean, memberID: string, onClose: () => void }) => {
    const { open, memberID, onClose } = props;

    const onSubmit = async () => {
        const res = await deleteMember(memberID);
        if (res) {
            window.location.replace("http://localhost:3000/lobby");
        }
        else {
            console.error("error");
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to leave room?`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label="Delete" bgColorScheme="green" handleClick={onSubmit}/>
            </DialogActions>
        </Dialog>
    )
}

export default LeaveRoomDialog;