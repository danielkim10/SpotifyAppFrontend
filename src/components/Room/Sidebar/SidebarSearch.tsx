import { useState, useEffect, useContext, MouseEvent } from 'react'

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

const SidebarSearch = () => {
    const [text, setText] = useState("");
    const [cachedText, setCachedText] = useState("");
    const [loading, setLoading] = useState(false);

    const [tracks, setTracks] = useState([]);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

    const [hoveredTrack, setHoveredTrack] = useState<TrackInterface | null>(null);

    const [selectedItems, setSelectedItems] = useState<TrackInterface[]>([]);

    const [lastSelectedItems, setLastSelectedItems] = useState<TrackInterface[]>([]);

    const token = useContext(TokenContext)
    const clipboard = useContext(ClipboardContext);
    const snackPack = useContext(SnackPackContext);

    useEffect(() => {
        if (text !== "" && text !== cachedText) {
            setLoading(true);
            const intervalID = setInterval(() => {
                const search = async () => {
                    const res = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
                        q: text,
                        type: "track"
                    }), {
                        method: "GET", headers: { Authorization: `Bearer ${token.access_token}` }
                    })
                    const json = await res.json()
                    if (res.ok) {
                        console.log(json)
                        setTracks(json.tracks.items);
                    }
                    else {
                        console.error(json.error)
                    }
                    setLoading(false);
                    setCachedText(text)
                }
                search()
            }, 1500)

            return () => clearInterval(intervalID)
        }
        else if (text === "") {
            setTracks([]);
            setLoading(false);
        }
    }, [text, cachedText, token])

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
        <div >
            <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            <div className="my-[5px]"><SearchBar searchBarInterface={searchBarInterface}/></div>
            
            {
                loading ? 
                <CircularProgress/> : 
                    tracks.length > 0 ?
                    <ul className="max-h-search-height overflow-y-auto max-w-[300px] overflow-x-hidden">
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
                    </ul> : 
                    <>
                        No results
                    </>
            }
        </div>
    )
}

export default SidebarSearch