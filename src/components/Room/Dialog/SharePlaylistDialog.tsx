import { useState, useEffect, useContext } from 'react';
import Button from '../../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PlaylistInterface from '../../../interfaces/playlist';
import TokenContext from '../../../utilities/context/TokenContext';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';
import RoomContext from '../../../utilities/context/RoomContext';
// import { recordAction } from '../../../utilities/functions/api/local/Action';
// import useUserContext from '../../../utilities/hooks/context/useUserContext';

const SharePlaylistDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;

    const [playlistData, setPlaylistData] = useState<Array<PlaylistInterface>>([]);
    // const [selected, setSelected] = useState([]);
    
    const token = useContext(TokenContext);
    // const user = useUserContext();
    const room = useContext(RoomContext);
    const socketObject = useSocketContext();

    // useEffect(() => {
    //     const fetchPlaylists = async(): Promise<any> => {
    //         // setPlaylistLoading(true);
    //         const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
    //             method: "GET", headers: { Authorization: `Bearer ${token.access_token}` }
    //         });
    //         const json = await res.json();
    //         if (res.ok) {
    //             setPlaylistData(json.items);
    //         }
    //         else {
    //             console.log(json.error);
    //         }
    //         // setPlaylistLoading(false);
    //     }

    //     fetchPlaylists();
    // }, [token])

    const sharePlaylists = async () => {
        if (socketObject && room.id) {
            socketObject.emit("client:share-playlist", room.id);

            // await recordAction([user.id], [""], 4, room.id);
        }
        onClose();
    }
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>Share one of your playlists</DialogContentText>
                {
                    playlistData.map((p) => {
                        return <div key={p.id}>{p.name}</div>
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button label="Cancel" bgColorScheme="red" handleClick={onClose}/>
                <Button label="Share" bgColorScheme="green" handleClick={sharePlaylists}/>
            </DialogActions>
        </Dialog>
    )
}

export default SharePlaylistDialog;