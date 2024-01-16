import { useContext, useState } from 'react';

import { v4 as uuid } from 'uuid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CoverImage from '../common/CoverImage';
import useUserContext from '../../utilities/hooks/context/useUserContext';
import useSocketContext from '../../utilities/hooks/context/useSocketContext';

const CreatePlaylistDialog = (props: {open: boolean, onClose: () => void}) => {
    const { open, onClose } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const socketObject = useSocketContext();
    const user = useUserContext();

    const createPlaylist = async () => {
        if (socketObject.socket) {
            const res = await fetch("http://localhost:5000/api/playlist/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({spotify_id: "", name: name, description: description, roomID: socketObject.roomID, userID: user.id})
            });

            const json = await res.json()
            if (res.ok) {
                console.log(json)

                let playlist = {
                    id: json.data._id,
                    spotify_id: "",
                    name: name,
                    description: description,
                    public: false,
                    collaborative: false
                }
                socketObject.socket.emit('sandbox:create-playlist', playlist, socketObject.roomID);

                const actionRes = await fetch("http://localhost:5000/api/action/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({users: [user.id], objects: [playlist.name], stringTemplate: 3, roomID: socketObject.roomID})
                });
                const actionJson = await actionRes.json();
                if (actionRes.ok) {
                    console.log(actionJson);
                }
                else {
                    console.error(actionJson.error);
                }
            }
            else {
                console.error(json.error);
            }
        }
        else {
            console.error("Unable to connect to the server");
        }

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>New Playlist</DialogTitle>
            <DialogContent>
                <CoverImage id="" url="" size="l"/>
                <TextField id="name" label="Playlist Name" variant="standard" required onChange={(e) => setName(e.target.value)}/>
                <TextField id="description" label="Description" variant="standard" multiline rows={3} onChange={(e) => setDescription(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={createPlaylist}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePlaylistDialog;