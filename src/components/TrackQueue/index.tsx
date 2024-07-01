import { useState } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import TrackDrawer from './TrackDrawer';

const TrackQueue = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleQueueClick = () => {
        var doc = document.getElementById("queue");
        if (openDrawer) {
            doc?.classList.add("text-white");
            doc?.classList.remove("text-s-green");
        }
        else {
            doc?.classList.add("text-s-green");
            doc?.classList.remove("text-white");
        }
        setOpenDrawer(!openDrawer);
    }

    return (
        <>
            <Tooltip title="Queue">
                <IconButton aria-label="queue">
                    <QueueMusicRoundedIcon id="queue" className="text-white"/>
                </IconButton>
            </Tooltip>
            <TrackDrawer open={openDrawer} onClose={handleQueueClick}/>
        </>
    );
}

export default TrackQueue;