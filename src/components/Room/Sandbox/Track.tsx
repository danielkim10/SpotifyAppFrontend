import { useState, MouseEvent, useContext } from 'react';

import CoverImage from '../../common/CoverImage';
import TrackInterface from '../../../interfaces/track';
import { formatMultipleArtists } from '../../../utilities/random';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import SnackPackContext from '../../../utilities/context/SnackPackContext';

const Track = (props: {
    track: TrackInterface,
    selected: boolean,
    inClipboard: boolean,
    onClick: (e: MouseEvent<HTMLLIElement>, t: TrackInterface) => void,
    onContextMenu: (e: MouseEvent<HTMLLIElement>, t: TrackInterface) => void,
    onMouseOver: (t: TrackInterface) => void
}) => {
    const { track, selected, inClipboard, onClick, onContextMenu, onMouseOver } = props;

    // const [selected, setSelected] = useState(false);
    const [actionButtonHovered, setActionButtonHovered] = useState(false);

    const clipboard = useContext(ClipboardContext);
    const snackPack = useContext(SnackPackContext);

    const buttonFunction = (e: MouseEvent<HTMLButtonElement>) => {
        if (inClipboard) {
            clipboard.deselectItems([track]);
            clipboard.removeItems([track]);
            snackPack.changeSnackPackMessage(`${track.name} removed from clipboard`);
        }
        else {
            clipboard.addItems([track]);
            snackPack.changeSnackPackMessage(`${track.name} added to clipboard`);
        }
        e.stopPropagation();
    }

    return (
        <li
            key={track.id}
            className={`relative flex w-full p-2 hover:cursor-pointer ${selected ? "bg-lighter-grey" : "hover:bg-light-grey"}`}
            onClick={(e) => onClick(e, track)}
            onContextMenu={(e) => onContextMenu(e, track)}
            onMouseOver={() => onMouseOver(track)}
        >
            <CoverImage id={track.id} url={track.album.images.length > 0 ? track.album.images[0].url : ""} size="s"/>
            <div className="text-left px-2">
                <div className="text-base max-w-250">{track.name}</div>
                <div className="text-base max-w-250 truncate">{formatMultipleArtists(track.artists)}</div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
                <Tooltip title={inClipboard ? "Remove" : "Add"} placement="right">
                    <IconButton onClick={(e) => buttonFunction(e)} onMouseOver={() => setActionButtonHovered(true)} onMouseOut={() => setActionButtonHovered(false)}>
                        {
                            !inClipboard ? 
                                <AddCircleOutlineRoundedIcon className="text-white" fontSize="large"/> :
                                    actionButtonHovered ?
                                        <RemoveCircleOutlineRoundedIcon className="text-red" fontSize="large"/> :
                                        <CheckCircleOutlineRoundedIcon className="text-s-green" fontSize="large"/>
                        }
                    </IconButton>
                </Tooltip>
            </div>
        </li>
    );
}

export default Track;