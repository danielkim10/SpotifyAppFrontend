import { createContext } from 'react';
import MessageEvent from '../../interfaces/MessageEvent';

interface Room {
    id: string,
    name: string,
    owner: string,
    password: string
    chatMessages: MessageEvent[]
    sendChatMessage: (message: string) => void
};

const room = {
    id: "",
    name: "",
    owner: "",
    password: "",
    chatMessages: [],
    sendChatMessage: (message: string) => null
};

const RoomContext = createContext<Room>(room);
export default RoomContext;