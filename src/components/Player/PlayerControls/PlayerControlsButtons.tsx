import IconButton from '@mui/material/IconButton';

import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';

const PlayerControlsButtons = (props: {
    paused: boolean,
    shuffle: boolean,
    repeatMode: number,
    handleShuffle: () => void,
    handlePreviousTrack: () => void,
    handleTogglePlay: () => void,
    handleNextTrack: () => void,
    handleRepeat: () => void,
}) => {
    const { paused, shuffle, repeatMode, handleShuffle, handlePreviousTrack, handleTogglePlay, handleNextTrack, handleRepeat } = props;

    return (
        <>
            <IconButton aria-label="shuffle" onClick={handleShuffle}>
                <ShuffleRoundedIcon id="shuffle" className={shuffle ? "icon-button" : "icon-active"}/>
            </IconButton>
            <IconButton aria-label="skip-previous" onClick={handlePreviousTrack}>
                <SkipPreviousRoundedIcon id="skip-previous" className="icon-button"/>
            </IconButton>
            <IconButton size="large" aria-label="play-pause" onClick={handleTogglePlay}>
                {paused ? <PlayCircleFilledWhiteRoundedIcon id="play-pause" className="icon-button" fontSize="large"/> : <PauseCircleFilledRoundedIcon className="icon-button" fontSize="large"/>}
            </IconButton>
            <IconButton aria-label="skip-next" onClick={handleNextTrack}>
                <SkipNextRoundedIcon id="skip-next" className="icon-button"/>
            </IconButton>
            <IconButton aria-label="repeat" onClick={handleRepeat}>
                {repeatMode === 2 ? <RepeatOneRoundedIcon id="repeat-one" className="icon-active"/> : <RepeatRoundedIcon id="repeat" className={repeatMode === 1 ? "icon-active" : "icon-button"}/>}
            </IconButton>
        </>
    );
}

export default PlayerControlsButtons;