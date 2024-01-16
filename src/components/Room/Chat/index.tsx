// modules
import { useEffect, useState } from 'react';

// helpers
import User from '../../../interfaces/user';

// components
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

// mui components
import Fab from '@mui/material/Fab';

// mui icons
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';

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

const Chat = (props: {user: User}) => {
    const { user } = props;

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
        <div className="chat-window">
            {
                open ? 
                <>
                    <ChatHeader toggleChatWindow={toggleChatWindow}/>
                    <ChatBody messages={messages}/>
                    <ChatInput sendMessage={handleSendMessage}/>
                </> :
                <Fab onClick={() => toggleChatWindow(true)}>
                    <ChatRoundedIcon />
                </Fab>
            }
        </div>
    );
}

export default Chat;