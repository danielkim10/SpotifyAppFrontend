import { useContext } from 'react';

// mui components
import IconButton from '@mui/material/IconButton';

// mui icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ClipboardContext from '../../../utilities/context/ClipboardContext';

const ClipboardHeader = () => {
    const clipboardContext = useContext(ClipboardContext);

    return (
        <div className="chat-header">
            Clipboard
            <IconButton onClick={() => clipboardContext.openClipboard(false)}>
                <CloseRoundedIcon fontSize='large' className="icon-button"/>
            </IconButton>
        </div>
    );
}

export default ClipboardHeader;