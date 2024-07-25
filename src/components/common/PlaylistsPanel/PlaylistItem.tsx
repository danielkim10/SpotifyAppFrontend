import { MouseEvent } from 'react';

import Playlist from '../../../interfaces/playlist';
import CoverImage from '../CoverImage';
import { relativeDateFormatter } from '../../../utilities/random';
import { Box, CircularProgress } from '@mui/material';

const PlaylistItem = (props: {
    index: number,
    playlist: Playlist,
    onClick: () => void,
    onRightClick: (e: MouseEvent<HTMLDivElement>, p: Playlist) => void,
    playlistDownload: string | null,
    playlistDownloading: boolean
}) => {
    const { index, playlist, onClick, onRightClick, playlistDownload, playlistDownloading } = props;

    const onContextMenu = (e: MouseEvent<HTMLDivElement>, p: Playlist) => {
        e.preventDefault();
        onRightClick(e, p);
    }

    return (
        <tr id="playlist-item" className="flex w-full cursor-pointer p-[5px] hover:bg-light-grey" onClick={onClick} onContextMenu={(e: MouseEvent<HTMLDivElement>) => onContextMenu(e, playlist)}>
            <td className="w-[50px] my-auto mx-0">{index}</td>
            <td className="w-[72px]">
                <Box sx={{m: 1, position: 'relative', margin: '0px'}}>
                    {
                        playlistDownloading ? <CircularProgress sx={{position: 'absolute', top: 15, left: 15, zIndex: 1}}/> : <></>
                    }
                    <CoverImage id={playlist.id} url={playlist.images?.length > 0 ? playlist.images[0].url : ""} size="m"/>
                </Box>
            </td>
            <td className="flex-1 text-left p-2 min-w-0"><p className="truncate">{playlist.name}</p></td>
            <td className="flex-1 text-left p-2"><p className="truncate">{playlist.owner.name}</p></td>
            <td className="flex-1 text-left p-2">{playlist.tracks} tracks</td>
            <td className="flex-1 text-left p-2">{relativeDateFormatter(playlist.updatedAt)}</td>
            <td className="flex-1 text-left p-2">{playlistDownloading ? "In progress" : playlistDownload ? relativeDateFormatter(playlistDownload) : "Never"}</td>
        </tr>
    );
}

export default PlaylistItem;