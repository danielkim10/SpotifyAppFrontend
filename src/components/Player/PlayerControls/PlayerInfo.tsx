import CurrentTrack from '../../../interfaces/currentTrack';
import CoverImage from '../../common/CoverImage';

import { formatMultipleArtists } from '../../../utilities/random';

const PlayerInfo = (props: {track: CurrentTrack}) => {
    const { track } = props;

    return (
        <div className="footer flex p-[20px]">
            <CoverImage id={track.album.name} url={track.album.images.length > 0 ? track.album.images[0].url : ""} size="s"/>
            <div className="h-[50px] items-center text-left">
                <div className="overflow-ellipsis">{track.name}</div>
                <div>{formatMultipleArtists(track.artists)}</div>
            </div>
        </div>
    );
}

export default PlayerInfo;