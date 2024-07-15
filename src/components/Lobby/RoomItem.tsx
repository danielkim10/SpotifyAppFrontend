import RoomMemberInterface from '../../interfaces/member';
import { relativeDateFormatter } from '../../utilities/random';

const RoomItem = (props: { room: RoomMemberInterface }) => {
    const { room } = props;

    return (
        <div className="bg-grey hover:bg-light-grey hover:cursor-pointer">
            <div className="text-left">
                <div>{room.room.name}</div>
                <div>{room.user.name}</div>
            </div>
            <div>{room.room.description}</div>
            <div className="text-left">
                <div>Last Accessed: {relativeDateFormatter(room.updatedAt.toString())}</div>
                <div>Created: {room.createdAt.toString().substring(0,10)}</div>
            </div>
        </div>
    );
}

export default RoomItem;