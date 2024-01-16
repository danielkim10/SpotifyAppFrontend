// modules
import { useState, useEffect, useContext, useMemo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import SortOption from '../../interfaces/options/SortOption'

// mui components
import IconButton from '@mui/material/IconButton'
import SearchBar from '../common/SearchBar'

import useGetRequest from '../../utilities/hooks/requests/useGetRequest';

// mui icons
import SortRoundedIcon from '@mui/icons-material/SortRounded'
import RoomInterface from '../../interfaces/room'
import RoomMemberInterface from '../../interfaces/roommember'
import RoomItem from './RoomItem'
import SortMenu from '../common/SortMenu'
import { sortRoomByName, sortRoomByOwner } from '../../utilities/sortFunctions'

import useUserContext from '../../utilities/hooks/context/useUserContext'

const RoomList = () => {
    const [text, setText] = useState("")
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>();
    const [sortAscending, setSortAscending] = useState(true);

    const user = useUserContext();
    const navigate = useNavigate()
    const rooms: RoomMemberInterface[] = useGetRequest(
        `http://localhost:5000/api/member/user/${user.id}`,
        { "Content-Type": "application/json" }
    );

    const joinRoom = (roomID: string) => {
        navigate({
            pathname: "/room",
            search: createSearchParams({id: roomID}).toString()
        })
    }

    const setSortOption = (so: SortOption, ascending: boolean) => {
        setSelectedSortOption(so);
        setSortAscending(ascending);
    }

    const searchBarInterface = {
        id: "room-search-textfield",
        placeholder: "Search for a room",
        className: "search-bar",
        value: text,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
        onClear: () => setText("")
    }

    const sortOptions: SortOption[] = [
        // {fieldName: "lastAccessed", displayName: "Last Accessed"},
        {fieldName: "name", displayName: "Name", sortFunction: sortRoomByName},
        {fieldName: "owner", displayName: "Owner", sortFunction: sortRoomByOwner},
        // {fieldName: "createdAt", displayName: "Created"}
    ]

    return (
        <>
            <div className="rooms-list-header">
                <SearchBar searchBarInterface={searchBarInterface}/>
                <SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/>
            </div>
            <div className="rooms-list-container">
                {
                    
                    rooms.map(room => {
                        return <div key={room.room._id} onClick={() => joinRoom(room.room._id)}><RoomItem room={room} /></div>
                    })
                }
            </div>
        </>
    )
}

export default RoomList