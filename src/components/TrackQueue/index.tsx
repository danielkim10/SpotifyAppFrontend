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
            doc?.classList.add("icon-button");
            doc?.classList.remove("icon-active");
        }
        else {
            doc?.classList.add("icon-active");
            doc?.classList.remove("icon-button");
        }
        setOpenDrawer(!openDrawer);
    }

    return (
        <>
            <Tooltip title="Queue">
                <IconButton aria-label="queue">
                    <QueueMusicRoundedIcon id="queue" className="icon-button"/>
                </IconButton>
            </Tooltip>
            <TrackDrawer open={openDrawer} onClose={handleQueueClick}/>
        </>
    );
}

export default TrackQueue;