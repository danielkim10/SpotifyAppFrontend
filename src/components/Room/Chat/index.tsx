import { useContext } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

import RoomContext from '../../../utilities/context/RoomContext';

const Chat = () => {
    const room = useContext(RoomContext);

    return (
        <div id="chat" className="flex flex-col min-w-[300px] float-right py-5">
            <ChatHeader/>
            <ChatBody messages={room.chatMessages}/>
            <ChatInput sendMessage={room.sendChatMessage}/>
        </div>
    );
}

export default Chat;