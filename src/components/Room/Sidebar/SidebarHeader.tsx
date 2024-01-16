// modules
import { useContext } from 'react';

// helpers
import SidebarContext from '../../../utilities/context/SidebarContext';

// mui components
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// mui icons
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const SidebarHeader = () => {
    const sidebarContext = useContext(SidebarContext);

    return (
        <div>
            {
                sidebarContext.value !== 0 ?
                <Tooltip title="Back">
                    <IconButton onClick={() => sidebarContext.callback(0)}>
                        <ArrowBackIosRoundedIcon className="icon-button"/>
                    </IconButton>
                </Tooltip> : 
                <></>
            }
            <Tooltip title="Minimize">
                <IconButton>
                    <ChevronLeftRoundedIcon className="icon-button"/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default SidebarHeader;