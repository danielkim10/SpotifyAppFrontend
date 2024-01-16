import CurrentTrack from "../../../interfaces/currentTrack";
import CoverImage from "../../common/CoverImage";

import { formatMultipleArtists } from "../../../utilities/random";

const PlayerInfo = (props: {track: CurrentTrack}) => {
    const { track } = props;

    return (
        <div className="footer song-info">
            <CoverImage id={track.album.name} url={track.album.images.length > 0 ? track.album.images[0].url : ""} size="s"/>
            <div className="now-playing__side">
                <div className="now-playing__name">{track.name}</div>
                <div className="now-playing__artist">{formatMultipleArtists(track.artists)}</div>
            </div>
        </div>
    );
}

export default PlayerInfo;