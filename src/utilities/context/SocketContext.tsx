import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
export default SocketContext;