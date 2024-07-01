import { useContext } from 'react';
import SocketContext from '../../context/SocketContext';

const useSocketContext = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error("Expected value for socket but received null");
    }
    return socket;
}

export default useSocketContext;