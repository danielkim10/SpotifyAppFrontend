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

import { sortTracks } from '../../../utilities/functions/sorting/tracks';

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
        { fieldName: "added", displayName: "Date added" },
        { fieldName: "name", displayName: "Title" },
        { fieldName: "artist", displayName: "Artist" },
        { fieldName: "album", displayName: "Album" },
        { fieldName: "duration", displayName: "Duration" }
    ]

    const setSortOption = (so: SortOption, asc: boolean) => {
        setSelectedSortOption(so);
        setSortAscending(asc);
    }

    return (
        <>
            <div id="tracks-panel-header" className="w-full flex flex-row pb-5">
                <div className="max-w-[150px]">
                    <CoverImage id={playlist.id} url={playlist.image?? ""} size="l"/>
                </div>
                <div className="flex-1 text-left px-5">
                    {/* <Tooltip title={playlist.public ? "This playlist is public" : "This playlist is private"}>
                        {
                            playlist.public ? <PublicRoundedIcon/> : <PublicOffRoundedIcon/>
                        }
                    </Tooltip> */}
                    <p className="text-5xl truncate py-2">{playlist.name}</p>
                    <div className="block">
                        <p>{playlist.description}</p>
                        <p>{playlist.owner.name}</p>
                    </div>
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