import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

import SocketContext from '../utilities/context/SocketContext';
import ClipboardContext from '../utilities/context/ClipboardContext';
import usePostRequest from '../utilities/hooks/requests/usePostRequest';
import Track from '../interfaces/track';
import Chat from '../components/Room/Chat';
import Sidebar from '../components/Room/Sidebar';
import Sandbox from '../components/Room/Sandbox';
import useUserContext from '../utilities/hooks/context/useUserContext';

const Room = () => {
    const [clipboardOpen, setClipboardOpen] = useState(false);
    const [clipboardItems, setClipboardItems] = useState<Track[]>([]);

    const socket = io("http://localhost:5000");
    const user = useUserContext();
    const roomID = new URL(window.location.href).searchParams.get("id");
    socket.emit('server:join-room', roomID, user.id);

    usePostRequest("http://localhost:5000/api/member/", JSON.stringify({roomID: roomID, userID: user.id, lastAccessTime: Date.now()}));

    // useEffect(() => {
    //     const createRoomMember = async () => {
    //         const res = await fetch("http://localhost:5000/api/member/", {
    //             method: "POST", headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({roomID: roomID, userID: user.id, lastAccessTime: Date.now()})
    //         });
    //         const json = await res.json();
    //         if (res.ok) {
    //             console.log(json);
    //         }
    //         else {
    //             console.log(json.error);
    //         }
    //     }

    //     createRoomMember();
    // }, [roomID, user.id, token.access_token])

    useEffect(() => {
        return () => {
            console.log("Disconnecting");
            socket.disconnect();
        }
    }, [socket]);

    const addClipboardItem = (track: Track) => {
        setClipboardItems([...clipboardItems, track]);
    }

    return (
        <SocketContext.Provider value={{socket: socket, roomID: roomID}}>
            <ClipboardContext.Provider value={{items: clipboardItems, open: clipboardOpen, selectedItem: null, openClipboard: setClipboardOpen, addItem: addClipboardItem}}>
                <div className="body room">
                    <Sidebar/>
                    <Sandbox />
                    <Chat user={user}/>
                </div>
            </ClipboardContext.Provider>
        </SocketContext.Provider>
    );
}

export default Room;