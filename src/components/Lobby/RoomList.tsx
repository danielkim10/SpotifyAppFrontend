import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import SortOption from '../../interfaces/options/SortOption';
import SearchBar from '../common/SearchBar';

import useGetRequest from '../../utilities/hooks/requests/useGetRequest';
import RoomInterface from '../../interfaces/room';
import RoomMemberInterface from '../../interfaces/member';
import RoomItem from './RoomItem';
import SortMenu from '../common/SortMenu';
import { sortRooms } from '../../utilities/functions/sorting/rooms';
import useUserContext from '../../utilities/hooks/context/useUserContext';
import { updateMember } from '../../utilities/functions/api/local/Member';

const sortOptions: SortOption[] = [
    {fieldName: "lastAccessed", displayName: "Last Accessed"},
    {fieldName: "name", displayName: "Name"},
    {fieldName: "owner", displayName: "Owner"},
    {fieldName: "createdAt", displayName: "Created"}
]

const RoomList = (props: { rooms: RoomMemberInterface[]}) => {
    const { rooms } = props;

    const [searchText, setSearchText] = useState("")
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptions[0]);
    const [sortAscending, setSortAscending] = useState(true);

    const user = useUserContext();
    const navigate = useNavigate();
    

    const joinRoom = async (id: string) => {
        const member = await updateMember(id, user.id);
        navigate({ pathname: "/room", search: createSearchParams({ id }).toString() });
    }

    const setSortOption = (so: SortOption, ascending: boolean) => {
        setSelectedSortOption(so);
        setSortAscending(ascending);
    }

    const searchBarInterface = {
        id: "room-search-textfield",
        placeholder: "Search for a room",
        className: "bg-light-grey m-[10px] text-md rounded-full text-white",
        value: searchText,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value),
        onClear: () => setSearchText("")
    };

    return (
        <div className="max-h-default-page-height flex-auto overflow-y-scroll">
            <div className="relative flex">
                <SearchBar searchBarInterface={searchBarInterface}/>
                <div className="float-right"><SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/></div>
            </div>
            <ul className="">
            {
                rooms.sort((a,b) => {
                    return sortRooms(a, b, sortAscending, selectedSortOption.fieldName)
                }).filter((room) => {
                    return room.room.name.toLowerCase().startsWith(searchText.toLowerCase())
                }).map(room => {
                    return <li key={room.room._id} className="p-2 first:pt-0 last:pb-0" onClick={() => joinRoom(room.room._id)}><RoomItem room={room} /></li>
                })
            }
            </ul>
        </div>
    );
}

export default RoomList;