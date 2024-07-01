import { useState, useContext, MouseEvent } from 'react';

import TrackInterface from "../../../interfaces/track";
import { convertMillisecondsToMinutes, convertMillisecondsToSeconds } from '../../../utilities/functions/math/conversions';
import { formatMultipleArtists } from '../../../utilities/random';

import TokenContext from '../../../utilities/context/TokenContext';
import PlayerContext from '../../../utilities/context/PlayerContext';

import CoverImage from '../CoverImage';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const TrackItem = (props: {index: number, added: string, track: TrackInterface, selected: boolean, onClickCallback: (e: MouseEvent<HTMLDivElement>) => void, onRightClick: (e: MouseEvent<HTMLDivElement>, t: TrackInterface) => void}) => {
    const { index, added, track, selected, onClickCallback, onRightClick } = props;

    const [playing, setPlaying] = useState(false);
    const [hover, setHover] = useState(false);
    // const [selected, setSelected] = useState(false);

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

    const openContextMenu = (e: MouseEvent<HTMLDivElement>, t: TrackInterface) => {
        e.preventDefault();
        onRightClick(e, t);
    }

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        onClickCallback(e)
    }

    return (
        <tr className={`flex w-full p-[5px] ${selected ? `bg-lighter-grey`: `hover:bg-light-grey`}`} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={onClick} onDoubleClick={() => playTrack(track.uri)} onContextMenu={(e: MouseEvent<HTMLDivElement>) => openContextMenu(e, track)}>
            <td className="min-w-[50px] max-w-[50px] cursor-pointer my-auto mx-0">
                {
                    hover ?
                        <Tooltip title={`Play ${track.name} by ${formatMultipleArtists(track.artists)}`}>
                            <IconButton onClick={() => playTrack(track.uri)}><PlayArrowRoundedIcon className="text-white"/></IconButton>
                        </Tooltip>
                        :
                        <>{index}</>
                }
            </td>
            <CoverImage id={track.id} url={track.album.images.length > 0 ? track.album.images[0].url : ""} size="s"/>
            <td className="text-left px-1">
                <div className="w-[200px] max-w-[200px] my-auto truncate">{track.name}</div>
                <div className="w-[200px] max-w-[200px] my-auto truncate">{formatMultipleArtists(track.artists)}</div>
            </td>
            <td className="text-left px-1 my-auto">
                <div className="w-[150px] max-w-[150px] my-auto truncate">{track.album.name}</div>
            </td>
            <td className="text-left px-1 my-auto">
                <div className="w-[100px] max-w-[150px] my-auto truncate">{added.substring(0, 10)}</div>
            </td>
            <td className="w-[50px] my-auto mx-0">
                {convertMillisecondsToMinutes(track.duration_ms)}:{convertMillisecondsToSeconds(track.duration_ms)}
            </td>
            
        </tr>
    );
}

export default TrackItem;