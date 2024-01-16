import { useContext } from 'react';

import Track from '../../../interfaces/track';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import PlayerContext from '../../../utilities/context/PlayerContext';

const TrackContextMenu = (props: {
    open: boolean,
    track: Track,
    anchorPosition: {top: number, left: number},
    options: string[],
    onClose: () => void
}) => {
    const { open, track, anchorPosition, options, onClose } = props;
    const clipboard = useContext(ClipboardContext);
    const player = useContext(PlayerContext);

    return (
        <Menu open={open} anchorPosition={{top: anchorPosition.top, left: anchorPosition.left}} anchorReference='anchorPosition' onClose={onClose}>
            {
                options.find((o) => o === "Play") ?
                <MenuItem>
                    <ListItemText>Play</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "AddClipboard") ?
                <MenuItem onClick={() => clipboard.addItem(track)}>
                    <ListItemText>Add to clipboard</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "AddPlaylist") ?
                <MenuItem>
                    <ListItemText>Add to playlist</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "RemovePlaylist") ?
                <MenuItem>
                    <ListItemText>Remove from this playlist</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "CopyLink") ?
                <MenuItem onClick={() => navigator.clipboard.writeText(track.uri)}>
                    <ListItemText>Copy song link</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "ShareChat") ?
                <MenuItem>
                    <ListItemText>Share to chat</ListItemText>
                </MenuItem> : <></>
            }
        </Menu>
    );
}

export default TrackContextMenu;