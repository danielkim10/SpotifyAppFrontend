// modules
import { useState } from 'react';

// components
import ChatMessage from './ChatMessage';

interface MessageEvent {
    text: string,
    socketID: string,
    userID: string,
    name: string,
    imageURL: string,
    timestamp: Date
}

const ChatBody = (props: {messages: MessageEvent[]}) => {
    const { messages } = props;

    return (
        <div className="chat-body">
            {
                messages.map(m => {
                    return <ChatMessage message={m} />
                })
            }
        </div>
    );
}

export default ChatBody;