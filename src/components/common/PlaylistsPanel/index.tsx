import { useState, useContext, MouseEvent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Dictionary from '../../../interfaces/dictionary';
import PlaylistInterface from '../../../interfaces/playlist';
import SortOption from '../../../interfaces/options/SortOption';
import SavedTrack from '../../../interfaces/savedTrack';
import { sortPlaylistsByName, sortPlaylistsByOwner } from '../../../utilities/functions/sorting/playlists';
import PlaylistItem from './PlaylistItem';
import SearchBar from '../SearchBar';
import SortMenu from '../SortMenu';

import useUserContext from '../../../utilities/hooks/context/useUserContext';
import Track from '../../../interfaces/track';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';
import ContextMenu from '../ContextMenu';
import Playlist from '../../../interfaces/playlist';

const sortOptions: SortOption[] = [
    { fieldName: "name", displayName: "Name", sortFunction: sortPlaylistsByName },
    { fieldName: "owner", displayName: "Creator", sortFunction: sortPlaylistsByOwner }
]

const PlaylistsPanel = (props: {
    panelTitle: string,
    emptyPanelPlaceholderText: string,
    playlistData: PlaylistInterface[],
    playlistTracks: Dictionary<SavedTrack>,
    contextMenuOptions: ContextMenuOption[],
    selectPlaylistCallback: (s: string) => void,
    openContextMenuCallback: (p: Playlist) => void
}) => {
    const { panelTitle, emptyPanelPlaceholderText, playlistData, playlistTracks, contextMenuOptions, selectPlaylistCallback, openContextMenuCallback } = props;

    const [playlistLoading, setPlaylistLoading] = useState(false);
    const [playlistSearchText, setPlaylistSearchText] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptions[0]);
    const [sortAscending, setSortAscending] = useState(true);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

    const user = useUserContext();

    const likedSongsPlaylist = {
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

    const searchBarInterfacePlaylist = {
        id: "playlist-search",
        placeholder: "Search playlists",
        className: "bg-light-grey m-[10px] text-md rounded-full text-white",
        value: playlistSearchText,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPlaylistSearchText(e.target.value),
        onClear: () => setPlaylistSearchText("")
    };

    const setSortOption = (so: SortOption, asc: boolean) => {
        setSelectedSortOption(so);
        setSortAscending(asc);
    }

    const onRightClick = (e: MouseEvent<HTMLDivElement>, p: Playlist) => {
        setContextMenuOpen(true);
        setContextMenuPosition({top: e.clientY, left: e.clientX});
        openContextMenuCallback(p);
    }

    return (
        <div id="playlists-panel" className="bg-black w-1/2 mx-2 p-5 max-h-[calc(100vh_-_184px)]">
            <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            <div id="playlists-panel-title" className="pb-5">
                <b className="text-2xl">{panelTitle}</b>
            </div>
            <div className="flex">
                <div className="w-1/2 float-left">
                    <SearchBar searchBarInterface={searchBarInterfacePlaylist} />
                </div>
                <div className="w-1/2 float-right">
                    <SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/>
                </div>
            </div>
            <div>
                Name TrackCount LastUpdated LastDownloaded
            </div>
            {
                playlistLoading ?
                <CircularProgress/> :
                <div id="playlists-panel-container" className="w-full overflow-x-hidden overflow-y-auto">
                    <ul>
                    {
                        playlistTracks["liked-songs"] ?
                        <li className="p-[2px] first:pt-0">
                            <PlaylistItem playlist={likedSongsPlaylist} onClick={() => selectPlaylistCallback("liked-songs")} onRightClick={(e: MouseEvent<HTMLDivElement>, p: Playlist) => onRightClick(e, p)} />
                        </li> :
                        <></>
                    }
                    {
                        playlistData.length > 0 ?
                        playlistData.sort((a,b) =>  { 
                            return selectedSortOption.sortFunction(a, b, sortAscending)
                        }).filter((playlist: PlaylistInterface) => {
                            return playlist.name.startsWith(playlistSearchText)
                        }).map((playlist: PlaylistInterface) => {
                            return (
                                <li key={playlist.id} className="p-[2px] first:pt-0">
                                    <PlaylistItem key={playlist.id} playlist={playlist} onClick={() => selectPlaylistCallback(playlist.id)} onRightClick={(e: MouseEvent<HTMLDivElement>, p: Playlist) => onRightClick(e, p)} />
                                </li>
                            )}
                        ) : 
                        <>
                            {emptyPanelPlaceholderText}
                        </>
                    }
                    </ul>
                </div>
            }
        </div>
    );
}

export default PlaylistsPanel;