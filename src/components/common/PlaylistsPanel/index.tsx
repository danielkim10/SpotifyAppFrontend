import { useState, useContext, MouseEvent } from 'react';
import CircularProgress from "@mui/material/CircularProgress";

import Dictionary from '../../../interfaces/dictionary';
import PlaylistInterface from '../../../interfaces/playlist';
import SortOption from '../../../interfaces/options/SortOption';
import SavedTrack from '../../../interfaces/savedTrack';
import { sortPlaylistByName, sortPlaylistByOwner } from '../../../utilities/sortFunctions';
import PlaylistContextMenu from './PlaylistContextMenu';
import PlaylistItem from './PlaylistItem';
import SearchBar from "../SearchBar";
import SortMenu from '../SortMenu';

import useUserContext from '../../../utilities/hooks/context/useUserContext';

const sortOptions: SortOption[] = [
    { fieldName: "name", displayName: "Name", sortFunction: sortPlaylistByName },
    { fieldName: "owner", displayName: "Creator", sortFunction: sortPlaylistByOwner }
]

const PlaylistsPanel = (props: {
    panelTitle: string,
    emptyPanelPlaceholderText: string,
    playlistData: PlaylistInterface[],
    playlistTracks: Dictionary<SavedTrack>,
    contextMenuOptions: string[],
    selectPlaylistCallback: (s: string) => void
}) => {
    const { panelTitle, emptyPanelPlaceholderText, playlistData, playlistTracks, contextMenuOptions, selectPlaylistCallback } = props;

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

    const handleTextChangePlaylist = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistSearchText(e.target.value);
    }

    const searchBarInterfacePlaylist = {
        id: "playlist-search",
        placeholder: "Search playlists",
        className: "search-bar playlist-bar",
        value: playlistSearchText,
        onChange: handleTextChangePlaylist,
        onClear: () => setPlaylistSearchText("")
    };

    const setSortOption = (so: SortOption, asc: boolean) => {
        setSelectedSortOption(so);
        setSortAscending(asc);
    }

    const onRightClick = (e: MouseEvent<HTMLDivElement>) => {
        setContextMenuOpen(true);
        setContextMenuPosition({top: e.clientY, left: e.clientX});
    }

    return (
        <div className="panel">
            <PlaylistContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            <div className="panel-title">
                <b className="panel-title-text">{panelTitle}</b>
            </div>
            <SearchBar searchBarInterface={searchBarInterfacePlaylist} />
            <SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/>
            {
                playlistLoading ?
                <CircularProgress/> :
                <div className="panel-body">
                    {
                        playlistTracks["liked-songs"] ?
                        <PlaylistItem playlist={likedSongsPlaylist} onClick={() => selectPlaylistCallback("liked-songs")} onRightClick={onRightClick}/> :
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
                                <PlaylistItem key={playlist.id} playlist={playlist} onClick={() => selectPlaylistCallback(playlist.id)} onRightClick={onRightClick}/>
                            )}
                        ) : 
                        <>
                            {emptyPanelPlaceholderText}
                        </>
                    }
                </div>
            }
        </div>
    );
}

export default PlaylistsPanel;