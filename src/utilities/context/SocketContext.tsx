import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

interface CustomSocketObject {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    roomID: string | null
}

const SocketContext = createContext<CustomSocketObject | null>(null);
export default SocketContext;