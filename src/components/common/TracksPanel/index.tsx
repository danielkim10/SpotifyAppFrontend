// modules
import { useEffect, useState, useContext, MouseEvent } from 'react'

import SearchBar from '../SearchBar'
import CircularProgress from '@mui/material/CircularProgress';

import Track from '../../../interfaces/track';
import TrackItem from './TrackItem';
import TrackContextMenu from './TrackContextMenu';

import TrackInterface from '../../../interfaces/track';
import SavedTrack from '../../../interfaces/savedTrack';
import PanelHeader from './PanelHeader';
import Playlist from '../../../interfaces/playlist';
import TokenContext from '../../../utilities/context/TokenContext';

const TracksPanel = (props: {
    cachePlaylist: (o: {}) => void,
    selectedPlaylist: Playlist | undefined,
    selectedPlaylistData: SavedTrack[],
    showCloseButton: boolean,
    contextMenuOptions: string[],
    onCloseCallback: () => void
}) => {
    const { cachePlaylist, selectedPlaylist, selectedPlaylistData, showCloseButton, contextMenuOptions, onCloseCallback } = props;

    const [trackSearchText, setTrackSearchText] = useState("");
    const [trackLoading, setTrackLoading] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});
    const [track, setTrack] = useState<Track | null>(null);

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

    const onRightClick = (e: MouseEvent<HTMLDivElement>, t: Track) => {
        setContextMenuOpen(true);
        setContextMenuPosition({top: e.clientY, left: e.clientX});
        setTrack(t);
    }

    return (
        <div className="panel">
            <TrackContextMenu open={contextMenuOpen} track={track!!} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            {
                selectedPlaylist ? 
                <div>
                    <PanelHeader playlist={selectedPlaylist} showCloseButton={showCloseButton} onCloseCallback={onCloseCallback}/>
                    {
                        trackLoading
                        ?
                        <CircularProgress/>
                        :
                        <>
                            
                            <div className="track-panel-body">
                                <div className="track-panel-table-header">
                                    <div style={{width: '50px'}}>#</div>
                                    <div style={{width: '50px'}}></div>
                                    <div style={{width: '260px', float: 'left'}}>Title</div>
                                    <div style={{width: '280px'}}>Album</div>
                                    <div style={{width: '120px'}}>Date Added</div>
                                    <div style={{width: '50px'}}>Duration</div>
                                </div>
                                {
                                    selectedPlaylistData.length > 0 ?
                                    selectedPlaylistData.filter((savedTrack: SavedTrack) => {
                                        return savedTrack.track.name.startsWith(trackSearchText)
                                    }).map((savedTrack: SavedTrack, index: number) => {
                                        return (
                                            <TrackItem key={savedTrack.track.id} index={index + 1} added={savedTrack.added_at} track={savedTrack.track} onRightClick={(e) => onRightClick(e, savedTrack.track)}/>
                                        )
                                    })
                                    :
                                    <b>No tracks</b>
                                }
                            </div>
                        </>
                    }
                </div>
                :
                <div className="panel-empty">
                    Select a playlist to view tracks
                </div>
            }
        </div>
    )
}

export default TracksPanel