// mui components
import IconButton from '@mui/material/IconButton';

// mui icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ChatHeader = (props: {toggleChatWindow: (b: boolean) => void}) => {
    const { toggleChatWindow } = props;

    return (
        <div className="chat-header">
            Chat
            <IconButton onClick={() => toggleChatWindow(false)}>
                <CloseRoundedIcon fontSize='large' className="icon-button"/>
            </IconButton>
        </div>
    );
}

export default ChatHeader;