import { useState, useEffect, useContext, MouseEvent } from 'react';
import SidebarContext from '../../../utilities/context/SidebarContext';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import TrackInterface from '../../../interfaces/track';
import Track from '../Sandbox/Track';
import Button from '../../common/Button';
import ContextMenu from '../../common/ContextMenu';
import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';

const SidebarClipboard = () => {
    const sidebarOption = useContext(SidebarContext);
    const clipboard = useContext(ClipboardContext);
    const [selectedClipboardItems, setSelectedClipboardItems] = useState<TrackInterface[]>([]);
    const [hoveredTrack, setHoveredTrack] = useState<TrackInterface | null>(null);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

    useEffect(() => {

    }, [clipboard.selectedItems])

    const selectItem = (e: MouseEvent<HTMLLIElement>, t: TrackInterface) => {
        let index = clipboard.selectedItems.findIndex((track) => track.id === t.id)
        if (index >= 0) {
            clipboard.deselectItems([t]);
        }
        else {
            clipboard.selectItems([t]);
        }
    }

    const selectAll = () => {
        if (clipboard.selectedItems.length === clipboard.items.length) {
            clipboard.deselectItems(clipboard.items);
        }
        else {
            clipboard.selectItems(clipboard.items);
        }
    }

    const deleteAll = () => {
        clipboard.removeItems(clipboard.selectedItems);
        clipboard.deselectItems(clipboard.items);
    }

    useEffect(() => {
        sidebarOption.callback("Clipboard");
    }, [sidebarOption])

    const onRightClick = (e: MouseEvent<HTMLLIElement>, t: TrackInterface) => {
        e.preventDefault();
        setContextMenuOpen(true);
        setContextMenuPosition({top: e.clientY, left: e.clientX});
    }

    const onHover = () => {

    }

    const contextMenuOptions: ContextMenuOption[] = [
        { name: "Copy Link", iconName: "content_copy_rounded", function: () => null, visible: true },
        { name: "Share to chat", iconName: "share_rounded", function: () => null, visible: true }
    ];

    return (
        <div className="flex flex-col max-h-search-height">
            <div className="flex items-center justify-center">
                <Button label={clipboard.selectedItems.length === clipboard.items.length && clipboard.items.length > 0 ? "Deselect All" : "Select All"} bgColorScheme="grey" handleClick={selectAll}/>
                <Button label="Delete" bgColorScheme="grey" handleClick={deleteAll}/>
            </div>
            <ContextMenu open={contextMenuOpen} anchorPosition={contextMenuPosition} options={contextMenuOptions} onClose={() => setContextMenuOpen(false)}/>
            <div className="flex-auto overflow-y-scroll overflow-x-hidden">
            <ul>
            {
                clipboard.items.map(track => {
                    return (
                        <Track
                            track={track}
                            selected={clipboard.selectedItems.findIndex((t) => t.id === track.id) >= 0}
                            inClipboard = {clipboard.items.findIndex((t) => t.id === track.id) >= 0}
                            onClick={selectItem}
                            onContextMenu={onRightClick}
                            onMouseOver={() => setHoveredTrack(track)}
                        />
                    );
                })
            }
            </ul>
            </div>
        </div>
    );
}

export default SidebarClipboard;