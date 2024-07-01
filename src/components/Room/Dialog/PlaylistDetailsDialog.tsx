import { useState, useEffect, useContext } from 'react';
import Button from '../../common/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CoverImage from '../../common/CoverImage';
import useUserContext from '../../../utilities/hooks/context/useUserContext';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';

import Playlist from '../../../interfaces/playlist';
import { recordAction } from '../../../utilities/functions/api/local/Action';
import { createPlaylist, editPlaylist } from '../../../utilities/functions/api/local/Playlist';
import SnackPackContext from '../../../utilities/context/SnackPackContext';

const PlaylistDetailsDialog = (props: {open: boolean, playlist?: Playlist | null, onClose: () => void}) => {
    const { open, playlist, onClose } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const socketObject = useSocketContext();
    const user = useUserContext();
    const snackPack = useContext(SnackPackContext)

    useEffect(() => {
        setName(playlist?.name?? "");
        setDescription(playlist?.description?? "")
        setImage(playlist?.images[0]?.url?? "");
    }, [playlist])

    const onSubmitCreate = async () => {
        if (socketObject.socket && socketObject.roomID) {
            const newPlaylist = await createPlaylist(name, description, socketObject.roomID, user.id, image);
            if (newPlaylist) {
                const playlistModified = {
                    ...newPlaylist,
                    id: newPlaylist._id,
                    images: [{url: newPlaylist.image}]
                }

                socketObject.socket.emit('client:create-playlist', playlistModified, socketObject.roomID);
                snackPack.changeSnackPackMessage(`Playlist ${name} created`)
                await recordAction([user.id], [playlistModified.name], 3, socketObject.roomID);

                resetFields();
            }
        }
        else {
            console.error("Unable to connect to the server");
        }
        onClose();
    }

    const onSubmitEdit = async () => {
        if (socketObject.socket && playlist) {
            const newPlaylist = await editPlaylist(playlist.id, name, description, image);
            if (newPlaylist) {
                const playlistModified = {
                    ...newPlaylist,
                    id: newPlaylist._id,
                    images: [{url: newPlaylist.image}]
                }
                socketObject.socket.emit('client:edit-playlist', playlistModified, socketObject.roomID);
                snackPack.changeSnackPackMessage(`Playlist ${name} edited`)
                // await recordAction([user.id], [playlistModified.name], 4, socketObject.roomID);
                resetFields();
            }
        }
        else {
            console.error("Unable to connect to the server");
        }
        onClose();
    }

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            const reader = new FileReader()
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result.toString());
                }
            }
        }
    }

    const resetFields = () => {
        setName("");
        setDescription("");
        setImage("");
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{playlist ? "Edit Playlist" : "New Playlist"}</DialogTitle>
            <DialogContent>
                <CoverImage id="preview" url={image} size="l"/>
                <TextField id="name" value={name} label="Playlist Name" variant="outlined" required onChange={(e) => setName(e.target.value)}/>
                <TextField id="description" value={description} label="Description" variant="outlined" multiline rows={3} onChange={(e) => setDescription(e.target.value)}/>
                <input type="file" onChange={handleSelectImage}/>
                <div>
                By proceeding, you agree to give Spotify access to the image you choose to upload.
                Please make sure you have the right to upload the image.
                </div>
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label={playlist ? "Edit" : "Create" } bgColorScheme="green" handleClick={playlist ? onSubmitEdit : onSubmitCreate}/>
            </DialogActions>
        </Dialog>
    );
}

export default PlaylistDetailsDialog;