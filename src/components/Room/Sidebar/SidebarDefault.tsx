// modules
import { useState, useContext } from 'react';
import ClipboardContext from '../../../utilities/context/ClipboardContext';
import SidebarContext from '../../../utilities/context/SidebarContext';

import useSidebarCallback from '../../../utilities/hooks/context/useSidebarCallback';

// mui components
import IconButton from '@mui/material/IconButton';

import CreatePlaylistDialog from '../CreatePlaylistDialog';
import SharePlaylistDialog from '../SharePlaylistDialog';

// mui icons
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Clipboard from '../Clipboard';

const SidebarDefault = () => {
    const [createPlaylistDialogOpen, setCreatePlaylistDialogOpen] = useState(false);
    const [sharePlaylistDialogOpen, setSharePlaylistDialogOpen] = useState(false);
    const sidebarContext = useContext(SidebarContext);
    const clipboardContext = useContext(ClipboardContext);

    return (
        <div className="sidebar">
            <CreatePlaylistDialog open={createPlaylistDialogOpen} onClose={() => setCreatePlaylistDialogOpen(false)} />
            <SharePlaylistDialog open={sharePlaylistDialogOpen} onClose={() => setSharePlaylistDialogOpen(false)} />
            <Clipboard open={clipboardContext.open}/>
            <div>
                <div>
                    <IconButton onClick={() => setCreatePlaylistDialogOpen(true)}>
                        <AddBoxRoundedIcon className="icon-button"/>
                    </IconButton>
                </div>
                <div>Create Playlist</div>
            </div>
            <div>
                <div>
                    <IconButton onClick={() => sidebarContext.callback(1)}>
                        <SearchRoundedIcon className="icon-button"/>
                    </IconButton>
                </div>
                <div>Search</div>
            </div>
            <div>
                <div>
                    <IconButton onClick={() => sidebarContext.callback(2)}>
                        <HistoryRoundedIcon className="icon-button"/>
                    </IconButton>
                </div>
                <div>History</div>
            </div>

            <div>
                <div>
                    <IconButton onClick={() => setSharePlaylistDialogOpen(true)}>
                        <FileUploadRoundedIcon className="icon-button"/>
                    </IconButton>
                </div>
                <div>Share Playlist</div>
            </div>

            <div>
                <div>
                    <IconButton onClick={() => sidebarContext.callback(3)}>
                        <SettingsRoundedIcon className="icon-button"/>
                    </IconButton>
                </div>
                <div>Settings</div>
            </div>

            <div>
                <div>
                    <IconButton onClick={() => clipboardContext.openClipboard(true)}>
                        <ContentPasteRoundedIcon className="icon-button"/>
                    </IconButton>
                </div>
                <div>Clipboard</div>
            </div>
        </div>
    )
}

export default SidebarDefault