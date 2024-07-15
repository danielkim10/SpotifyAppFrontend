import { useEffect, useState } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

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
    const [messages, setMessages] = useState<MessageEvent[]>([]);

    const user = useUserContext();
    const socketObject = useSocketContext();
    
    useEffect(() => {
        socketObject.socket.on('server:receive-message', (data) => {
            setMessages([...messages, data]);
        });

        socketObject.socket.on('chat:receive-server-message', (data) => { 
            
        });

        socketObject.socket.on('chat:receive-track-message', (data) => { 
            
        });
        

    }, [socketObject, messages])

    const handleSendMessage = (message: string) => {
        console.log('message', message);
        socketObject.socket.emit('client:send-message', {
            text: message,
            socketID: socketObject.socket.id,
            userID: user.id,
            name: user.name,
            imageURL: user.images.length > 0 ? user.images[0].url : "",
            timestamp: new Date()
        }, socketObject.roomID);
    }

    return (
        <div id="chat" className="flex flex-col min-w-[300px] float-right py-5">
            <ChatHeader/>
            <ChatBody messages={messages}/>
            <ChatInput sendMessage={handleSendMessage}/>
        </div>
    );
}

export default Chat;