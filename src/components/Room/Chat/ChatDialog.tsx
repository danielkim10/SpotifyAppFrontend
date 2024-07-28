import { useState, useContext, KeyboardEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import RoomContext from '../../../utilities/context/RoomContext';
import ChatMessage from './ChatMessage';

const ChatDialog = (props: { open: boolean, onClose: () => void, sendMessage: (message: string) => void }) => {
    const { open, onClose, sendMessage } = props;
    const [message, setMessage] = useState("");
    const room = useContext(RoomContext);

    const sanitizeMessage = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            sendMessage(message);
            setMessage("");
        }
    }

    return (
        <Dialog open={open} onClose={onClose} className="max-h-default-page-height">
            <DialogTitle>Chat</DialogTitle>
            <DialogContent style={{ width: "600px", overflow: "hidden" }}>
                <div className="flex flex-col">
                    <ul className="max-h-[300px] overflow-y-scroll">
                    {
                        room.chatMessages.map(m => {
                            return <ChatMessage message={m} />
                        })
                    }
                    </ul>
                    <TextField id="" variant="outlined" fullWidth placeholder="Type here to chat" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={sanitizeMessage} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ChatDialog;