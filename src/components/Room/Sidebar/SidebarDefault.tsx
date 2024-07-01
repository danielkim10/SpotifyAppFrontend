import { useState, useContext } from 'react';

import SidebarContext from '../../../utilities/context/SidebarContext';
import PlaylistDetailsDialog from '../Dialog/PlaylistDetailsDialog';
import SharePlaylistDialog from '../Dialog/SharePlaylistDialog';
import Button from '../../common/Button';

const SidebarDefault = () => {
    const [playlsitDetailsDialogOpen, setPlaylistDetailsDialogOpen] = useState(false);
    const [sharePlaylistDialogOpen, setSharePlaylistDialogOpen] = useState(false);

    const sidebarContext = useContext(SidebarContext);

    return (
        <div className="h-full flex flex-col justify-between">
            <PlaylistDetailsDialog open={playlsitDetailsDialogOpen} onClose={() => setPlaylistDetailsDialogOpen(false)} />
            <SharePlaylistDialog open={sharePlaylistDialogOpen} onClose={() => setSharePlaylistDialogOpen(false)} />
            <div className="flex-1">
                <Button label="Create Playlist" endIcon="add_circle_rounded" bgColorScheme="grey" handleClick={() => setPlaylistDetailsDialogOpen(true)}/>
            </div>
            <div className="flex-1">
                <Button label="Search" endIcon="search" bgColorScheme="grey" handleClick={() => sidebarContext.callback("Search")}/>
            </div>
            <div className="flex-1">
                <Button label="Clipboard" endIcon="assignment_rounded" bgColorScheme="grey" handleClick={() => sidebarContext.callback("Clipboard")}/>
            </div>
            <div className="flex-1">
                <Button label="History" endIcon="history" bgColorScheme="grey" handleClick={() => sidebarContext.callback("History")}/>
            </div>
            <div className="flex-1">
                <Button label="Share Playlist" endIcon="share_rounded" bgColorScheme="grey" handleClick={() => setSharePlaylistDialogOpen(true)}/>
            </div>
            <div className="flex-1">
                <Button label="Settings" endIcon="settings" bgColorScheme="grey" handleClick={() => sidebarContext.callback("Settings")}/>
            </div>
        </div>
    );
}

export default SidebarDefault;