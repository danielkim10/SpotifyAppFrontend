import { useState, MouseEvent } from 'react';

import Dictionary from '../../../interfaces/dictionary';
import SortOption from '../../../interfaces/options/SortOption';
import SavedTrack from '../../../interfaces/savedTrack';
import { sortPlaylists } from '../../../utilities/functions/sorting/playlists';
import PlaylistItem from './PlaylistItem';
import SearchBar from '../SearchBar';
import SortMenu from '../SortMenu';

import useUserContext from '../../../utilities/hooks/context/useUserContext';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';
import ContextMenu from '../ContextMenu';
import Playlist from '../../../interfaces/playlist';

const sortOptions: SortOption[] = [
    { fieldName: "updated", displayName: "Last Updated" },
    { fieldName: "name", displayName: "Name" },
    { fieldName: "owner", displayName: "Creator" },
    { fieldName: "tracks", displayName: "Tracks" },
    { fieldName: "downloaded", displayName: "Last Downloaded" }
]

const PlaylistsPanel = (props: {
    panelTitle: string,
    emptyPanelPlaceholderText: string,
    playlistData: Playlist[],
    playlistTracks: Dictionary<SavedTrack[]>,
    contextMenuOptions: ContextMenuOption[],
    selectPlaylistCallback: (s: string) => void,
    openContextMenuCallback: (p: Playlist) => void,
    playlistDownloads: Dictionary<string>
}) => {
    const { panelTitle, emptyPanelPlaceholderText, playlistData, playlistTracks, contextMenuOptions, selectPlaylistCallback, openContextMenuCallback, playlistDownloads } = props;

    const [playlistSearchText, setPlaylistSearchText] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptions[0]);
    const [sortAscending, setSortAscending] = useState(true);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

    // const likedSongsPlaylist = {
    //     collaborative: false,
    //     description: "",
    //     external_urls: {
    //         spotify: ""
    //     },
    //     href: "",
    //     id: "liked-songs",
    //     images: [],
    //     name: "Liked Songs",
    //     owner: {
    //         display_name: user.name,
    //         id: user.spotify_id
    //     },
    //     public: false,
    //     snapshot_id: "",
    //     tracks: {
    //         href: "",
    //         total: 0
    //     },
    //     type: "playlist",
    //     uri: ""
    // };

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
        <div id="playlists-panel" className="bg-black flex flex-col w-full h-full p-5">
            <div className="">
                <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
                <div id="playlists-panel-title" className="pb-5">
                    <b className="text-2xl">{panelTitle}</b>
                </div>
                <div className="">
                    <div className="float-left">
                        <SearchBar searchBarInterface={searchBarInterfacePlaylist} />
                    </div>
                    <div className="float-right">
                        <SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/>
                    </div>
                </div>
            </div>
            <div className="flex-auto overflow-y-scroll">
                <table className="flex-auto w-full overflow-x-hidden">
                    <thead className="sticky top-0 z-10 bg-black">
                        <tr id="table-header" className="flex m-auto p-[5px]">
                            <th id="col-header-index" className="w-[50px]">#</th>
                            <th id="col-header-image" className="w-[72px]"></th>
                            <th id="col-header-name" className="flex-1 text-left px-2">Name</th>
                            <th id="col-header-owner" className="flex-1 text-left px-2">Owner</th>
                            <th id="col-header-tracks" className="flex-1 text-left px-2">Tracks</th>
                            <th id="col-header-updated" className="flex-1 text-left px-2">Last Updated</th>
                            <th id="col-header-downloaded" className="flex-1 text-left px-2">Last Downloaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            playlistData.length > 0 ?
                            playlistData.sort((a,b) =>  { 
                                return sortPlaylists(a, b, sortAscending, selectedSortOption.fieldName)
                            }).filter((playlist: Playlist) => {
                                return playlist.name.toLowerCase().startsWith(playlistSearchText.toLowerCase())
                            }).map((playlist: Playlist, index: number) => {
                                return (
                                    <PlaylistItem index={index + 1} key={playlist.id} playlist={playlist} playlistDownload={playlistDownloads[playlist.id]} onClick={() => selectPlaylistCallback(playlist.id)} onRightClick={(e: MouseEvent<HTMLDivElement>, p: Playlist) => onRightClick(e, p)} />
                                )}
                            ) : 
                            <tr>
                                <b>{emptyPanelPlaceholderText}</b>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PlaylistsPanel;