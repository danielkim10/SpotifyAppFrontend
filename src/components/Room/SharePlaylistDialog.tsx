import { useState, useEffect, useContext } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PlaylistInterface from '../../interfaces/playlist';
import TokenContext from '../../utilities/context/TokenContext';

const SharePlaylistDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;

    const [playlistData, setPlaylistData] = useState<Array<PlaylistInterface>>([]);
    const [selected, setSelected] = useState([]);
    
    const token = useContext(TokenContext)

    useEffect(() => {
        const fetchPlaylists = async(): Promise<any> => {
            // setPlaylistLoading(true);
            const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
                method: "GET", headers: { Authorization: `Bearer ${token.access_token}` }
            });
            const json = await res.json();
            if (res.ok) {
                setPlaylistData(json.items);
                console.log(json.items);
            }
            else {
                console.log(json.error);
            }
            // setPlaylistLoading(false);
        }

        fetchPlaylists();
    }, [token])

    const sharePlaylists = () => {

    }
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>Share one of your playlists</DialogContentText>
                {
                    playlistData.length > 0 ?
                    <FormGroup>
                        
                    </FormGroup>:
                    <>No playlists</>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={sharePlaylists}>Share</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SharePlaylistDialog;