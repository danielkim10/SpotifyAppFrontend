import { useEffect, useState } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

import Fab from '@mui/material/Fab';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';
import useUserContext from '../../../utilities/hooks/context/useUserContext';

interface MessageEvent {
    text: string,
    socketID: string,
    userID: string,
    name: string,
    imageURL: string,
    timestamp: Date
}

interface ServerMessageEvent {
    messageTemplate: string
}

const Chat = () => {
    const user = useUserContext();

    const [messages, setMessages] = useState<MessageEvent[]>([]);
    const [open, setOpen] = useState(false);

    const socketObject = useSocketContext();
    

    const toggleChatWindow = (value: boolean) => {
        setOpen(value);
    }
    
    useEffect(() => {
        socketObject.socket.on('chat:receive-message', (data) => { 
            console.log(data);
            setMessages([...messages, data]);
        });

        socketObject.socket.on('chat:receive-server-message', (data) => { 
            
        });

        socketObject.socket.on('chat:receive-track-message', (data) => { 
            
        });
        

    }, [socketObject, messages])

    const handleSendMessage = (message: string) => {
        console.log('message', message);
        socketObject.socket.emit('chat:send-message', {
            text: message,
            socketID: socketObject.socket.id,
            userID: user.id,
            name: user.name,
            imageURL: user.images.length > 0 ? user.images[0].url : "",
            timestamp: new Date()
        }, socketObject.roomID);
    }

    return (
        <div id="chat" className="flex flex-col min-w-[300px] float-right">
            {
                open ? 
                <>
                    <ChatHeader toggleChatWindow={toggleChatWindow}/>
                    <ChatBody messages={messages}/>
                    <ChatInput sendMessage={handleSendMessage}/>
                </> :
                <div id="chat-fab" className="flex-1">
                <Fab onClick={() => toggleChatWindow(true)}>
                    <ChatRoundedIcon />
                </Fab>
                </div>
            }
        </div>
    );
}

export default Chat;