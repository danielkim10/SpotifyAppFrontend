// modules
import { useState, useContext, MouseEvent } from 'react';

// helpers
// import SavedTrackInterface from "../../../interfaces/savedTrack";
import TrackInterface from "../../../interfaces/track";
import { convertMillisecondsToMinutes, convertMillisecondsToSeconds } from '../../../utilities/functions/math/conversions';
import { formatMultipleArtists } from '../../../utilities/random';

import TokenContext from '../../../utilities/context/TokenContext';
import PlayerContext from '../../../utilities/context/PlayerContext';

// components
import CoverImage from '../CoverImage';

// mui components
import IconButton from '@mui/material/IconButton';

// mui icons
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const TrackItem = (props: {index: number, added: string, track: TrackInterface, onRightClick: (e: MouseEvent<HTMLDivElement>) => void}) => {
    const { index, added, track, onRightClick } = props;

    const [playing, setPlaying] = useState(false);
    const [hover, setHover] = useState(false);

    const token = useContext(TokenContext);
    const player = useContext(PlayerContext);

    const playTrack = async (trackUri: string) => {
        console.log(trackUri)
        const res = await fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT", headers: { Authorization: `Bearer ${token.access_token}` },
            body: JSON.stringify({
                "uris": [trackUri],
                "position_ms": 0
            })
        });

        const json = await res.json();
        if (res.ok) {
            console.log(json);
        }
        else {
            console.log(json.error);
        }
    }

    const handleOnMouseOver = () => {
        setHover(true);
    }

    const handleOnMouseOut = () => {
        setHover(false);
    }

    const openContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onRightClick(e);
    }

    return (
        <div className="track-object" onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut} onDoubleClick={() => playTrack(track.uri)} onContextMenu={openContextMenu}>
            <div className="track-index">
                {
                    hover ? <IconButton onClick={() => playTrack(track.uri)}><PlayArrowRoundedIcon className="icon-button"/></IconButton> : <div className="track-index">{index}</div>
                }
            </div>
            <CoverImage id={track.id} url={track.album.images.length > 0 ? track.album.images[0].url : ""} size="s"/>
            <div className="item-info">
                <div className="t-name">{track.name}</div>
                <div className="t-name">{formatMultipleArtists(track.artists)}</div>
            </div>
            <div className="item-info">
                <div className="t-name">{track.album.name}</div>
            </div>
            <div className="item-info">
                <div className="t-date">{added.substring(0, 10)}</div>
            </div>
            <div className="track-duration">
                {convertMillisecondsToMinutes(track.duration_ms)}:{convertMillisecondsToSeconds(track.duration_ms)}
            </div>
            
        </div>
    );
}

export default TrackItem;