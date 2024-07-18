import { createContext } from 'react';

interface Room {
    id: string,
    name: string,
    owner: string
};

const room = {
    id: "",
    name: "",
    owner: ""
};

const RoomContext = createContext<Room>(room);
export default RoomContext;