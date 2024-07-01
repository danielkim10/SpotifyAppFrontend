import { useState, useContext, MouseEvent } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import Track from '../../../interfaces/track';
import TrackItem from './TrackItem';
import SavedTrack from '../../../interfaces/savedTrack';
import PanelHeader from './PanelHeader';
import Playlist from '../../../interfaces/playlist';
import TokenContext from '../../../utilities/context/TokenContext';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';
import ContextMenu from '../ContextMenu';

const TracksPanel = (props: {
    cachePlaylist: (o: {}) => void,
    selectedPlaylist: Playlist | undefined,
    selectedPlaylistData: SavedTrack[],
    showCloseButton: boolean,
    contextMenuOptions: ContextMenuOption[],
    onCloseCallback: () => void,
    openContextMenuCallback: (t: Track | null) => void
}) => {
    const { cachePlaylist, selectedPlaylist, selectedPlaylistData, showCloseButton, contextMenuOptions, onCloseCallback, openContextMenuCallback } = props;

    const [trackSearchText, setTrackSearchText] = useState("");
    const [trackLoading, setTrackLoading] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});
    const [track, setTrack] = useState<Track | null>(null);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

    const token = useContext(TokenContext)

    // console.log(props);

    // const getPlaylistTracks = async (playlistID: string) => {
    //     const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {   
    //         method: "GET", headers: { Authorization: `Bearer ${token.access_token}`}
    //     });
    //     const json = await res.json();
    //     if (res.ok) {
    //         var insertVal = {};
    //         insertVal = {[playlistID]: json.items};
    //         cachePlaylist(insertVal);
    //     }
    //     else {
    //         console.log(json.error);
    //     }
    // }

    const onClick = (e: MouseEvent<HTMLDivElement>, t: Track | null) => {
        if (t === null) {
            setSelectedTracks([]);
            return;
        }

        if (e.shiftKey) {

        }
        else if (e.ctrlKey) {

        }
        else {
            setSelectedTracks([t]);
        }
    }

    const onRightClick = (e: MouseEvent<HTMLDivElement>, t: Track | null) => {
        e.preventDefault();
        setContextMenuOpen(true);
        setContextMenuPosition({top: e.clientY, left: e.clientX});
        openContextMenuCallback(t);
    }

    return (
        <div id="tracks-panel" className="bg-black w-1/2 mx-2 p-5 max-h-[calc(100vh_-_180px)]">
            <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            {
                selectedPlaylist ? 
                <>
                    <PanelHeader playlist={selectedPlaylist} showCloseButton={showCloseButton} onCloseCallback={onCloseCallback}/>
                    <div className="max-h-[500px] overflow-y-auto">
                    {
                        trackLoading
                        ?
                        <CircularProgress/>
                        :
                        <>
                            
                            <table id="tracks-panel-table" className="w-full m-auto">
                                <tr id="header-row" className="flex m-auto p-[5px]">
                                    <th id="header-col-index" className="min-w-[50px]">#</th>
                                    <th id="header-col-image" className="min-w-[50px]"></th>
                                    <th id="header-col-title" className="min-w-[200px] text-left mx-1">Title</th>
                                    <th id="header-col-album" className="min-w-[150px] text-left mx-1">Album</th>
                                    <th id="header-col-date" className="min-w-[100px] text-left mx-1">Date Added</th>
                                    <th id="header-col-time" className="text-left mx-1">Duration</th>
                                </tr>
                                {
                                    
                                    selectedPlaylistData.length > 0 ?
                                    selectedPlaylistData.filter((savedTrack: SavedTrack) => {
                                        return savedTrack.track.name.startsWith(trackSearchText)
                                    }).map((savedTrack: SavedTrack, index: number) => {
                                        return (
                                            <TrackItem
                                                index={index + 1}
                                                added={savedTrack.added_at}
                                                track={savedTrack.track}
                                                selected={selectedTracks.findIndex((t) => t.id === savedTrack.track.id) >= 0}
                                                onClickCallback={(e) => onClick(e,savedTrack.track)}
                                                onRightClick={(e: MouseEvent<HTMLDivElement>, t: Track) => onRightClick(e, t)}
                                            />
                                        )
                                    })
                                    
                                    :
                                    <b>No tracks</b>
                                }
                            </table>
                        </>
                    }
                    </div>
                </>
                :
                <div id="tracks-panel-container-empty" className="m-auto top-1/2 relative">
                    Select a playlist to view tracks
                </div>
            }
        </div>
    )
}

export default TracksPanel