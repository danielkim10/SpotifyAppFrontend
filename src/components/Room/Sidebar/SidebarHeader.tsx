import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import SidebarContext from '../../../utilities/context/SidebarContext';

const SidebarHeader = () => {
    const sidebarContext = useContext(SidebarContext);

    return (
        <>
            {
                sidebarContext.value !== "" ?
                <div className="relative min-h-[40px]">
                    <b className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5">{sidebarContext.value}</b>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Tooltip title="Back">
                        <IconButton onClick={() => sidebarContext.callback("")}>
                            <ArrowBackIosRoundedIcon className="text-white"/>
                        </IconButton>
                    </Tooltip>
                    </div>
                </div> : 
                <></>
            }
        </>
    );
}

export default SidebarHeader;