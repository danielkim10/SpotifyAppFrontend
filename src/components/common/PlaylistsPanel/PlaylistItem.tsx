// modules
import { MouseEvent } from 'react';

// interfaces
import Playlist from '../../../interfaces/playlist';

// components
import CoverImage from '../CoverImage';

const PlaylistItem = (props: { playlist: Playlist, onClick: () => void, onRightClick: (e: MouseEvent<HTMLDivElement>) => void }) => {
    const { playlist, onClick, onRightClick } = props;

    const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onRightClick(e);
    }

    return (
        <div className="playlist-object" onClick={onClick} onContextMenu={onContextMenu}>
            <CoverImage id={playlist.id} url={playlist.images.length > 0 ? playlist.images[0].url : ""} size="m"/>
            <div className="item-info">
                <div>{playlist.name}</div>
                <div>{playlist.owner.display_name}</div>
            </div>
            <div className="item-info">
                <div>{playlist.tracks.total} tracks</div>
            </div>
        </div>
    );
}

export default PlaylistItem;