import { IconButton } from '@mui/material';
import LocalPlaylistInterface from '../../../interfaces/localPlaylist';
import CoverImage from '../../common/CoverImage';
import MoreHorizRounded from '@mui/icons-material/MoreHorizRounded';

const Playlist = (props: {playlist: LocalPlaylistInterface}) => {
    const { playlist } = props;

    return (
        <div className="playlist-object">
            {/* <CoverImage id={playlist.id} url={playlist.images.length > 0 ? playlist.images[0].url : ""} size="m"/> */}
            <div className="item-info">
                <div>{playlist.name}</div>
            </div>
            {/* <div className="item-info">{playlist.tracks.total} tracks</div> */}
            <IconButton>
                <MoreHorizRounded className="icon-button"/>
            </IconButton>
        </div>
    );
}

export default Playlist;