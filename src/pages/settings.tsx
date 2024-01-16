// modules
import { useState, useEffect, useContext } from 'react'

// mui components
import Switch from '@mui/material/Switch'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import useHeaderCallback from '../utilities/hooks/context/useHeaderCallback'

const Settings = () => {
    // const [streamingFlag, setStreamingFlag] = useState(false)
    // const [imageUploadFlag, setImageUploadFlag] = useState(false)
    // const [playlistReadPrivateFlag, setPlaylistReadPrivateFlag] = useState(false)
    // const [playlistReadCollaborativeFlag, setPlaylistReadCollaborativeFlag] = useState(false)
    // const [playlistModifyPrivateFlag, setPlaylistModifyPrivateFlag] = useState(false)
    // const [playlistModifyPublicFlag, setPlaylistModifyPublicFlag] = useState(false)
    // const [userLibraryModifyFlag, setUserLibraryModifyFlag] = useState(false)
    // const [userLibraryReadFlag, setUserLibraryReadFlag] = useState(false)
    // const [userReadPlaybackStateFlag, setUserReadPlaybackStateFlag] = useState(false)
    // const [userReadPrivateFlag, setUserReadPrivateFlag] = useState(false)
    // const [userReadEmailFlag, setUserReadEmailFlag] = useState(false)

    const [tabValue, setTabValue] = useState(0);
    
    useHeaderCallback("Settings");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    return (
        <div className="body">
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tab">
                <Tab label="General"/>
                <Tab label="Advanced"/>
            </Tabs>
            Adjust settings here

            {/* streaming
                ugc-image-upload - upload images to Spotify
                playlist-read-private
                playlist-read-collaborative
                playlist-modify-private
                playlist-modify-public
                user-library-modify
                user-library-read
                user-read-playback-state
                user-read-private
                user-read-email
            */}

        </div>
    );
}

export default Settings;