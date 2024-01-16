import CoverImage from "../../common/CoverImage";
import TrackInterface from '../../../interfaces/track';
import { convertMillisecondsToMinutes, convertMillisecondsToSeconds } from "../../../utilities/functions/math/conversions";
import { formatMultipleArtists } from "../../../utilities/random";

const Track = (props: { track: TrackInterface } ) => {
    const { track } = props;

    return (
        <div className="track-object">
            <CoverImage id={track.id} url={track.album.images.length > 0 ? track.album.images[0].url : ""} size="s"/>
            <div className="item-info">
                <div className="t-name">{track.name}</div>
                <div className="t-name">{formatMultipleArtists(track.artists)}</div>
            </div>
            <div className="track-duration">
                {convertMillisecondsToMinutes(track.duration_ms)}:{convertMillisecondsToSeconds(track.duration_ms)}
            </div>
        </div>
    );
}

export default Track;