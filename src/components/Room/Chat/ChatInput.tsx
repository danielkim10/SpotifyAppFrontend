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
        <div className="bg-grey w-full float-end">
            <TextField id="" variant="outlined" fullWidth placeholder="Type here to chat" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={sanitizeMessage}
                InputProps={{
                    sx: {
                        '& .MuiInputBase-input': {
                            color: 'white'
                        },
                    },
                }}
                />
        </div>
    );
}

export default ChatInput;