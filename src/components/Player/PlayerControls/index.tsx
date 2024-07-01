import PlayerInfo from './PlayerInfo';
import PlayerControlsButtons from './PlayerControlsButtons';
import PlayerDurationSlider from './PlayerDurationSlider';
import PlayerVolumeSlider from './PlayerVolumeSlider';
import TrackQueue from '../../TrackQueue';
import CurrentTrack from '../../../interfaces/currentTrack';

const PlayerControls = (props: {
    currentTrack: CurrentTrack,
    paused: boolean,
    shuffle: boolean,
    repeatMode: number,
    position: number,
    duration: number,
    volume: number,
    handleShuffle: () => void,
    handlePreviousTrack: () => void,
    handleNextTrack: () => void,
    handleTogglePlay: () => void,
    handleRepeat: () => void,
    handleMute: () => void,
    handleVolumeChange: (event: Event, newVolume: number | number[]) => void,
    handlePositionChange: (event: Event, newVolume: number | number[]) => void
}) => {
    const { currentTrack, paused, shuffle, repeatMode,
            position, duration, volume, handleShuffle,
            handlePreviousTrack, handleNextTrack, handleTogglePlay,
            handleRepeat, handleMute, handleVolumeChange,
            handlePositionChange
        } = props;

    return (
        <>
            <PlayerInfo track={currentTrack}/>
            <div className="footer controls-main">
                <PlayerControlsButtons
                    paused={paused}
                    shuffle={shuffle}
                    repeatMode={repeatMode}
                    handleShuffle={handleShuffle}
                    handlePreviousTrack={handlePreviousTrack}
                    handleTogglePlay={handleTogglePlay}
                    handleNextTrack={handleNextTrack}
                    handleRepeat={handleRepeat}
                />
                <PlayerDurationSlider
                    paused={paused}
                    position={position}
                    duration={duration}
                    handlePositionChange={handlePositionChange}
                />
            </div>
            <div className="footer controls-other">
                <PlayerVolumeSlider
                    volume={volume}
                    handleMute={handleMute}
                    handleVolumeChange={handleVolumeChange}
                />
                <TrackQueue/>
            </div>
        </>
    )
}

export default PlayerControls;