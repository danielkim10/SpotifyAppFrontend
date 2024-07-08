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
        className: "bg-light-grey m-[10px] text-md rounded-full text-white",
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
            <div id="tracks-panel-header" className="flex pb-5">
            <CoverImage id={playlist.id} url={playlist.images?.length > 0 ? playlist.images[0].url : ""} size="l"/>
            <div id="header-info" className="w-[calc(100%_-_150px)]">
                {/* <Tooltip title={playlist.public ? "This playlist is public" : "This playlist is private"}>
                    {
                        playlist.public ? <PublicRoundedIcon/> : <PublicOffRoundedIcon/>
                    }
                </Tooltip> */}
                <div id="playlist-name" className="w-full flex pl-[10px]"><b className="text-6xl">{playlist.name}</b></div>
                <div id="playlist-description" className="w-full flex pl-[10px]">{playlist.description}</div>
                <div id="playlist-owner" className="w-full flex pl-[10px]">{playlist.owner.display_name}</div>
            </div>
            {
                showCloseButton ?
                <Tooltip title="Back">
                    <IconButton onClick={onCloseCallback}>
                        <CloseRoundedIcon className="text-white"/>
                    </IconButton>
                </Tooltip> :
                <></>
            }
            </div>
            <SearchBar searchBarInterface={searchBarInterfaceTrack} />
            <SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/>
        </>
    );
}

export default PanelHeader;