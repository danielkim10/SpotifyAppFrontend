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
        className: "bg-light-grey text-md rounded-full text-white",
        value: searchText,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value),
        onClear: () => setSearchText("")
    };

    return (
        <div className="h-full w-full flex flex-col overflow-y-scroll p-2">
            <div className="">
                <div className="float-left"><SearchBar searchBarInterface={searchBarInterface}/></div>
                <div className="float-right"><SortMenu sortOptions={sortOptions} onOptionSelected={setSortOption}/></div>
            </div>
            <div className="flex-auto overflow-y-scroll">
                <table className="w-full flex-auto overflow-x-hidden">
                    <thead className="sticky top-0 z-10 bg-black">
                        <tr className="flex m-auto p-[5px]">
                            <th className="flex-1 text-left px-2">Name</th>
                            <th className="flex-1 text-left">Owner</th>
                            <th className="flex-1 text-left">Last Accessed</th>
                            <th className="flex-1 text-left">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms.sort((a,b) => {
                                return sortRooms(a, b, sortAscending, selectedSortOption.fieldName)
                            }).filter((room) => {
                                return room.room.name.toLowerCase().startsWith(searchText.toLowerCase())
                            }).map(room => {
                                return <RoomItem onClick={() => joinRoom(room.room._id)} room={room} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RoomList;