import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRounded from '@mui/icons-material/VolumeOffRounded';

const PlayerVolumeSlider = (props: {
    volume: number,
    handleMute: () => void,
    handleVolumeChange: (event: Event, newVolume: number | number[]) => void
}) => {
    const { volume, handleMute, handleVolumeChange } = props;

    return (
        <>
            <Tooltip title={volume === 0 ? "Unmute" : "Mute"}>
                <IconButton aria-label="mute-unmute" onClick={handleMute}>
                    {volume === 0 ? <VolumeOffRounded className="icon-button"/> : (volume > 0 && volume < 50 ? <VolumeDownRounded className="icon-button"/> : <VolumeUpRounded className="icon-button"/>)}
                </IconButton>
            </Tooltip>
            <Slider aria-label="volume" className="volume-slider" value={volume} defaultValue={30} onChange={handleVolumeChange}/>
        </>
    );
}

export default PlayerVolumeSlider;