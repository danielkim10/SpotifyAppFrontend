import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ChatHeader = (props: {toggleChatWindow: (b: boolean) => void}) => {
    const { toggleChatWindow } = props;

    return (
        <div className="relative w-[300px] h-[40px]">
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Chat</p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <IconButton className="" onClick={() => toggleChatWindow(false)}>
                    <CloseRoundedIcon fontSize='large' className="text-white"/>
                </IconButton>
            </div>
        </div>
    );
}

export default ChatHeader;