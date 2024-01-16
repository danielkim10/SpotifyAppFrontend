// modules
import { useState, KeyboardEvent } from 'react';

// mui components
import TextField from '@mui/material/TextField';

const ChatInput = (props: {sendMessage: (m: string) => void}) => {
    const { sendMessage } = props;

    const [message, setMessage] = useState("");

    const sanitizeMessage = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            sendMessage(message);
            setMessage("");
        }
    }

    return (
        <div className="chat-footer">
            <TextField id="" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={sanitizeMessage}/>
        </div>
    );
}

export default ChatInput;