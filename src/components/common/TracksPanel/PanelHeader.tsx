import { useState } from 'react';

import SortOption from '../../../interfaces/options/SortOption';
import Playlist from '../../../interfaces/playlist';

import SearchBar from '../SearchBar';
import SortMenu from '../SortMenu';
import CoverImage from '../CoverImage';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PublicOffRoundedIcon from '@mui/icons-material/PublicOffRounded';

import { sortTrackByName, sortTracksByAlbum } from '../../../utilities/sortFunctions';

const PanelHeader = (props: {playlist: Playlist, showCloseButton: boolean, onCloseCallback: () => void}) => {
    const { playlist, showCloseButton, onCloseCallback } = props;

    const [trackSearchText, setTrackSearchText] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>();
    const [sortAscending, setSortAscending] = useState(true);

    const handleTextChangeTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrackSearchText(e.target.value);
    }

    const searchBarInterfaceTrack = {
        id: "track-search",
        placeholder: "Search tracks",
        className: "search-bar track-bar",
        value: trackSearchText,
        onChange: handleTextChangeTrack,
        onClear: () => setTrackSearchText("")
    };

    const sortOptions: SortOption[] = [
        { fieldName: "name", displayName: "Title", sortFunction: sortTrackByName },
        // { fieldName: "artist", displayName: "Artist" },
        { fieldName: "album", displayName: "Album", sortFunction: sortTracksByAlbum },
        // { fieldName: "added", displayName: "Date added" },
        // { fieldName: "duration", displayName: "Duration" }
    ]

    const setSortOption = (so: SortOption, asc: boolean) => {
        setSelectedSortOption(so);
        setSortAscending(asc);
    }

    return (
        <>
            <div className="panel-header">
                <div className="panel-header-image">
                    <CoverImage id={playlist.id} url={playlist.images.length > 0 ? playlist.images[0].url : ""} size="l"/>
                </div>
                <div className="panel-header-side">
                    <Tooltip title={playlist.public ? "This playlist is public" : "This playlist is private"}>
                        {
                            playlist.public ? <PublicRoundedIcon/> : <PublicOffRoundedIcon/>
                        }
                    </Tooltip>
                    <span className="panel-header-text"><b className="title">{playlist.name}</b></span>
                    <span className="panel-header-text">{playlist.description}</span>
                    <span className="panel-header-text">{playlist.owner.display_name}</span>
                </div>
                {
                    showCloseButton ?
                    <IconButton onClick={onCloseCallback}>
                        <CloseRoundedIcon className="icon-button"/>
                    </IconButton> :
                    <></>
                }
            </div>
            <div>    
                <div>
                    <SearchBar searchBarInterface={searchBarInterfaceTrack} />
                    <SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/>
                </div>
            </div>
        </>
    );
}

export default PanelHeader;