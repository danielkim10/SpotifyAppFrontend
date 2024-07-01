import { useState, useEffect, useContext } from 'react';

import TokenContext from '../utilities/context/TokenContext';
import Dictionary from '../interfaces/dictionary';
import PlaylistInterface from '../interfaces/playlist';
import useHeaderCallback from '../utilities/hooks/context/useHeaderCallback';
import PlaylistsPanel from '../components/common/PlaylistsPanel';
import TracksPanel from '../components/common/TracksPanel';
import SavedTrack from '../interfaces/savedTrack';
import useUserContext from '../utilities/hooks/context/useUserContext';
import ContextMenuOption from '../interfaces/options/ContextMenuOption';
import Track from '../interfaces/track';

const Library = () => {
    const [playlistTracks, setPlaylistTracks] = useState<Dictionary<SavedTrack>>({"liked-songs": []});
    const [selectedPlaylist, setSelectedPlaylist] = useState("liked-songs");
    const [focusedPlaylist, setFocusedPlaylist] = useState<PlaylistInterface | null>(null);
    const [focusedTrack, setFocusedTrack] = useState<Track | null>(null);

    const token = useContext(TokenContext);
    const user = useUserContext();

    useHeaderCallback("Library");

    const likedSongsPlaylist: PlaylistInterface = {
        collaborative: false,
        description: "",
        external_urls: {
            spotify: ""
        },
        href: "",
        id: "liked-songs",
        images: [],
        name: "Liked Songs",
        owner: {
            display_name: user.name,
            id: user.spotify_id
        },
        public: false,
        snapshot_id: "",
        tracks: {
            href: "",
            total: 0
        },
        type: "playlist",
        uri: ""
    };
    
    const [playlistData, setPlaylistData] = useState<Array<PlaylistInterface>>([likedSongsPlaylist]);
    
    useEffect(() => {
        const fetchPlaylists = async(): Promise<any> => {
            // setPlaylistLoading(true);
            const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=20", {
                method: "GET", headers: { Authorization: `Bearer ${token.access_token}` }
            });
            const json = await res.json();
            if (res.ok) {
                setPlaylistData(json.items);
                console.log(json.items);
            }
            else {
                console.log(json.error);
            }
            // setPlaylistLoading(false);
        }

        const getSavedTracks = async () => {
            const res = await fetch("https://api.spotify.com/v1/me/tracks?limit=20", {
                method: "GET", headers: { Authorization: `Bearer ${token.access_token}` }
            });

            const json = await res.json();
            if (res.ok) {
                console.log(json)
                var insertVal = {};
                insertVal = {"liked-songs": json.items};
                cachePlaylistData(insertVal);
            }
            else {
                console.log(json.error);
            }
        }

        fetchPlaylists();
        getSavedTracks();
    }, [token.access_token])


    const getPlaylistTracks = async (playlistID: string) => {
        if (!(playlistID in playlistTracks)) { 
            const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: "GET", headers: { Authorization: `Bearer ${token.access_token}`}
            });
            const json = await res.json();
            if (res.ok) {
                var insertVal = {};
                insertVal = {[playlistID]: json.items};
                cachePlaylistData(insertVal);
                console.log(insertVal);
                // selectPlaylist(playlistID);
            }
            else {
                console.log(json.error);
            }
        }
    }

    const selectPlaylist = (id: string) => {
        setSelectedPlaylist(id);
        getPlaylistTracks(id);
    }

    const cachePlaylistData = (insertVal: {}) => {
        setPlaylistTracks(playlistTracks => ({
            ...playlistTracks,
            ...insertVal
        }));
    }

    const onClose = () => {}

    const contextMenuOptionsPlaylist: ContextMenuOption[] = [
        { name: "View", iconName: "", function: () => null, visible: true }
    ];

    const contextMenuOptionsTrack: ContextMenuOption[] = [
        { name: "Play", iconName: "play_arrow_rounded", function: () => null, visible: true },
        { name: "Copy Link", iconName: "content_copy_rounded", function: () => null, visible: true }
    ];

    return (
        <div id="library" className="flex max-h-[calc(100vh_-_180px)]">
            <PlaylistsPanel
                panelTitle="Playlists"
                emptyPanelPlaceholderText="No playlists"
                playlistData={playlistData}
                playlistTracks={playlistTracks}
                contextMenuOptions={contextMenuOptionsPlaylist}
                selectPlaylistCallback={selectPlaylist}
                openContextMenuCallback={(p: PlaylistInterface) => setFocusedPlaylist(p)}
            />
            <TracksPanel
                cachePlaylist={cachePlaylistData}
                selectedPlaylist={playlistData.find(p => p.id === selectedPlaylist) || likedSongsPlaylist}
                selectedPlaylistData={playlistTracks[selectedPlaylist] ?? []}
                showCloseButton={false}
                contextMenuOptions={contextMenuOptionsTrack}
                onCloseCallback={onClose}
                openContextMenuCallback={(t: Track | null) => setFocusedTrack(t)}
            />
        </div>
    );
}

export default Library;