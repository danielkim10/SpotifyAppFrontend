import { useState, useEffect, useContext, useRef, MouseEvent, useCallback } from 'react'

import TokenContext from '../../../utilities/context/TokenContext';
import SearchBar from "../../common/SearchBar"

import CircularProgress from '@mui/material/CircularProgress';

import TrackItem from '../../common/TracksPanel/TrackItem';
import Track from '../Sandbox/Track';
import TrackInterface from '../../../interfaces/track';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';
import ContextMenu from '../../common/ContextMenu';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import SnackPackContext from '../../../utilities/context/SnackPackContext';
import { refreshToken } from '../../../utilities/functions/api/local/Token';

const SidebarSearch = () => {
    const [text, setText] = useState("");
    const [cachedText, setCachedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [tracks, setTracks] = useState<TrackInterface[]>([]);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

    const [hoveredTrack, setHoveredTrack] = useState<TrackInterface | null>(null);

    const [selectedItems, setSelectedItems] = useState<TrackInterface[]>([]);

    const [lastSelectedItems, setLastSelectedItems] = useState<TrackInterface[]>([]);

    const token = useContext(TokenContext)
    const clipboard = useContext(ClipboardContext);
    const snackPack = useContext(SnackPackContext);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isBottom, setIsBottom] = useState(false);

    const [nextLink, setNextLink] = useState("");
    const [total, setTotal] = useState(0);

    const search = useCallback(async (accessToken: string, searchQueryAPI: string, appendToSearchResults: boolean, retry: boolean) => {
        const res = await fetch((searchQueryAPI), {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        })
        const json = await res.json()
        if (res.ok) {
            if (appendToSearchResults) {
                setTracks([...tracks, ...json.tracks.items]);
            }
            else {
                setTracks(json.tracks.items);
            }
            setNextLink(json.tracks.next);
            setTotal(json.tracks.total);
        }
        else {
            if (res.status === 401 && !retry) {
                const refreshSuccess = await refreshToken(token.refresh_token);
                if (refreshSuccess.ok) {
                    token.setAccessToken(refreshSuccess.access_token);
                    search(refreshSuccess.access_token, searchQueryAPI, appendToSearchResults, true);
                }
                else {
                    console.log("The token failed to refresh")
                }
            }
            else {
                console.error(json.error)
            }
        }
        setLoading(false);
        setLoadingMore(false);
        setCachedText(text)
    }, [text, token, tracks])

    useEffect(() => {
        if (text !== "" && text !== cachedText) {
            setLoading(true);
            const intervalID = setInterval(() => {
                const searchQueryAPI = "https://api.spotify.com/v1/search?" + new URLSearchParams({
                    q: text,
                    type: "track"
                })
                search(token.access_token, searchQueryAPI, false, false)
            }, 1500)

            return () => clearInterval(intervalID)
        }
        else if (text === "") {
            setTracks([]);
            setLoading(false);
            setLoadingMore(false);
            setNextLink("");
            setTotal(0);
        }
    }, [text, cachedText, token, search])

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
        if (isBottom && tracks.length < total) {
            setLoadingMore(true);
            search(token.access_token, nextLink, true, false);
            setIsBottom(false);
        }
    }, [isBottom, nextLink, search, token.access_token, total, tracks.length]);

    const searchBarInterface = {
        id: "item-search-textfield",
        placeholder: "Search",
        className: "bg-light-grey m-[10px] text-md rounded-full text-white",
        value: text,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
        onClear: () => setText("")
    }

    const onRightClick = (e: MouseEvent<HTMLLIElement>, t: TrackInterface) => {
        e.preventDefault();
        setContextMenuOpen(true);
        setContextMenuPosition({top: e.clientY, left: e.clientX});
    }

    const handleClick = (e: MouseEvent<HTMLLIElement>, t: TrackInterface) => {
        let index = selectedItems.findIndex((track) => track.id === t.id)
        if (index >= 0) {
            setSelectedItems(selectedItems => selectedItems.filter(track => track.id !== t.id))
        }
        else {
            setSelectedItems([...selectedItems, t])
        }
    }

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setIsBottom(scrollTop + clientHeight >= scrollHeight);
        }
    }

    const addToClipboard = () => {
        if (hoveredTrack) {
            clipboard.addItems([hoveredTrack]);
            snackPack.changeSnackPackMessage(`${hoveredTrack.name} added to clipboard`);
            clipboard.selectItems([hoveredTrack]);
            setLastSelectedItems([hoveredTrack]);
        }
    }

    const removeFromClipboard = () => {
        if (hoveredTrack) {
            clipboard.removeItems([hoveredTrack]);
            clipboard.deselectItems([hoveredTrack]);
            snackPack.changeSnackPackMessage(`${hoveredTrack.name} removed from clipboard`);
        }
    }

    const addSelectedToClipboard = () => {
        clipboard.addItems(selectedItems);
        clipboard.selectItems(selectedItems);
        snackPack.changeSnackPackMessage("")
        setSelectedItems([]);
        setLastSelectedItems(selectedItems)
    }

    const removeSelectedFromClipboard = () => {
        clipboard.removeItems(selectedItems);
    }

    const contextMenuOptions: ContextMenuOption[] = [
        { name: "Add to Clipboard", iconName: "content_paste_go_rounded", function: addToClipboard, visible: hoveredTrack !== null },
        { name: "Remove from Clipboard", iconName: "content_paste_off_rounded", function: removeFromClipboard, visible: true },
        { name: "Add Selected to Clipboard", iconName: "coontent_paste_go_rounded", function: addSelectedToClipboard, visible: selectedItems.length > 0 },
        { name: "Remove Selected from Clipboard", iconName: "content_paste_off_rounded", function: removeSelectedFromClipboard, visible: selectedItems.length > 0 },
        { name: "Copy Link", iconName: "content_copy_rounded", function: () => null, visible: true }
    ];

    return (
        <div className="flex flex-col max-h-search-height">
            <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            <div className="my-[5px]">
                <SearchBar searchBarInterface={searchBarInterface}/>
            </div>
            <div className="flex-auto overflow-y-scroll overflow-x-hidden" ref={containerRef}>
            {
                loading ? 
                <div className="mt-2 overflow-x-hidden overflow-y-hidden">
                <CircularProgress/></div> :
                    tracks.length > 0 ?
                    <><ul className="max-w-[300px]">
                    {
                        tracks.map((track: TrackInterface) => {
                            return (
                                <Track
                                    track={track}
                                    selected={selectedItems.findIndex((t) => t.id === track.id) >= 0}
                                    inClipboard = {clipboard.items.findIndex((t) => t.id === track.id) >= 0}
                                    onClick={handleClick}
                                    onContextMenu={onRightClick}
                                    onMouseOver={() => setHoveredTrack(track)}
                                />
                            )
                        })
                    }
                    </ul>
                    {
                        loadingMore ? <div className="mt-2 overflow-x-hidden overflow-y-hidden"><CircularProgress/></div> : <></>
                    }
                    </> : 
                    <>
                        No results
                    </>
            }
            </div>
        </div>
    )
}

export default SidebarSearch