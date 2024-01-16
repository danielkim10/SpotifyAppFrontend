// helpers
import RoomMemberInterface from "../../interfaces/roommember";

const RoomItem = (props: {room: RoomMemberInterface}) => {
    const { room } = props;

    return (
        <div className="track-object">
            <div className="item-info">
                <div>{room.room.name}</div>
                <div>{room.user.name}</div>
            </div>
            <div>{room.room.description}</div>
            <div className="item-info">
                <div>Last Accessed: {room.updatedAt.toString().substring(0,10)}</div>
                <div>Created: {room.createdAt.toString().substring(0,10)}</div>
            </div>
        </div>
    );
}

export default RoomItem;