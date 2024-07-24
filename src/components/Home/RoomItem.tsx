import RoomMemberInterface from '../../interfaces/member';
import { relativeDateFormatter } from '../../utilities/random';

const RoomItem = (props: { room: RoomMemberInterface, onClick: () => void }) => {
    const { room, onClick } = props;

    return (
        <tr key={room.room._id} className="bg-grey hover:bg-light-grey hover:cursor-pointer flex p-[10px] my-2" onClick={onClick}>
            <td className="flex-1 text-left px-2"><p>{room.room.name}</p></td>
            <td className="flex-1 text-left"><p>{room.user.name}</p></td>
            <td className="flex-1 text-left"><p>{relativeDateFormatter(room.updatedAt.toString())}</p></td>
            <td className="flex-1 text-left"><p>{room.createdAt.toString().substring(0,10)}</p></td>
        </tr>
    );
}

export default RoomItem;