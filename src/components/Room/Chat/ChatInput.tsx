import { useState, KeyboardEvent } from 'react';

import TextField from '@mui/material/TextField';
import Input from '../../common/Input';

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
        <div className="bg-grey w-full">
            <Input/>
            <TextField id="" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={sanitizeMessage}/>
        </div>
    );
}

export default ChatInput;