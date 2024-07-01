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
import { getRoomPlaylists, updatePlaylistTrackCount } from '../../../utilities/functions/api/local/Playlist';
import { addCustomPlaylistCoverImage, addItemsToPlaylist, createPlaylist } from '../../../utilities/functions/api/spotify/Playlist';
import { getTracksInPlaylist, removeTracksFromPlaylist } from '../../../utilities/functions/api/local/Track';
import SnackPackContext from '../../../utilities/context/SnackPackContext';
import { createDownload } from '../../../utilities/functions/api/local/Download';

interface playlistTrack {
    order: Number,
    playlist: String,
    spotify_id: String,
    updatedAt: String
}

const Sandbox = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [playlistTracks, setPlaylistTracks] = useState<Dictionary<SavedTrack>>({});

    const [sharedPlaylists, setSharedPlaylists] = useState<Playlist[]>([]);
    const [sharedPlaylistTracks, setSharedPlaylistTracks] = useState<Dictionary<SavedTrack>>({});

    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [selectedSharedPlaylist, setSelectedSharedPlaylist] = useState("");

    const [playlistDetailsDialogOpen, setPlaylistDetailsDialogOpen] = useState(false);
    const [deletePlaylistDialogOpen, setDeletePlaylistDialogOpen] = useState(false);

    const [tracksPanelActive, setTracksPanelActive] = useState(false);
    const [sharedTracksPanelActive, setSharedTracksPanelActive] = useState(false);

    const socketObject = useSocketContext();
    const user = useUserContext();
    const token = useContext(TokenContext);
    const clipboard = useContext(ClipboardContext);
    const snackPack = useContext(SnackPackContext);

    const [focusedPlaylist, setFocusedPlaylist] = useState<Playlist | null>(null);
    const [focusedTrack, setFocusedTrack] = useState<Track | null>(null);

    useEffect(() => {
        socketObject.socket.on('server:create-playlist', (data) => {
            console.log(data);
            setPlaylists([...playlists, data]);
        });

        socketObject.socket.on('server:edit-playlist', (data) => {
            console.log(data);
            setPlaylists([...playlists.filter(p=>p.id !== data.id), data]);
        });

        socketObject.socket.on('server:delete-playlist', (data) => {
            setPlaylists(playlists.filter(p => p.id !== data.id))
        });

        socketObject.socket.on('server:add-track-to-playlist', (data) => {
            setPlaylistTracks(playlistTracks => ({
                ...playlistTracks,
                ...data
            }));
        });

        socketObject.socket.on('server:rearrange-playlist-content', (data) => {
            
        });

        socketObject.socket.on('server:remove-track-from-playlist', (data) => {
            // setPlaylistTracks(playlistTracks => (
            //     playlistTracks.filter(p => p.id !== data.id)
            // ));
        });

        socketObject.socket.on('server:share-playlist', (data) => {
            setSharedPlaylists([...sharedPlaylists, data]);
        });

        socketObject.socket.on('server:hide-playlist', (data) => {
            setSharedPlaylists(sharedPlaylists.filter(p => p.id !== data.id));
        });

        socketObject.socket.on('server:generate-code', (data) => {
            
        });

        socketObject.socket.on('server:playlist-downloaded', (data) => {

        });

    }, [socketObject, playlists, sharedPlaylists]);

    useEffect(() => {
        const getRoomPlaylists = async () => {
            const res = await fetch(`http://localhost:5000/api/playlist/${socketObject.roomID}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });

            const json = await res.json();
            if (res.ok) {
                let insertVal = {}

                for (var i in json.items) {
                    let tempInsertVal = {}
                    json.items[i].external_urls = {
                        spotify: ""
                    };
                    json.items[i].href = "";
                    json.items[i].id = json.items[i]._id;
                    json.items[i].images = [{url: json.items[i].image}];
                    json.items[i].snapshot_id = "";
                    json.items[i].tracks = {
                        href: "",
                        total: json.items[i].tracks
                    };
                    json.items[i].type = "playlist";
                    json.items[i].uri = "";

                    tempInsertVal = {[json.items[i]._id]: []}
                    insertVal = {
                        ...insertVal,
                        ...tempInsertVal
                    }
                }
                setPlaylists(json.items);
                setPlaylistTracks(playlistTracks => ({
                    ...playlistTracks,
                    ...insertVal
                }));
                console.log(json);
            }
            else {
                console.log(json.error);
            }
        }

        // const items = await getRoomPlaylists(socketObject.roomID);

        getRoomPlaylists()
    }, [socketObject.roomID]);

    const getRoomPlaylistTracks = async (playlistID: string) => {
        const res = await fetch(`http://localhost:5000/api/track/${playlistID}`, {
            method: "GET", headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        if (res.ok) {
            console.log(json);
            let savedTracks = json.items.map((item: playlistTrack) => item.updatedAt)
            let trackIDs = json.items.map((item: playlistTrack) => item.spotify_id).join(",");
            console.log(trackIDs);
            if (trackIDs.length > 0) {
                populateTrackData(trackIDs, savedTracks, playlistID);
            }
            // cacheRoomPlaylistData(insertVal);
        }
        else {
            console.error(json.error);
        }
    }

    const populateTrackData = async (trackIDs: string, savedTracks: string[], playlistID: string) => {
        const res = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIDs}`, {
            method: "GET", headers: { Authorization: `Bearer ${token.access_token}`}
        });
        const json = await res.json();
        if (res.ok) {
            console.log(json);

            let tracks = []
            for (let i in savedTracks) {
                tracks.push({added_at: savedTracks[i], track: json.tracks[i]})
            }

            let insertVal = {};
            insertVal = {[playlistID]: tracks};
            cacheRoomPlaylistData(insertVal);
        }
    }

    const addPlaylistToLibrary = async () => {
        if (focusedPlaylist) {
            const playlist = await createPlaylist(user.spotify_id, token.access_token, focusedPlaylist.name, focusedPlaylist.description);
            const tracks = await getTracksInPlaylist(focusedPlaylist.id);
            const trackURIs = tracks.map((track: Track) => {
                return track.uri
            });

            if (playlist.ok) {
                let snapshot_id = playlist.snapshot_id;
                if (trackURIs) {
                    const new_snapshot_id = await addItemsToPlaylist(playlist.id, token.access_token, trackURIs);
                    if (new_snapshot_id.ok) {
                        snapshot_id = new_snapshot_id.snapshot_id;
                    }
                }
                await createDownload(user.id, focusedPlaylist.id, snapshot_id);
                snackPack.changeSnackPackMessage(`Downloaded playlist ${focusedPlaylist.name}`)
            }
        }   
    }

    const addCoverImageToPlaylist = async (id: string) => {
        if (focusedPlaylist) {
            await addCustomPlaylistCoverImage(id, focusedPlaylist?.images[0].url, token.access_token);
        }
    }

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

    const editPlaylist = async (id: string) => {
        
    }

    const cacheRoomPlaylistData = (insertVal: {}) => {
        setPlaylistTracks(playlistTracks => ({
            ...playlistTracks,
            ...insertVal
        }));
    }

    const cacheSharedPlaylistData = (insertVal: {}) => {
        setSharedPlaylistTracks(playlistTracks => ({
            ...playlistTracks,
            ...insertVal
        }));
    }

    const onPaste = async () => {
        if (focusedPlaylist) {
            let selectedPlaylistTracks = playlistTracks[focusedPlaylist.id];
            for (var i = 0; i < clipboard.selectedItems.length; i++) {
                let newSavedTrack: SavedTrack = { added_at: Date.now().toString(), track: clipboard.selectedItems[i] }
                selectedPlaylistTracks.push(newSavedTrack);
            }

            let newKV = {[focusedPlaylist.id]: selectedPlaylistTracks}
            socketObject.socket.emit("client:track-added-to-playlist", newKV, socketObject.roomID);

            await createTrack(clipboard.selectedItems, focusedPlaylist.id);
            if (clipboard.selectedItems.length === 1) {
                snackPack.changeSnackPackMessage(`${clipboard.selectedItems[0].name} added to playlist`)
            }
            else {
                snackPack.changeSnackPackMessage(`Added ${clipboard.selectedItems.length} tracks to playlist`)
            }
            await updatePlaylistTrackCount(focusedPlaylist.id, selectedPlaylistTracks.length);
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
            // socketObject.socket.emit("client-track-removed-from-playlist", "", socketObject.roomID);
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

    const selectPlaylist = (id: string) => {
        setSelectedPlaylist(id);
        getRoomPlaylistTracks(id);
    }
    
    return (
        <div id="sandbox" className="flex w-full px-1 py-5">
            <PlaylistDetailsDialog open={playlistDetailsDialogOpen} playlist={focusedPlaylist} onClose={() => setPlaylistDetailsDialogOpen(false)}/>
            <DeletePlaylistDialog open={deletePlaylistDialogOpen} playlist={focusedPlaylist} onClose={() => setDeletePlaylistDialogOpen(false)}/>
            {
                selectedPlaylist === "" ? 
                <PlaylistsPanel
                    panelTitle="Room Playlists"
                    emptyPanelPlaceholderText="Playlists for this room appear here"
                    playlistData={playlists}
                    playlistTracks={playlistTracks}
                    contextMenuOptions={contextMenuOptionsPlaylist}
                    selectPlaylistCallback={(id) => selectPlaylist(id)}
                    openContextMenuCallback={(p: Playlist) => setFocusedPlaylist(p)}
                /> :
                <TracksPanel
                    cachePlaylist={cacheRoomPlaylistData}
                    selectedPlaylist={playlists.find(p => p.id === selectedPlaylist)}
                    selectedPlaylistData={playlistTracks[selectedPlaylist]}
                    showCloseButton={true}
                    contextMenuOptions={contextMenuOptionsTrack}
                    onCloseCallback={() => setSelectedPlaylist("")}
                    openContextMenuCallback={(t: Track | null) => { setFocusedTrack(t); console.log(t); }}
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