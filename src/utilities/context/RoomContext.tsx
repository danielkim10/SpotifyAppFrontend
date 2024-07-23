import { createContext } from 'react';

interface Room {
    id: string,
    name: string,
    owner: string,
    password: string
};

const room = {
    id: "",
    name: "",
    owner: "",
    password: "",
};

const RoomContext = createContext<Room>(room);
export default RoomContext;