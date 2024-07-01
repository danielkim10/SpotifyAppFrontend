import { MouseEvent } from 'react';

import Playlist from '../../../interfaces/playlist';
import CoverImage from '../CoverImage';

const PlaylistItem = (props: {
    playlist: Playlist,
    onClick: () => void,
    onRightClick: (e: MouseEvent<HTMLDivElement>, p: Playlist) => void
}) => {
    const { playlist, onClick, onRightClick } = props;

    const onContextMenu = (e: MouseEvent<HTMLDivElement>, p: Playlist) => {
        e.preventDefault();
        onRightClick(e, p);
    }

    return (
        <div id="playlist-item" className="flex w-full cursor-pointer p-2 hover:bg-light-grey" onClick={onClick} onContextMenu={(e: MouseEvent<HTMLDivElement>) => onContextMenu(e, playlist)}>
            <CoverImage id={playlist.id} url={playlist.images?.length > 0 ? playlist.images[0].url : ""} size="m"/>
            <div className="text-left w-1/2 p-2">
                <div id="playlist-name">{playlist.name}</div>
                <div id="playlist-owner">{playlist.owner.display_name}</div>
            </div>
            <div className="text-left w-1/2 p-2">
                <div id="playlist-track-count">{playlist.tracks?.total} tracks</div>
            </div>
        </div>
    );
}

export default PlaylistItem;