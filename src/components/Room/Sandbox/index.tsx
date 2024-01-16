// modules
import { useState, useEffect, useContext } from 'react';

import PlaylistsPanel from '../../common/PlaylistsPanel';

// helpers
import Dictionary from '../../../interfaces/dictionary';
import Playlist from '../../../interfaces/playlist';
import SavedTrack from '../../../interfaces/savedTrack';
import TokenContext from '../../../utilities/context/TokenContext';

import TracksPanel from '../../common/TracksPanel';

import useSocketContext from '../../../utilities/hooks/context/useSocketContext';
import useUserContext from '../../../utilities/hooks/context/useUserContext';

const Sandbox = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [playlistTracks, setPlaylistTracks] = useState<Dictionary<SavedTrack>>({});

    const [sharedPlaylists, setSharedPlaylists] = useState<Playlist[]>([]);
    const [sharedPlaylistTracks, setSharedPlaylistTracks] = useState<Dictionary<SavedTrack>>({});

    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [selectedSharedPlaylist, setSelectedSharedPlaylist] = useState("");

    const socketObject = useSocketContext();
    const user = useUserContext();
    const token = useContext(TokenContext);

    useEffect(() => {
        socketObject.socket.on('sandbox:playlist-created', (data) => {
            console.log(data);
            setPlaylists([...playlists, data]);
        });

        socketObject.socket.on('sandbox:playlist-edited', (data) => {

        });

        socketObject.socket.on('sandbox:playlist-deleted', (data) => {
            console.log(data);
            setPlaylists(playlists.filter(p => p.id !== data))
        });

        socketObject.socket.on('sandbox:add-track-to-playlist', (data) => {

        })

        socketObject.socket.on('sandbox:rearrange-playlist-content', (data) => {
            
        })

        socketObject.socket.on('sandbox:remove-track-from-playlist', (data) => {
            
        })

        socketObject.socket.on('sandbox:share-user-playlist', (data) => {
            
        })

        socketObject.socket.on('sandbox:hide-user-playlist', (data) => {
            
        })

        socketObject.socket.on('room:generate-code', (data) => { 
            
        });

        

    }, [socketObject, playlists]);

    useEffect(() => {
        const getRoomPlaylists = async () => {
            const res = await fetch(`http://localhost:5000/api/playlist/${socketObject.roomID}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            });

            const json = await res.json();
            if (res.ok) {
                for (var i in json.data) {
                    json.data[i].external_urls = {
                        spotify: ""
                    };
                    json.data[i].href = "";
                    json.data[i].id = json.data[i]._id;
                    json.data[i].images = [];
                    json.data[i].snapshot_id = "";
                    json.data[i].tracks = {
                        href: "",
                        total: 0
                    };
                    json.data[i].type = "playlist";
                    json.data[i].uri = "";
                }
                setPlaylists(json.data);
                console.log(json);
            }
            else {
                console.log(json.error);
            }
        }

        getRoomPlaylists()
    }, [socketObject.roomID]);

    const createPlaylist = async (name: string, description: string) => {
        console.log(user);
        const res = await fetch(`https://api.spotify.com/v1/users/${user.spotify_id}/playlists`, {
            method: "POST", headers: { Authorization: `Bearer ${token.access_token}`},
            body: JSON.stringify({name: name, public: false, collaborative: false, description: description})
        });
        const json = await res.json();
        if (res.ok) {
            console.log(json);
        }
        else {
            console.log(json.error);
        }
    }

    const editPlaylist = async (id: string) => {
        const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method: "PUT", headers: { Authorization: `Bearer ${token.access_token}`},
            body: JSON.stringify({})
        });
        const json = await res.json();
        if (res.ok) {
            console.log(json);
        }
        else {
            console.log(json.error);
        }
    }

    const getTracksInPlaylist = async (id: string) => {
        const res = await fetch(`http://localhost:5000/api/track/${id}`, {
            method: "GET", headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (res.ok) {
            console.log(json);
        }
        else {
            console.log(json.error);
        }
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

    const onCloseRoomPlaylist = () => {
        setSelectedPlaylist("");
    }

    const onCloseSharedPlaylist = () => {
        setSelectedSharedPlaylist("");
    }
    
    return (
        <div className="sandbox">
            {
                selectedPlaylist === "" ? 
                <PlaylistsPanel
                    panelTitle="Room Playlists"
                    emptyPanelPlaceholderText="Playlists for this room appear here"
                    playlistData={playlists}
                    playlistTracks={playlistTracks}
                    contextMenuOptions={["View", "Edit", "Delete"]}
                    selectPlaylistCallback={(id) => setSelectedPlaylist(id)}
                /> :
                <TracksPanel
                    cachePlaylist={cacheRoomPlaylistData}
                    selectedPlaylist={playlists.find(p => p.id === selectedPlaylist)}
                    selectedPlaylistData={playlistTracks[selectedPlaylist] ?? []}
                    showCloseButton={true}
                    contextMenuOptions={["Play", "AddClipboard", "RemovePlaylist", "CopyLink", "ShareChat"]}
                    onCloseCallback={onCloseRoomPlaylist}
                />
            }
            {
                selectedSharedPlaylist === "" ? 
                <PlaylistsPanel
                    panelTitle="Shared Playlists"
                    emptyPanelPlaceholderText="Playlists shared by users appear here"
                    playlistData={sharedPlaylists}
                    playlistTracks={sharedPlaylistTracks}
                    contextMenuOptions={["View"]}
                    selectPlaylistCallback={(id) => setSelectedSharedPlaylist(id)}
                /> :
                <TracksPanel
                    cachePlaylist={cacheSharedPlaylistData}
                    selectedPlaylist={sharedPlaylists.find(p => p.id === selectedSharedPlaylist)}
                    selectedPlaylistData={sharedPlaylistTracks[selectedSharedPlaylist] ?? []}
                    showCloseButton={true}
                    contextMenuOptions={["Play", "AddClipboard", "CopyLink", "ShareChat"]}
                    onCloseCallback={onCloseSharedPlaylist}
                />
            }
        </div>
    );
}

export default Sandbox;