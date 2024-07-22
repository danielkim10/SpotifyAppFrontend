import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useUserContext from '../utilities/hooks/context/useUserContext';
import RoomLayout from '../components/Room';
import useSocketContext from '../utilities/hooks/context/useSocketContext';

import ClipboardContext from '../utilities/context/ClipboardContext';
import Track from '../interfaces/track';
import SnackbarContext from '../utilities/context/SnackPackContext';
import { getRoom } from '../utilities/functions/api/local/Room';
import RoomContext from '../utilities/context/RoomContext';

interface SnackbarMessage {
    message: string,
    key: number
}

const Room = () => {
    const socketObject = useSocketContext();
    const user = useUserContext();

    const [clipboardOpen, setClipboardOpen] = useState(false);
    const [clipboardItems, setClipboardItems] = useState<Track[]>([]);
    const [selectedClipboardItems, setSelectedClipboardItems] = useState<Track[]>([]);

    const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | null>(null);

    const [roomID, setRoomID] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomOwner, setRoomOwner] = useState("");

    useEffect(() => {
        const room = new URL(window.location.href).searchParams.get("id");

        const getRoomDetails = async (roomID: string) => {
            const res = await getRoom(roomID);
            setRoomID(res._id);
            setRoomName(res.name);
            setRoomOwner(res.owner._id);

            document.title = res.name;
        }

        if (room) {
            getRoomDetails(room)
            socketObject.emit('client:join-room', room);
        }
    }, [])

    useEffect(() => {
        socketObject.on("server:join-room", (data) => {
            console.log(`Joined room ${data}`);
        });

        socketObject.on("server:change-snackpack", (data) => {
            changeSnackPackMessage(data);
        });
    }, [socketObject]);

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
          // Set a new snack when we don't have an active one
          setMessageInfo({ ...snackPack[0] });
          setSnackPack((prev) => prev.slice(1));
          setSnackbarOpen(true);
        } else if (snackPack.length && messageInfo && snackbarOpen) {
          // Close an active snack when a new one is added
          setSnackbarOpen(false);
        }
      }, [snackPack, messageInfo, snackbarOpen]);

    const addClipboardItems = (tracks: Track[]) => {
        setClipboardItems([...clipboardItems, ...tracks]);
    }

    const selectClipboardItems = (track: Track[]) => {
        setSelectedClipboardItems([...selectedClipboardItems, ...track]);
    }

    const deselectClipboardItems = (tracks: Track[]) => {
        setSelectedClipboardItems(selectedClipboardItems => selectedClipboardItems.filter(track => !tracks.includes(track)));
    }

    const removeClipboardItems = (tracks: Track[]) => {
        setClipboardItems(clipboardItems => clipboardItems.filter(track => !tracks.includes(track)));
    }

    const changeSnackPackMessage = (message: string) => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }

    const handleExited = () => {
        setMessageInfo(null);
    }

    return (
        <ClipboardContext.Provider value={{
            items: clipboardItems,
            open: clipboardOpen,
            selectedItems: selectedClipboardItems,
            openClipboard: setClipboardOpen,
            addItems: addClipboardItems,
            selectItems: selectClipboardItems,
            deselectItems: deselectClipboardItems,
            removeItems: removeClipboardItems
        }}>
            <SnackbarContext.Provider value={{
                changeSnackPackMessage: changeSnackPackMessage
            }}>
                <RoomContext.Provider value={{ id: roomID, name: roomName, owner: roomOwner }}>
                    <div className="flex min-h-default-page-height max-h-default-page-height">
                        <Snackbar key={messageInfo ? messageInfo.key : undefined}
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            disableWindowBlurListener
                            onClose={handleSnackbarClose}
                            TransitionProps={{ onExited: handleExited }}
                            message={messageInfo ? messageInfo.message : undefined}
                            action={
                                <>
                                    <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleSnackbarClose}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </>
                            }
                        />
                        <RoomLayout />
                    </div>
                </RoomContext.Provider>
            </SnackbarContext.Provider>
        </ClipboardContext.Provider>
    );
}

export default Room;