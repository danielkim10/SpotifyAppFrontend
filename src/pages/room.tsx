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

interface SnackbarMessage {
    message: string,
    key: number
}

const Room = () => {
    const roomID = new URL(window.location.href).searchParams.get("id");
    const socketObject = useSocketContext();
    socketObject.roomID = roomID;
    const user = useUserContext();

    const [clipboardOpen, setClipboardOpen] = useState(false);
    const [clipboardItems, setClipboardItems] = useState<Track[]>([]);
    const [selectedClipboardItems, setSelectedClipboardItems] = useState<Track[]>([]);

    const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | null>(null);

    useEffect(() => {
        socketObject.socket.emit('client:join-room', roomID);
    }, []);

    useEffect(() => {
        socketObject.socket.on("server:join-room", (data) => {
            console.log(`Joined room ${data}`);
        });

        socketObject.socket.on("server:change-snackpack", (data) => {
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
                <div className="flex min-h-default-page-height">
                    <Snackbar key={messageInfo ? messageInfo.key : undefined}
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        TransitionProps={{ onExited: handleExited }}
                        message={messageInfo ? messageInfo.message : undefined}
                        action={
                            <>
                                {/* <Button label="UNDO" bgColorScheme="grey" handleClick={handleSnackbarClose}/> */}
                                <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleSnackbarClose}>
                                    <CloseRoundedIcon />
                                </IconButton>
                            </>
                        }
                    />
                    <RoomLayout />
                </div>
            </SnackbarContext.Provider>
        </ClipboardContext.Provider>
    );
}

export default Room;