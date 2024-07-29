import { useState, useEffect, useContext, useRef, MouseEvent } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import Track from '../../../interfaces/track';
import TrackItem from './TrackItem';
import SavedTrack from '../../../interfaces/savedTrack';
import PanelHeader from './PanelHeader';
import Playlist from '../../../interfaces/playlist';
import TokenContext from '../../../utilities/context/TokenContext';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';
import ContextMenu from '../ContextMenu';
import useSocketContext from '../../../utilities/hooks/context/useSocketContext';
import PlaylistDeletedDialog from './PlaylistDeletedDialog';

const TracksPanel = (props: {
    cachePlaylist: (o: {}) => void,
    selectedPlaylist: Playlist | undefined,
    selectedPlaylistData: SavedTrack[],
    showCloseButton: boolean,
    contextMenuOptions: ContextMenuOption[],
    onCloseCallback: () => void,
    openContextMenuCallback: (t: Track | null) => void,
    scrollToBottomCallback: (id: string) => void
}) => {
    const { cachePlaylist, selectedPlaylist, selectedPlaylistData, showCloseButton, contextMenuOptions, onCloseCallback, openContextMenuCallback, scrollToBottomCallback } = props;

    const [trackSearchText, setTrackSearchText] = useState("");
    const [trackLoading, setTrackLoading] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [playlistDeletedDialogOpen, setPlaylistDeletedDialogOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});
    const [track, setTrack] = useState<Track | null>(null);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

    const [playlistData, setPlaylistData] = useState<SavedTrack[]>([]);

    const token = useContext(TokenContext)
    const socketObject = useSocketContext();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        setPlaylistData(selectedPlaylistData);
    }, [selectedPlaylistData])

    useEffect(() => {
        socketObject.on('server:add-track-to-playlist', (data) => {
            setPlaylistData(data[selectedPlaylist!!.id]);
        })

        socketObject.on('server:delete-playlist', (data) => {
            if (selectedPlaylist && selectedPlaylist.id === data.id) {
                setPlaylistDeletedDialogOpen(true);
            }
        })
    }, [socketObject, selectedPlaylist])

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            }
        }
    }, []);

    useEffect(() => {
        if (isBottom) {
            // setLoadingMore(true);
            scrollToBottomCallback(selectedPlaylist!!.id);
            setIsBottom(false);
        }
    }, [isBottom, scrollToBottomCallback, selectedPlaylist]);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setIsBottom(scrollTop + clientHeight >= scrollHeight);
        }
    }

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

    const playlistDeletedOnClose = () => {
        setPlaylistDeletedDialogOpen(false);
        onCloseCallback();
    }

    return (
        <div id="tracks-panel" className="bg-black w-full h-full flex flex-col p-5">
            <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            <PlaylistDeletedDialog open={playlistDeletedDialogOpen} onClose={playlistDeletedOnClose}/>
            {
                selectedPlaylist ? 
                <>
                    <PanelHeader playlist={selectedPlaylist} showCloseButton={showCloseButton} onCloseCallback={onCloseCallback}/>
                    <div className="flex flex-auto overflow-y-scroll" ref={containerRef}>
                    {
                        trackLoading
                        ?
                        <CircularProgress/>
                        :
                        <>
                            <table id="tracks-panel-table" className="w-full flex-auto overflow-x-hidden" onContextMenu={(e: MouseEvent<HTMLDivElement>) => onRightClick(e, null)}>
                                <thead className="sticky top-0 z-10 bg-black">
                                    <tr key="tracks-header" className="flex m-auto p-[5px]">
                                        <th id="header-col-index" className="w-[50px]">#</th>
                                        <th id="header-col-image" className="w-[50px]"></th>
                                        <th id="header-col-title" className="flex-1 text-left px-2">Title</th>
                                        <th id="header-col-album" className="flex-1 text-left px-2">Album</th>
                                        <th id="header-col-date" className="flex-1 text-left px-2">Date Added</th>
                                        <th id="header-col-time" className="w-[100px] text-left px-2">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        playlistData.length > 0 ?
                                        playlistData.filter((savedTrack: SavedTrack) => {
                                            return savedTrack.track.name.toLowerCase().startsWith(trackSearchText.toLowerCase())
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
                                        <tr>
                                            <b>No tracks</b>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                    </div>
                </>
                :
                <div className="m-auto top-1/2 relative">
                    {/* Select a playlist to view tracks */}
                </div>
            }
        </div>
    )
}

export default TracksPanel