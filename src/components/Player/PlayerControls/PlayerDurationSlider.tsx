import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider'

import { convertMillisecondsToMinutes, convertMillisecondsToSeconds } from '../../../utilities/functions/math/conversions';

const PlayerDurationSlider = (props: {
    paused: boolean,
    position: number,
    duration: number,
    handlePositionChange: (e: Event, timestamp: number | number[]) => void
}) => {
    const { paused, position, duration, handlePositionChange } = props;

    const [sliderPosition, setSliderPosition] = useState(position)
    useEffect(() => {
        if (!paused) {
            const intervalID = setInterval(() => {
                setSliderPosition(sliderPosition + 1000)
            }, 1000)

            return () => clearInterval(intervalID)
        }
    }, [paused, sliderPosition])

    // const handlePositionChange = (e: Event, newPosition: number | number[]) => {
    //     setSliderPosition(newPosition as number)
    //     props.handlePositionChange(e, newPosition)
    // }

    return (
        <div>
            <span className="timestamp-text">{convertMillisecondsToMinutes(sliderPosition)}:{convertMillisecondsToSeconds(sliderPosition)}</span>
            <Slider
                size="small"
                aria-label="time"
                className="time-slider"
                value={sliderPosition}
                defaultValue={0}
                min={0}
                max={duration}
                onChange={handlePositionChange}
            />
            <span className="timestamp-text">{convertMillisecondsToMinutes(duration)}:{convertMillisecondsToSeconds(duration)}</span>
        </div>
    );
}

export default PlayerDurationSlider;