import { useState, useEffect, useContext } from 'react';

import PlaylistsPanel from '../../common/PlaylistsPanel';
import Dictionary from '../../../interfaces/dictionary';
import Playlist from '../../../interfaces/playlist';
import SavedTrack from '../../../interfaces/savedTrack';
import TokenContext from '../../../utilities/context/TokenContext';
import TracksPanel from '../../common/TracksPanel';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';
import useUserContext from '../../../utilities/hooks/context/useUserContext';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';
import DeletePlaylistDialog from '../Dialog/DeletePlaylistDialog';
import PlaylistDetailsDialog from '../Dialog/PlaylistDetailsDialog';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import Track from '../../../interfaces/track';
import { updatePlaylistTrackCount } from '../../../utilities/functions/api/local/Playlist';
import { addCustomPlaylistCoverImage, addItemsToPlaylist, createPlaylist } from '../../../utilities/functions/api/spotify/Playlist';
import { getTracksInPlaylist, removeTracksFromPlaylist } from '../../../utilities/functions/api/local/Track';
import SnackPackContext from '../../../utilities/context/SnackPackContext';
import { createDownload, getDownloadsByUser } from '../../../utilities/functions/api/local/Download';
import RoomDeletedDialog from '../Dialog/RoomDeletedDialog';
import { refreshToken } from '../../../utilities/functions/api/local/Token';
import RoomContext from '../../../utilities/context/RoomContext';
import useHeaderCallback from '../../../utilities/hooks/context/useHeaderCallback';
import { Fab } from '@mui/material';
import { ChatRounded } from '@mui/icons-material';

interface playlistTrack {
    order: Number,
    playlist: String,
    spotify_id: String,
    updatedAt: String
}

interface DownloadObject {
    createdAt: String,
    playlist_id: String,
    snapshot_id: String,
    updatedAt: String,
    user_id: String
}

const Sandbox = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [playlistsDownloading, setPlaylistsDownloading] = useState<string[]>([]);
    const [playlistTracks, setPlaylistTracks] = useState<Dictionary<SavedTrack[]>>({});
    const [playlistTrackPage, setPlaylistTrackPage] = useState<Dictionary<Number>>({});
    const [playlistDownloads, setPlaylistDownloads] = useState<Dictionary<string>>({});
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [activePlaylistPageNumber, setActivePlaylistPageNumber] = useState(0);

    const [playlistDetailsDialogOpen, setPlaylistDetailsDialogOpen] = useState(false);
    const [deletePlaylistDialogOpen, setDeletePlaylistDialogOpen] = useState(false);
    const [roomDeletedDialogOpen, setRoomDeletedDialogOpen] = useState(false);

    const socketObject = useSocketContext();
    const user = useUserContext();
    const token = useContext(TokenContext);
    const room = useContext(RoomContext);
    const clipboard = useContext(ClipboardContext);
    const snackPack = useContext(SnackPackContext);

    const [focusedPlaylist, setFocusedPlaylist] = useState<Playlist | null>(null);
    const [focusedTrack, setFocusedTrack] = useState<Track | null>(null);

    useHeaderCallback(room.name);

    // const [sharedPlaylists, setSharedPlaylists] = useState<LocalPlaylist[]>([]);
    // const [sharedPlaylistTracks, setSharedPlaylistTracks] = useState<Dictionary<SavedTrack>>({});
    // const [selectedSharedPlaylist, setSelectedSharedPlaylist] = useState("");
    // const [tracksPanelActive, setTracksPanelActive] = useState(false);
    // const [sharedTracksPanelActive, setSharedTracksPanelActive] = useState(false);

    useEffect(() => {
        socketObject.on('server:create-playlist', (data) => {
            setPlaylists([...playlists, data]);
            setPlaylistTracks(playlistTracks => ({
                ...playlistTracks,
                ...{[data._id]: []}
            }));
        });

        socketObject.on('server:edit-playlist', (data) => {
            data.id = data._id
            const newPlaylists = playlists.filter(p => p.id !== data._id)
            setPlaylists([...newPlaylists, data]);
        });

        socketObject.on('server:delete-playlist', (data) => {
            setPlaylists(playlists.filter(p => p.id !== data.id))
            const newPlaylistTracks = playlistTracks;
            delete newPlaylistTracks[data.id];
            setPlaylistTracks(newPlaylistTracks);
        });

        socketObject.on('server:add-track-to-playlist', (data) => {
            setPlaylistTracks(playlistTracks => ({
                ...playlistTracks,
                ...data
            }));
        });

        socketObject.on('server:rearrange-playlist-content', (data) => {
            
        });

        socketObject.on('server:remove-track-from-playlist', (data) => {
            // setPlaylistTracks(playlistTracks => (
            //     playlistTracks.filter(p => p.id !== data.id)
            // ));
        });

        // socketObject.on('server:share-playlist', (data) => {
        //     setSharedPlaylists([...sharedPlaylists, data]);
        // });

        // socketObject.on('server:hide-playlist', (data) => {
        //     setSharedPlaylists(sharedPlaylists.filter(p => p.id !== data.id));
        // });

        socketObject.on('server:generate-code', (data) => {
            
        });

        socketObject.on('server:playlist-downloaded', (data) => {
            const dataFormatted = {[data.playlist_id]: data.updatedAt}
            setPlaylistDownloads(playlistDownloads => ({
                ...playlistDownloads,
                ...dataFormatted
            }));
        });

        socketObject.on('server:room-deleted', () => {
            setRoomDeletedDialogOpen(true);
        });
    }, [socketObject, playlists]);

    useEffect(() => {
        const getRoomPlaylists = async () => {
            const res = await fetch(`http://localhost:5000/api/playlist/${room.id}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });

            const json = await res.json();
            if (res.ok) {
                let insertVal = {}
                let pageInsertVal = {}

                for (let i in json.items) {
                    let tempInsertVal = {}
                    json.items[i].id = json.items[i]._id;
                    json.items[i].images = [{url: json.items[i].image}];

                    tempInsertVal = {[json.items[i]._id]: []}
                    insertVal = {
                        ...insertVal,
                        ...tempInsertVal
                    }

                    let pageTempInsert = {[json.items[i]._id]: 0}
                    pageInsertVal = {
                        ...pageInsertVal,
                        ...pageTempInsert
                    }
                }

                // get download history for each playlist
                
                let playlistIDs = json.items.map((item: Playlist) => item.id).join(",");
                if (playlistIDs) {
                    const res2 = await getDownloadsByUser(user.id, playlistIDs);
                    if (res2.ok) {
                        let dict: Dictionary<string> = Object.fromEntries(res2.json.items.map((item: DownloadObject) => [item.playlist_id, item.updatedAt]))
                        setPlaylistDownloads(dict);
                    }
                }

                setPlaylists(json.items);
                setPlaylistTracks(playlistTracks => ({
                    ...playlistTracks,
                    ...insertVal
                }));
                setPlaylistTrackPage(page => ({
                    ...page,
                    ...pageInsertVal
                }));
            }
            else {
                console.log(json.error);
            }
        }

        if (room.id) {
            getRoomPlaylists()
        }
    }, [room.id, user.id]);

    const getRoomPlaylistTracks = async (playlistID: string, pageNumber: Number) => {
        const res = await fetch(`http://localhost:5000/api/track/${playlistID}?` + new URLSearchParams({
            page: pageNumber.toString(),
            limit: "10"
        }), {
            method: "GET", headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        if (res.ok) {
            // const newPageNumber = Number(playlistTrackPage[playlistID]) + 1;
            // setPlaylistTrackPage(page => ({
            //     ...page,
            //     ...{
            //         [playlistID]: newPageNumber
            //     }
            // }))
            setActivePlaylistPageNumber(activePlaylistPageNumber + 1);

            let savedTracks = json.items.map((item: playlistTrack) => item.updatedAt)
            let trackIDs = json.items.map((item: playlistTrack) => item.spotify_id).join(",");

            if (trackIDs.length > 0) {
                populateTrackData(trackIDs, savedTracks, playlistID, pageNumber, false);
            }
        }
        else {
            console.error(json.error);
        }
    }

    const populateTrackData = async (trackIDs: string, savedTracks: string[], playlistID: string, pageNumber: Number, retry: boolean) => {
        const res = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIDs}`, {
            method: "GET", headers: { Authorization: `Bearer ${token.access_token}`}
        });
        const json = await res.json();
        if (res.ok) {
            let tracks = []
            for (let i in savedTracks) {
                tracks.push({added_at: savedTracks[i], track: json.tracks[i]})
            }

            let insertVal = {};

            if (pageNumber === 0) {
                insertVal={[playlistID]: [...tracks]}
            }
            else {
                insertVal = {[playlistID]: [...playlistTracks[playlistID], ...tracks]};
            }
            cacheRoomPlaylistData(insertVal);
        }
        else {
            if (res.status === 401 && !retry) {
                const refreshSuccess = await refreshToken(token.refresh_token);
                if (refreshSuccess.ok) {
                    token.setAccessToken(refreshSuccess.access_token);
                    populateTrackData(refreshSuccess.access_token, savedTracks, playlistID, pageNumber, true);
                }
                else {
                    console.log("The token failed to refresh")
                }
            }
        }
    }

    const addPlaylistToLibrary = async () => {
        if (focusedPlaylist) {
            setPlaylistsDownloading([...playlistsDownloading, focusedPlaylist.id])
            const playlist = await createPlaylist(user.spotify_id, token, focusedPlaylist.name, focusedPlaylist.description);
            if (playlist) {
                const imageUploadSuccess = await addCustomPlaylistCoverImage(playlist.id, focusedPlaylist.image, token)
                console.log(imageUploadSuccess);
            }
            const tracks = await getTracksInPlaylist(focusedPlaylist.id);
            const trackURIs = tracks.map((track: Track) => {
                return track.uri
            });

            if (playlist.ok) {
                let snapshot_id = playlist.snapshot_id;
                if (trackURIs.length > 0) {
                    const new_snapshot_id = await addItemsToPlaylist(playlist.id, token, trackURIs);
                    if (new_snapshot_id.ok) {
                        snapshot_id = new_snapshot_id.snapshot_id;
                    }
                }
                const res = await createDownload(user.id, focusedPlaylist.id, snapshot_id);
                if (res) {
                    socketObject.emit("client:playlist-downloaded", res, room.id);
                    snackPack.changeSnackPackMessage(`Downloaded playlist ${focusedPlaylist.name}`)
                }

                setPlaylistsDownloading(playlistsDownloading.filter(p => p !== focusedPlaylist.id))
            }
        }
    }

    const cacheRoomPlaylistData = (insertVal: {}) => {
        setPlaylistTracks(playlistTracks => ({
            ...playlistTracks,
            ...insertVal
        }));
    }    

    const onPaste = async () => {
        if (focusedPlaylist) {
            let selectedPlaylistTracks = playlistTracks[focusedPlaylist.id];
            for (var i = 0; i < clipboard.selectedItems.length; i++) {
                let newSavedTrack: SavedTrack = { added_at: new Date(Date.now()).toString(), track: clipboard.selectedItems[i] }
                selectedPlaylistTracks.push(newSavedTrack);
            }

            let newKV = {[focusedPlaylist.id]: selectedPlaylistTracks}

            await createTrack(clipboard.selectedItems, focusedPlaylist.id);
            if (clipboard.selectedItems.length === 1) {
                snackPack.changeSnackPackMessage(`${clipboard.selectedItems[0].name} added to playlist`)
            }
            else {
                snackPack.changeSnackPackMessage(`Added ${clipboard.selectedItems.length} tracks to playlist`)
            }
            const updatedPlaylist = await updatePlaylistTrackCount(focusedPlaylist.id, focusedPlaylist.tracks + selectedPlaylistTracks.length);
            socketObject.emit("client:track-added-to-playlist", newKV, room.id);
            socketObject.emit("client:edit-playlist", updatedPlaylist, room.id);
        }
        
    }

    const createTrack = async (tracks: Track[], playlistID: string) => {
        let trackIDs = tracks.map(item => ({ spotify_id: item.id, uri: item.uri, playlist: playlistID, order: 1 }));
        
        const res = await fetch("http://localhost:5000/api/track/", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ids: trackIDs, order: 1})
        });

        const json = await res.json();
        if (res.ok) { console.log(json); }
        else { console.error(json.error); }
    }

    const removeFromPlaylist = async () => {
        if (focusedTrack) {
            const res = await removeTracksFromPlaylist(focusedTrack.id);
            // socketObject.emit("client-track-removed-from-playlist", "", room.id);
            snackPack.changeSnackPackMessage(`Track ${focusedTrack.name} removed`);
            console.log(res);
        }
    }

    const contextMenuOptionsPlaylist: ContextMenuOption[] = [
        { name: "Paste", iconName: "content_paste_rounded", function: onPaste, visible: clipboard.selectedItems.length > 0 },
        { name: "Edit Details", iconName: "edit_rounded", function: () => setPlaylistDetailsDialogOpen(true), visible: true },
        { name: "Add to Your Library", iconName: "playlist_add_rounded", function: addPlaylistToLibrary, visible: true },
        { name: "Delete", iconName: "delete_rounded", function: () => setDeletePlaylistDialogOpen(true), visible: true }
    ];

    const contextMenuOptionsTrack: ContextMenuOption[] = [
        /*{ name: "Play", iconName: "play_arrow_rounded", function: () => null, visible: focusedTrack !== null },*/
        { name: "Paste", iconName: "content_paste_rounded", function: onPaste, visible: clipboard.selectedItems.length > 0 },
        { name: "Add to Clipboard", iconName: "content_paste_go_rounded", function: () => null, visible: focusedTrack !== null },
        { name: "Remove from this playlist", iconName: "remove_circle_rounded", function: removeFromPlaylist, visible: focusedTrack !== null },
        { name: "Copy Link", iconName: "content_copy_rounded", function: () => null, visible: focusedTrack !== null },
        /*{ name: "Share to chat", iconName: "share_rounded", function: () => null, visible: focusedTrack !== null }*/
    ];

    const selectPlaylist = async (id: string) => {
        await getRoomPlaylistTracks(id, 0);
        setSelectedPlaylist(id);
    }

    const roomDeletedOnClose = () => {
        window.location.replace("http://localhost:3000/home")
        setRoomDeletedDialogOpen(false)
    }

    const onScrollToBottomCallback = (id: string) => {
        getRoomPlaylistTracks(id, activePlaylistPageNumber);
    }

    const exitPlaylistFocusMode = () => {
        setSelectedPlaylist("");
        setActivePlaylistPageNumber(0);
    }

    // const cacheSharedPlaylistData = (insertVal: {}) => {
    //     setSharedPlaylistTracks(playlistTracks => ({
    //         ...playlistTracks,
    //         ...insertVal
    //     }));
    // }

    // const addCoverImageToPlaylist = async (id: string) => {
    //     if (focusedPlaylist) {
    //         await addCustomPlaylistCoverImage(id, focusedPlaylist?.images[0].url, token.access_token);
    //     }
    // }

    // const addTracksToPlaylist = async (spotifyID: string) => {
    //     console.log(playlistTracks[id])
    //     if (playlistTracks[id].length > 0) {
    //         var trackURIs = playlistTracks[id].map((track) => {
    //             return track.track.uri
    //         })
    //         console.log(trackURIs)
    //         await addItemsToPlaylist(spotifyID, token.access_token, trackURIs);
    //     }
    // }
    
    return (
        <div id="sandbox" className="w-full max-h-default-page-height p-5">
            <PlaylistDetailsDialog open={playlistDetailsDialogOpen} playlist={focusedPlaylist} onClose={() => setPlaylistDetailsDialogOpen(false)}/>
            <DeletePlaylistDialog open={deletePlaylistDialogOpen} playlist={focusedPlaylist} onClose={() => setDeletePlaylistDialogOpen(false)}/>
            <RoomDeletedDialog open={roomDeletedDialogOpen} onClose={roomDeletedOnClose}/>
            {
                selectedPlaylist === "" ? 
                <PlaylistsPanel
                    panelTitle="Playlists"
                    emptyPanelPlaceholderText="Playlists for this room appear here"
                    playlistData={playlists}
                    playlistTracks={playlistTracks}
                    contextMenuOptions={contextMenuOptionsPlaylist}
                    selectPlaylistCallback={(id) => selectPlaylist(id)}
                    openContextMenuCallback={(p: Playlist) => setFocusedPlaylist(p)}
                    playlistDownloads={playlistDownloads}
                    playlistsDownloading={playlistsDownloading}
                /> :
                <TracksPanel
                    cachePlaylist={cacheRoomPlaylistData}
                    selectedPlaylist={playlists.find(p => p.id === selectedPlaylist)}
                    selectedPlaylistData={playlistTracks[selectedPlaylist]}
                    showCloseButton={true}
                    contextMenuOptions={contextMenuOptionsTrack}
                    onCloseCallback={exitPlaylistFocusMode}
                    openContextMenuCallback={(t: Track | null) => { setFocusedTrack(t); }}
                    scrollToBottomCallback={(id: string) =>  onScrollToBottomCallback(id)}
                />
                
            }
            
            {/*
                selectedSharedPlaylist === "" ? 
                <PlaylistsPanel
                    panelTitle="Shared Playlists"
                    emptyPanelPlaceholderText="Playlists shared by users appear here"
                    playlistData={sharedPlaylists}
                    playlistTracks={sharedPlaylistTracks}
                    contextMenuOptions={contextMenuOptionsPlaylist}
                    selectPlaylistCallback={(id) => setSelectedSharedPlaylist(id)}
                    openContextMenuCallback={(p: Playlist) => setFocusedPlaylist(p)}
                /> :
                <TracksPanel
                    cachePlaylist={cacheSharedPlaylistData}
                    selectedPlaylist={sharedPlaylists.find(p => p.id === selectedSharedPlaylist)}
                    selectedPlaylistData={sharedPlaylistTracks[selectedSharedPlaylist]}
                    showCloseButton={true}
                    contextMenuOptions={contextMenuOptionsTrack}
                    onCloseCallback={() => setSelectedSharedPlaylist("")}
                    openContextMenuCallback={(t: Track | null) => setFocusedTrack(t)}
                />
            */}
        </div>
    );
}

export default Sandbox;